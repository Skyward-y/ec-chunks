#!/usr/bin/env node
/* 本地静态预览服务器（npm run preview）
 *
 * 为什么需要它：应用本体 ec-chunks-fixed.html 双击也能打开，但浏览器禁止 file:// 页面
 * fetch 本地 json，应用里的离线词典（data/dict.json / data/lemma.json）就拿不到——
 * 于是「我的文章」里自动提上来的词块会少掉中文意思、其他义项、词形还原与逐词助记。
 * 走 http://127.0.0.1 打开就没有这条限制，和打包后的桌面版看到的东西一致。
 *
 * 预览时故意把 sw.js 换成一个空文件：Service Worker 是 cache-first 的，
 * 改完代码只按刷新会一直看到旧缓存，很容易误判「改动没生效」。
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOME = '/ec-chunks-fixed.html';
const START_PORT = Number(process.env.PORT || 8000);
const TRIES = 20;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8'
};

function send(res, code, body, type) {
  res.writeHead(code, { 'Content-Type': type || 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}

function handler(req, res) {
  let pathname = '/';
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
  } catch (e) {
    return send(res, 400, 'bad request');
  }
  if (pathname === '/') pathname = HOME;
  if (pathname === '/sw.js') {
    return send(res, 200, '/* preview: 预览时禁用 Service Worker，免得旧缓存挡住改动 */\n', MIME['.js']);
  }
  const file = path.join(ROOT, pathname);
  /* 只服务工作区里的文件：拼出来的路径必须仍在 ROOT 下面 */
  if (file !== ROOT && !file.startsWith(ROOT + path.sep)) return send(res, 403, 'forbidden');
  fs.readFile(file, (err, buf) => {
    if (err) return send(res, 404, 'not found: ' + pathname);
    send(res, 200, buf, MIME[path.extname(file).toLowerCase()] || 'application/octet-stream');
  });
}

function listen(port, left) {
  const server = http.createServer(handler);
  server.once('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && left > 0) return listen(port + 1, left - 1);
    console.error('[preview] 启动失败：' + (err && err.message ? err.message : err));
    process.exit(1);
  });
  server.listen(port, '127.0.0.1', () => {
    console.log('语境词块本 · 本地预览');
    console.log('  http://127.0.0.1:' + port + HOME);
    console.log('  （Ctrl+C 退出；预览时 Service Worker 已禁用，改完文件刷新就行）');
  });
}

listen(START_PORT, TRIES);
