#!/usr/bin/env node
/**
 * 生成免安装版 zip。
 *
 * 前置：先运行 `npm run dist:dir` 生成 dist/win-unpacked（含 EcChunks.exe）。
 * 产物：dist/EcChunks-v<version>-win64.zip，顶层目录 EcChunks/，解压即用。
 *
 * 两个 .bat 来自 electron/portable/，一并放进 zip 根目录：
 * 机器上若渲染进程起不来，用它们加兜底参数启动。
 *
 * 实现说明：Node 标准库没有 zip 写入能力，也不想为此引入第三方依赖，
 * 所以借 Windows 自带的 PowerShell + System.IO.Compression.ZipFile 流式压缩
 * （CreateEntryFromFile 不把整个文件读进内存，250MB 的 exe 也扛得住）。
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const unpacked = path.join(root, 'dist', 'win-unpacked');
const appExe = path.join(unpacked, pkg.build.productName + '.exe');
const batDir = path.join(root, 'electron', 'portable');
const topDir = pkg.build.productName;
const outFile = path.join(root, 'dist', topDir + '-v' + pkg.version + '-win64.zip');
const ps1 = path.join(root, 'dist', '.build-portable.ps1');

function fail(msg) {
  console.error('[build-portable] ' + msg);
  process.exit(1);
}

function psQuote(p) {
  return [
    String.fromCharCode(39),
    p.split(String.fromCharCode(39)).join(String.fromCharCode(39, 39)),
    String.fromCharCode(39)
  ].join('');
}

if (!fs.existsSync(appExe)) fail('缺少 ' + appExe + '，请先运行 npm run dist:dir');
if (!fs.existsSync(batDir)) fail('缺少 ' + batDir + '（启动脚本目录）');

const bats = fs
  .readdirSync(batDir)
  .filter((f) => f.toLowerCase().endsWith('.bat'))
  .map((f) => path.join(batDir, f));
if (bats.length === 0) fail('electron/portable 下没有 .bat 启动脚本');

// PowerShell 脚本用单引号字面量拼路径；反斜杠转正斜杠交给 .NET，避免在两种语言里来回转义
const script = [
  '$ErrorActionPreference = [char]83 + [char]116 + [char]111 + [char]112',
  'Add-Type -AssemblyName System.IO.Compression.FileSystem',
  '$src = ' + psQuote(unpacked),
  '$zipPath = ' + psQuote(outFile),
  '$top = ' + psQuote(topDir),
  '$bats = @(' + bats.map(psQuote).join(', ') + ')',
  'if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }',
  '$zip = [System.IO.Compression.ZipFile]::Open($zipPath, ' + psQuote('Create') + ')',
  '$slash = [string][char]47',
  '$level = [System.IO.Compression.CompressionLevel]::Optimal',
  'try {',
  '  [void]$zip.CreateEntry($top + $slash)',
  '  foreach ($f in Get-ChildItem -LiteralPath $src -Recurse -File) {',
  '    $rel = $f.FullName.Substring($src.Length + 1).Replace([System.IO.Path]::DirectorySeparatorChar, [char]47)',
  '    [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $f.FullName, $top + $slash + $rel, $level)',
  '  }',
  '  foreach ($b in $bats) {',
  '    $name = [System.IO.Path]::GetFileName($b)',
  '    [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $b, $top + $slash + $name, $level)',
  '  }',
  '} finally {',
  '  $zip.Dispose()',
  '}'
].join('\r\n');

// PowerShell 5.1 只有见到 UTF-8 BOM 才按 UTF-8 解析脚本（脚本里有中文 bat 名）
fs.writeFileSync(ps1, Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from(script, 'utf8')]));

console.log('[build-portable] 源目录: ' + unpacked);
console.log('[build-portable] 启动脚本: ' + bats.map((b) => path.basename(b)).join(', '));
console.log('[build-portable] 开始压缩，约需一两分钟…');

try {
  execFileSync('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', ps1], {
    cwd: root,
    stdio: 'inherit'
  });
} catch (e) {
  fail('PowerShell 压缩失败（exit ' + e.status + '）');
} finally {
  fs.rmSync(ps1, { force: true });
}

if (!fs.existsSync(outFile)) fail('压缩结束但未找到产物 ' + outFile);
const mb = (fs.statSync(outFile).size / 1048576).toFixed(1);
console.log('[build-portable] 完成: ' + outFile + ' (' + mb + ' MB)');
