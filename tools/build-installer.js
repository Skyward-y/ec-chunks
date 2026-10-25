#!/usr/bin/env node
/**
 * 用 Inno Setup 打包正式安装包。
 *
 * 前置：先运行 `npm run dist:dir` 生成 dist/win-unpacked（含 EcChunks.exe）。
 * 本脚本调用 tools/inno-setup/ISCC.exe 编译 electron/installer.iss，
 * 产物为 dist/EcChunks-<version>-setup.exe。
 *
 * 注：本机 NSIS(makensis) 因安全软件拦截无法映射大文件，故改用 Inno Setup。
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const iscc = path.join(root, 'tools', 'inno-setup', 'ISCC.exe');
const iss = path.join(root, 'electron', 'installer.iss');
const unpacked = path.join(root, 'dist', 'win-unpacked');
const appExe = path.join(unpacked, pkg.build.productName + '.exe');
const outFile = path.join(root, 'dist', pkg.build.productName + '-' + pkg.version + '-setup.exe');

function fail(msg) {
  console.error('[build-installer] ' + msg);
  process.exit(1);
}

if (!fs.existsSync(iscc)) fail('缺少 tools/inno-setup/ISCC.exe（Inno Setup 编译器）');
if (!fs.existsSync(iss)) fail('缺少 electron/installer.iss');
if (!fs.existsSync(appExe)) fail('缺少 ' + appExe + '，请先运行 npm run dist:dir');

// Inno Setup 6 需要 UTF-8 BOM 才能正确读取中文
const buf = fs.readFileSync(iss);
if (!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf)) {
  fs.writeFileSync(iss, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), buf]));
  console.log('[build-installer] 已为 installer.iss 添加 UTF-8 BOM');
}

// 版本号同步进脚本
let text = fs.readFileSync(iss, 'utf8');
text = text.replace(/#define MyAppVersion "[^"]*"/, '#define MyAppVersion "' + pkg.version + '"');
fs.writeFileSync(iss, text, 'utf8');

console.log('[build-installer] 编译器: ' + iscc);
console.log('[build-installer] 开始编译，约需数分钟（lzma2 压缩 300MB 以上）…');
try {
  execFileSync(iscc, [iss], { cwd: path.join(root, 'electron'), stdio: 'inherit' });
} catch (e) {
  fail('ISCC 编译失败（exit ' + e.status + '）');
}

if (!fs.existsSync(outFile)) fail('编译结束但未找到产物 ' + outFile);
const mb = (fs.statSync(outFile).size / 1048576).toFixed(1);
console.log('[build-installer] 完成: ' + outFile + ' (' + mb + ' MB)');
