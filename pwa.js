/* PWA 注册：只在 https / localhost 下注册 Service Worker；双击 file:// 打开时浏览器不允许
 * 注册，这里静默跳过，不影响任何功能。单独成一个文件，是为了让 HTML 不带任何内联脚本。 */
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('./sw.js').catch(function () { /* 离线能力不可用，不影响使用 */ });
  });
}
