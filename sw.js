/* 语境词块本 · Service Worker
 * 目标：离线可用 + 装到桌面/主屏。
 * 刻意不缓存任何跨域请求（翻译接口），因此断网时翻译会失败，但已收录的词块、复习、统计都照常。
 *
 * 缓存策略
 *   - 导航请求（打开页面）：网络优先，成功就顺手更新缓存；失败回落到缓存，实现离线打开。
 *   - 同源静态资源（本页 HTML / manifest / icon / sw）：缓存优先，命中直接返回。
 *   - 跨域请求：一律不拦截、不缓存。
 *
 * 说明：本文件不写死入口文件名（index.html 还是 ec-chunks-fixed.html 都行），
 * 所以仓库里改文件名不需要动这里。
 */

const CACHE_PREFIX = 'ecchunks-';
const CACHE_VERSION = 'v1';
const CACHE = CACHE_PREFIX + CACHE_VERSION;

/* 安装时尽量预缓存；任何一个 404 都不应让安装失败 */
const PRE_CACHE = ['./', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(PRE_CACHE.map(url => cache.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (e) { return; }
  /* 只管自己的静态资源；翻译接口等跨域请求放行 */
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE);
          cache.put(req, fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE);
        const hit = await cache.match(req);
        if (hit) return hit;
        const shell = await cache.match('./');
        if (shell) return shell;
        return new Response('离线状态，且没有缓存到这个页面。', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req);
    if (hit) return hit;
    const fresh = await fetch(req);
    if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
    return fresh;
  })());
});
