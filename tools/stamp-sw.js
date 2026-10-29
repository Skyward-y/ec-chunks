#!/usr/bin/env node
/* 把 sw.js 里的 CACHE_VERSION 换成「由静态资源内容算出的指纹」。
 *
 * 为什么需要它：Service Worker 只有在 sw.js 的字节变化时才会更新。
 * 以前版本号是手写的 'v1'，改了 app.js 却忘了改它，老用户就会一直看到缓存里的旧页面，
 * 而且这种 bug 在开发机上永远复现不了（开发机每次都清缓存）。
 * 现在版本号完全由资源内容决定：只要 index.html / app.js / pwa.js 等变了，指纹就变，
 * 浏览器就会装新 SW、activate 时删掉旧缓存。
 *
 * 用法：
 *   node tools/stamp-sw.js           就地改写 sw.js
 *   node tools/stamp-sw.js --check   只检查是否过期（过期退出码 1）
 * 打包脚本（dist:dir / dist）会自动跑一次，所以发版不需要记得手动改。
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.join(__dirname, '..');
/* 参与指纹的文件：任何会改变线上行为的静态资源都算进来 */
const ASSETS = [
  'index.html',
  'ec-chunks-fixed.html',
  'app.js',
  'pwa.js',
  'redirect.js',
  'manifest.webmanifest',
  'icon.svg',
  /* 离线词典：换了词典也要让 PWA 重新装缓存，不然老用户拿到的还是旧释义 */
  'data/dict.json',
  'data/lemma.json'
];

/* 按「内容」而不是「字节」算指纹：Windows 上 core.autocrlf=true 的克隆会把同样的文件
 * 检出成 CRLF，直接哈希字节会让本机和 Linux/CI 算出两个指纹，--check 必然互相打架
 * （而且换了行尾就会让所有老用户的缓存失效一次）。所以先把 CRLF 归一成 LF 再哈希。 */
function readNormalized(p) {
  if (!fs.existsSync(p)) return Buffer.alloc(0);
  const buf = fs.readFileSync(p);
  /* 二进制资源（图标等）原样参与哈希；含 NUL 的一律当二进制，不做行尾归一 */
  if (buf.includes(0)) return buf;
  return Buffer.from(buf.toString('utf8').replace(/\r\n/g, '\n'), 'utf8');
}

function contentHash() {
  const h = crypto.createHash('sha256');
  for (const f of ASSETS) {
    h.update(f + ':');
    h.update(readNormalized(path.join(root, f)));
    h.update('\n');
  }
  return h.digest('hex').slice(0, 10);
}

const swPath = path.join(root, 'sw.js');
const src = fs.readFileSync(swPath, 'utf8');
const RE = /const CACHE_VERSION = '[^']*';/;
if (!RE.test(src)) {
  console.error("[stamp-sw] sw.js 里找不到 const CACHE_VERSION = '...';");
  process.exit(1);
}
const version = contentHash();
const next = src.replace(RE, "const CACHE_VERSION = '" + version + "';");

if (next === src) {
  console.log('[stamp-sw] CACHE_VERSION 已是最新：' + version);
  process.exit(0);
}
if (process.argv.includes('--check')) {
  console.error('[stamp-sw] CACHE_VERSION 过期了：资源变了但 sw.js 还是旧指纹。');
  console.error('[stamp-sw] 运行 npm run stamp 更新（打包脚本会自动跑）。');
  process.exit(1);
}
fs.writeFileSync(swPath, next, 'utf8');
console.log('[stamp-sw] CACHE_VERSION -> ' + version);
