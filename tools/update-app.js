#!/usr/bin/env node
/**
 * 把当前源码重新打包进便携版：dist/EcChunks/resources/app.asar
 *
 * 用法：  node tools/update-app.js
 *
 * 只替换 app.asar，不碰 electron.exe / dll / pak 这些运行时文件，
 * 所以 exe 上烧进去的图标不受影响。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const asar = require('@electron/asar');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'EcChunks');
const BUILD = path.join(ROOT, 'dist', 'app-build');
const TARGET = path.join(OUT_DIR, 'resources', 'app.asar');
const MAIN = path.join(ROOT, 'electron', 'main.js');
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
  'package.json'
];

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('找不到 ' + OUT_DIR + '，便携版目录不存在。');
    process.exit(1);
  }

  // 1. 语法检查（用 vm 编译，不启动子进程）
  process.stdout.write('1/4 语法检查 electron/main.js ... ');
  try {
    new vm.Script(fs.readFileSync(MAIN, 'utf8'), { filename: MAIN });
  } catch (err) {
    console.log('失败');
    console.error(err.message);
    process.exit(1);
  }
  console.log('OK');

  // 2. 组装临时目录
  process.stdout.write('2/4 复制源码到 dist/app-build ... ');
  fs.rmSync(BUILD, { recursive: true, force: true });
  fs.mkdirSync(BUILD, { recursive: true });
  for (const item of ITEMS) {
    const src = path.join(ROOT, item);
    if (!fs.existsSync(src)) {
      console.error('\n缺少文件：' + src);
      process.exit(1);
    }
    fs.cpSync(src, path.join(BUILD, item), { recursive: true });
  }
  console.log('OK');

  // 3. 打包（先写临时文件，成功后再替换，避免中途失败把旧版本弄丢）
  process.stdout.write('3/4 打包 app.asar ... ');
  const temp = TARGET + '.new';
  const backup = TARGET + '.bak';
  fs.rmSync(temp, { force: true });
  await asar.createPackage(BUILD, temp);
  if (!fs.existsSync(temp)) {
    console.error('失败：没有生成文件');
    process.exit(1);
  }
  if (fs.existsSync(TARGET)) fs.copyFileSync(TARGET, backup);
  fs.rmSync(TARGET, { force: true });
  fs.renameSync(temp, TARGET);
  fs.rmSync(BUILD, { recursive: true, force: true });
  console.log('OK');

  // 4. 报告
  const size = fs.statSync(TARGET).size;
  const entries = await asar.listPackage(TARGET);
  console.log('4/4 完成');
  console.log('  产物：' + TARGET);
  console.log('  大小：' + size + ' 字节，' + entries.length + ' 个条目');
  console.log('  条目：' + entries.filter((e) => !e.endsWith('/')).join(' '));
  console.log('  旧版本备份：' + backup);
}

main().catch((err) => {
  console.error('出错：' + err.message);
  process.exit(1);
});
