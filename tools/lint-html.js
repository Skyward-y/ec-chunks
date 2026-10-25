#!/usr/bin/env node
/**
 * HTML 边界检查（原先是「把内联脚本抽出来交给 ESLint」，现已改造）。
 *
 * 背景：这个 App 原来把几千行 JS 全写在 ec-chunks-fixed.html 的 <script> 里，ESLint 读不了
 * HTML，所以只能抽出来查。为了能上真正的 CSP（script-src 'self'），脚本已经拆到 app.js /
 * pwa.js / redirect.js，由 npm run lint 直接检查；这里改成守门，防止有人图省事又写回内联 ——
 * 那样 CSP 会静默地把整段脚本拦掉，页面看起来"白屏但不报错"。
 *
 * 检查三件事：
 *   1. HTML 里没有「不带 src 的 script」；
 *   2. HTML 里没有 on* 内联事件属性（同样会被 CSP 拦）；
 *   3. 页面带着 CSP，且 script-src 没有放开 unsafe-inline。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PAGES = ['ec-chunks-fixed.html', 'index.html'];

let failed = 0;
function fail(file, msg) {
  failed++;
  console.error('  FAIL ' + file + '：' + msg);
}

PAGES.forEach((name) => {
  const file = path.join(ROOT, name);
  if (!fs.existsSync(file)) {
    fail(name, '文件不存在');
    return;
  }
  const html = fs.readFileSync(file, 'utf8');
  let problems = 0;

  const inline = html.match(/<script(?![^>]*\ssrc=)[^>]*>[\s\S]*?<\/script>/g) || [];
  inline.forEach((tag) => {
    const body = tag.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    if (body.trim()) {
      problems++;
      fail(name, '出现内联脚本（会被 CSP 拦掉，请移到独立 .js 文件）');
    }
  });

  const handlers = html.match(/\son(?:click|change|input|keydown|keyup|submit|load|error)\s*=/gi) || [];
  if (handlers.length) {
    problems++;
    fail(name, '出现内联事件属性 ' + handlers.join(', ') + '（请改成 addEventListener）');
  }

  const cspMatch = html.match(/<meta http-equiv="Content-Security-Policy" content="([^"]*)"/);
  if (!cspMatch) {
    problems++;
    fail(name, '缺少 CSP meta');
  } else {
    /* 只查 script-src 这一条指令：style-src 上的 unsafe-inline 是刻意留的（页面还有内联 style 属性） */
    const directives = cspMatch[1].split(';').map((d) => d.trim());
    const scriptSrc = directives.find((d) => d.indexOf('script-src') === 0);
    const defaultSrc = directives.find((d) => d.indexOf('default-src') === 0) || '';
    if (!scriptSrc) {
      problems++;
      fail(name, 'CSP 里缺少 script-src');
    } else if (scriptSrc.indexOf('unsafe-inline') >= 0 || scriptSrc.indexOf('unsafe-eval') >= 0) {
      problems++;
      fail(name, 'script-src 不允许放开 unsafe-inline / unsafe-eval：' + scriptSrc);
    }
    if (defaultSrc && (defaultSrc.indexOf('unsafe-inline') >= 0 || defaultSrc.indexOf('unsafe-eval') >= 0)) {
      problems++;
      fail(name, 'default-src 不应放开 unsafe-*（会被 script-src 缺失时兜底用到）');
    }
    if (scriptSrc) {
      const origin = scriptSrc.replace('script-src', '').trim();
      if (origin.indexOf("'self'") < 0) {
        problems++;
        fail(name, "script-src 必须包含 'self'：" + scriptSrc);
      }
    }
  }

  if (!problems) console.log('  ok   ' + name);
});

console.log('HTML 边界：' + (failed ? failed + ' 个问题' : '0 个问题'));
process.exit(failed ? 1 : 0);
