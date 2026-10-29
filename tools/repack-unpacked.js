#!/usr/bin/env node
/**
 * 把当前源码重新打进 dist/win-unpacked/resources/app.asar（只换 asar，不动 Electron 运行时）。
 *
 * 为什么不是 electron-builder：在受限沙箱里它 spawn app-builder 会 EPERM（管道 stdio 被禁），
 * 而 @electron/asar 是进程内打包，不产生子进程。文件清单要跟 package.json 的 build.files 对齐，
 * 少一个就会「装完打开是白页」。
 *
 * 用法：node tools/repack-unpacked.js
 */
const fs = require('fs');
const path = require('path');
const asar = require('@electron/asar');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'win-unpacked');
const RES_DIR = path.join(OUT_DIR, 'resources');
const BUILD = path.join(ROOT, 'dist', 'app-build');
const TARGET = path.join(RES_DIR, 'app.asar');

// 与 package.json 的 build.files 保持一致
// data/ 里只带 *.json：同目录还躺着 ecdict.csv（65MB）这类原始数据（已 gitignore），
// 整个目录搬进去会让 app.asar 从 1MB 涨到 69MB，安装包白胖 70MB。
const ONLY_JSON = new Set(['data']);
const ITEMS = [
  'electron',
  'index.html',
  'ec-chunks-fixed.html',
  'app.js',
  'pwa.js',
  'redirect.js',
  'manifest.webmanifest',
  'sw.js',
  'icon.svg',
  'data',
  'package.json'
];

function fail(msg) {
  console.error('[repack-unpacked] ' + msg);
  process.exit(1);
}

(async () => {
  if (!fs.existsSync(RES_DIR)) fail('找不到 ' + RES_DIR + '，请先跑一次完整的 electron-builder 打包');

  fs.rmSync(BUILD, { recursive: true, force: true });
  fs.mkdirSync(BUILD, { recursive: true });
  for (const item of ITEMS) {
    const src = path.join(ROOT, item);
    if (!fs.existsSync(src)) fail('缺少 ' + src);
    if (ONLY_JSON.has(item)) {
      fs.mkdirSync(path.join(BUILD, item), { recursive: true });
      const names = fs.readdirSync(src).filter((n) => n.toLowerCase().endsWith('.json'));
      if (!names.length) fail(src + ' 里没有 json，装完就没有离线词典了');
      for (const n of names) fs.cpSync(path.join(src, n), path.join(BUILD, item, n));
      continue;
    }
    fs.cpSync(src, path.join(BUILD, item), { recursive: true });
  }

  // 先写临时文件、成功后再替换：中途失败不会把能用的旧 asar 弄丢
  const temp = TARGET + '.new';
  fs.rmSync(temp, { force: true });
  await asar.createPackage(BUILD, temp);
  if (!fs.existsSync(temp)) fail('打包后没有生成文件');
  fs.rmSync(TARGET, { force: true });
  fs.renameSync(temp, TARGET);
  fs.rmSync(BUILD, { recursive: true, force: true });

  const entries = await asar.listPackage(TARGET);
  const files = entries.filter((e) => !e.endsWith('/'));
  console.log('[repack-unpacked] 完成: ' + TARGET);
  console.log('[repack-unpacked] ' + fs.statSync(TARGET).size + ' 字节，' + files.length + ' 个文件');
  console.log('[repack-unpacked] ' + files.join(' '));
})().catch((err) => fail(err.message));
