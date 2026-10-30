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
/* 版本号由 tools/stamp-sw.js 按静态资源内容哈希重写，不要手写：手写必然忘记 bump，
 * 结果就是改了 app.js 之后老用户一直看到旧页面。 */
const CACHE_VERSION = '0748b0b6a2';
const CACHE = CACHE_PREFIX + CACHE_VERSION;

/* 安装时尽量预缓存；任何一个 404 都不应让安装失败。
   脚本也在这里预缓存：首次离线打开时如果 app.js 没进缓存，页面壳会渲染出来但一个字都点不动。 */
const PRE_CACHE = [
  './',
  './app.js',
  './pwa.js',
  './redirect.js',
  './manifest.webmanifest',
  './icon.svg',
  /* 离线词典约 2.3MB（单词 + 常见搭配）：预缓存了断网也能看到中文释义 */
  './data/dict.json',
  './data/lemma.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await Promise.all(PRE_CACHE.map((url) => cache.add(url).catch(() => {})));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX) && k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (e) {
    return;
  }
  /* 只管自己的静态资源；翻译接口等跨域请求放行 */
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
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
      })()
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match(req);
      if (hit) return hit;
      const fresh = await fetch(req);
      if (fresh && fresh.ok) cache.put(req, fresh.clone()).catch(() => {});
      return fresh;
    })()
  );
});
