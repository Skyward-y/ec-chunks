/**
 * 语境词块本 · Electron 外壳
 *
 * 为什么不用 loadFile(file://)：file:// 属于「非安全上下文」，localStorage 能用但
 * Service Worker / 跨域 fetch 会被浏览器内核直接拒绝，云同步（Supabase）就废了。
 * 这里在本机 127.0.0.1 上起一个只读的临时静态服务器（随机端口），页面从
 * http://127.0.0.1:<port>/ 加载 —— 属于安全上下文，origin 是标准的 http 源，
 * 云同步、localStorage、离线缓存全都正常，且不对外开放任何端口。
 */
const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');

// ---------------------------------------------------------------------------
// Windows 11 24H2/25H2（build 26000+，例如 26200）上有一类已知的 Chromium 启动崩溃：
// 进程以 STATUS_BREAKPOINT (0x80000003) 退出，PowerShell 里看到的就是 exit=-2147483645，
// 表现是「双击后什么都没发生、也没有任何日志」。触发点是 GPU / 沙箱初始化。
// 本应用是纯 DOM 界面，不需要 GPU 合成，所以直接关硬件加速 + GPU 沙箱——最稳且无副作用。
// 必须在 app ready 之前调用。
//
// 这些开关不是无条件开的：默认关（这是被验证过能启动的那条路），但可以用环境变量把
// 安全边界打开一次，用来验证新系统版本 / 新 Electron 是否已经修好那个崩溃：
//   set EC_CHUNKS_SANDBOX=1 && 语境词块本.exe
// 打开后不再关硬件加速，也不再关 GPU / 渲染器沙箱（webPreferences.sandbox 同步为 true）。
// ---------------------------------------------------------------------------
function sandboxRequested() {
  const v = String(process.env.EC_CHUNKS_SANDBOX || '')
    .trim()
    .toLowerCase();
  return v === '1' || v === 'on' || v === 'true';
}
const USE_SANDBOX = sandboxRequested();
if (!USE_SANDBOX) {
  app.disableHardwareAcceleration();
  app.commandLine.appendSwitch('disable-gpu-sandbox');
  // 更深一层：渲染进程本身在部分 Win11 26000+ 机器上会以 launch-failed 直接起不来，
  // 根因是渲染器沙箱 / 代码完整性校验（RendererCodeIntegrity）初始化失败。
  // 本应用只加载自己打包的本地页面、不执行外部代码，关掉渲染器沙箱无实际安全损失。
  app.commandLine.appendSwitch('no-sandbox');
  app.commandLine.appendSwitch('disable-renderer-sandbox');
  app.commandLine.appendSwitch('disable-features', 'RendererCodeIntegrity');
}

// 网页文件所在目录：开发时是仓库根目录，打包后在 app.asar 根目录（Electron 的 fs 同时支持普通路径与 asar 路径）
const ROOT = path.join(__dirname, '..');

// 双击启动没有控制台可看，关键事件另写一份到 %TEMP%\ecchunks-startup.log
const LOG_PATH = path.join(process.env.TEMP || process.env.LOCALAPPDATA || __dirname, 'ecchunks-startup.log');
function logLine(...parts) {
  const line =
    new Date().toISOString() +
    ' ' +
    parts
      .map((p) => {
        if (typeof p === 'string') return p;
        if (p instanceof Error) return p.stack || p.message;
        try {
          return JSON.stringify(p);
        } catch (e) {
          return String(p);
        }
      })
      .join(' ');
  try {
    fs.appendFileSync(LOG_PATH, line + '\r\n');
  } catch (e) {
    /* 写不了也不影响启动 */
  }
  try {
    console.log(line);
  } catch (e) {}
}
// ---------------------------------------------------------------------------
// 数据存放位置：便携模式下放在「程序目录\data」，整个文件夹拷到 U 盘/别的电脑
// 笔记都跟着走。只有主进程跑在打包后的 app.asar 里时才启用（开发时仍用默认位置），
// 并且遇到只读目录（例如放进 Program Files）会自动退回 %APPDATA%。
// 真正写进去的是 Chromium 的 origin 存储：localStorage / IndexedDB / Service Worker。
// ---------------------------------------------------------------------------
(function setupPortableUserData() {
  if (!app.isPackaged) return;
  const exeDir = path.dirname(process.execPath);
  const portableDir = path.join(exeDir, 'data');
  try {
    fs.mkdirSync(portableDir, { recursive: true });
    // 真正写一个探针文件，比 accessSync 可靠（Windows 上 ACL 判断很容易骗过 access）
    const probe = path.join(portableDir, '.write-test');
    fs.writeFileSync(probe, 'ok');
    fs.unlinkSync(probe);
  } catch (e) {
    // 故意不回退到 %APPDATA%：笔记只存在一个确定的位置，
    // 否则用户会变成「在这台机上打开有笔记、换个位置打开没有」的谜案。
    logLine('程序目录不可写，退出', e);
    dialog.showErrorBox(
      '无法保存笔记',
      '程序所在目录不可写：\n' +
        exeDir +
        '\n\n语境词块本把笔记保存在程序目录下的 data 文件夹里。' +
        '当前目录不允许写入，最常见的原因是把它放进了 Program Files。' +
        '\n\n请把整个 EcChunks 文件夹移动到可写的位置' +
        '（例如 D:\\Apps\\EcChunks、桌面或 U 盘），然后重新打开。'
    );
    app.exit(1);
    return;
  }
  app.setPath('userData', portableDir);
})();

logLine('boot', {
  exe: process.execPath,
  userData: app.getPath('userData'),
  argv: process.argv.slice(1),
  electron: process.versions.electron,
  chrome: process.versions.chrome,
  noSandbox: app.commandLine.hasSwitch('no-sandbox')
});

// ---------------------------------------------------------------------------
// 本地静态服务端口：必须固定。
// 页面 origin 是 http://127.0.0.1:<port>，而 localStorage / IndexedDB / Service Worker
// 缓存全都按 origin 隔离的 —— 端口一变就等于换了个应用，上一次存的笔记再也读不到。
// 之前这里传 0 让系统随机分配端口，正是「内容存不住」的根因。
// ---------------------------------------------------------------------------
const PREFERRED_PORT = 47821;
// 顺延范围给得大一点：每顺延一格都是新的 origin，但只要顺序是确定的，
// 下次启动还会落到同一个备用端口上，至少不会每次丢在不一样的地方。
const PORT_TRIES = 30;

// 上次成功用过的端口，记在 data 目录里（跟着便携目录一起走）。
// 端口变了 = 这次读的是另一个 origin 的存储，必须在界面上明确告诉用户。
const PORT_FILE = path.join(app.getPath('userData'), 'port.json');
let portChangedFrom = 0; // 非 0 表示这次换了端口，值是上次用的端口

function readLastPort() {
  try {
    const j = JSON.parse(fs.readFileSync(PORT_FILE, 'utf8'));
    const p = Number(j && j.port);
    return Number.isFinite(p) && p > 0 ? p : 0;
  } catch (e) {
    return 0; // 第一次启动 / 文件被删，都当作没有记录
  }
}

function writeLastPort(port) {
  try {
    fs.writeFileSync(PORT_FILE, JSON.stringify({ port: port, at: new Date().toISOString() }, null, 2));
  } catch (e) {
    logLine('WARN 记录端口失败', e);
  }
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

let server = null;
let origin = ''; // 例：http://127.0.0.1:53124
let win = null;

// 判断某个地址是否真的和本地服务同源。
// 不能用 url.startsWith(origin)：下面两种地址都以 origin 开头，但主机根本不是 127.0.0.1
//   http://127.0.0.1:53124.evil.com/   —— 前缀成立，实际主机是 evil.com
//   http://127.0.0.1:53124@evil.com/   —— userinfo 写法，前缀成立，实际主机是 evil.com
function isSameOrigin(url, base) {
  try {
    return new URL(url).origin === base;
  } catch {
    return false; // 解析不出来的一律当站外
  }
}

function startServer() {
  return new Promise((resolve, reject) => {
    server = http.createServer((req, res) => {
      let rel;
      try {
        rel = decodeURIComponent((req.url || '/').split('?')[0].split('#')[0]);
      } catch (e) {
        res.writeHead(400).end('bad request');
        return;
      }
      if (rel === '/' || rel === '') rel = '/index.html';

      // 目录穿越防护：解析后必须仍在 ROOT 之内
      const target = path.normalize(path.join(ROOT, rel));
      if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
        res.writeHead(403).end('forbidden');
        return;
      }

      fs.readFile(target, (err, buf) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('not found: ' + rel);
          return;
        }
        res.writeHead(200, {
          'Content-Type': MIME[path.extname(target).toLowerCase()] || 'application/octet-stream',
          // 本机读盘，不缓存，改了文件重启即生效
          'Cache-Control': 'no-store'
        });
        res.end(buf);
      });
    });

    // 固定端口；万一被别的程序占用，就在相邻的 10 个端口里顺延
    const attempt = (port) =>
      new Promise((res, rej) => {
        const onOk = () => {
          server.removeListener('error', onErr);
          res(server.address().port);
        };
        const onErr = (e) => {
          server.removeListener('listening', onOk);
          rej(e);
        };
        server.once('listening', onOk);
        server.once('error', onErr);
        server.listen(port, '127.0.0.1');
      });

    (async () => {
      for (let p = PREFERRED_PORT; p < PREFERRED_PORT + PORT_TRIES; p++) {
        try {
          return await attempt(p);
        } catch (e) {
          if (e && e.code === 'EADDRINUSE') {
            logLine('端口被占用，顺延', p);
            continue;
          }
          throw e;
        }
      }
      // 极端情况：首选端口段的 30 个端口全被占。仍退回随机端口保证能打开，
      // 但数据会落到一个不固定的 origin 上 —— 这种「每次都可能换地址」的情况
      // 除写日志外，还要在窗口标题上标出来（见 createWindow）。
      logLine('WARN 首选端口段全部被占用，退回随机端口，本次数据与之前不互通');
      return await attempt(0);
    })().then(
      (port) => {
        origin = `http://127.0.0.1:${port}`;
        // 端口换了就是换了 origin：记下来，稍后在窗口上告诉用户。
        const prev = readLastPort();
        if (prev && prev !== port) portChangedFrom = prev;
        writeLastPort(port);
        logLine('本地服务已就绪', origin, prev && prev !== port ? `（上次是 ${prev}）` : '');
        if (port !== PREFERRED_PORT) {
          logLine('WARN 未使用首选端口', { preferred: PREFERRED_PORT, actual: port, previous: prev || null });
        }
        resolve();
      },
      (err) => reject(err)
    );
  });
}

async function createWindow() {
  logLine('沙箱模式', { sandbox: USE_SANDBOX ? 'on（EC_CHUNKS_SANDBOX）' : 'off（默认，Win11 26000+ 兼容）' });
  win = new BrowserWindow({
    width: 1240,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    title: '语境词块本',
    backgroundColor: '#f4f8f6',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // 与上面的开关同步：EC_CHUNKS_SANDBOX=1 时才真开沙箱
      sandbox: USE_SANDBOX,
      spellcheck: false
    }
  });

  // 顶部菜单栏整个去掉（Ctrl+F12 之类也不留），看起来就是个纯应用
  Menu.setApplicationMenu(null);

  // 首帧渲染好再显示，避免白屏闪一下
  win.once('ready-to-show', () => win.show());

  // 兜底：万一 ready-to-show 没触发（页面卡住、资源异常），3 秒后也把窗口显示出来，
  // 否则表现就是「双击后什么都没发生」——比白屏难查得多。
  setTimeout(() => {
    if (win && !win.isDestroyed() && !win.isVisible()) {
      console.warn('[main] ready-to-show 未触发，强制显示窗口');
      win.show();
    }
  }, 3000);

  // 页面里的 target=_blank / window.open 一律交给系统浏览器，不在壳里开新窗口
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });

  // 阻止页面被导航到站外（例如误拖进一个链接把应用顶掉）
  win.webContents.on('will-navigate', (e, url) => {
    if (isSameOrigin(url, origin)) return;
    e.preventDefault();
    if (/^https?:/i.test(url)) shell.openExternal(url);
  });

  // 渲染进程崩溃时给个明确提示，而不是留个空白窗口
  win.webContents.on('render-process-gone', (_e, details) => {
    logLine('render-process-gone', details || {});
    dialog.showErrorBox(
      '页面意外退出',
      '语境词块本渲染进程已停止：' +
        (details && details.reason ? details.reason : 'unknown') +
        (details && typeof details.exitCode === 'number' ? '（exitCode=' + details.exitCode + '）' : '') +
        '\n\n日志文件：' +
        LOG_PATH +
        '\n请重新打开应用。'
    );
  });

  try {
    await win.loadURL(origin + '/index.html');
  } catch (err) {
    console.error('[main] 页面加载失败：', err && err.stack ? err.stack : err);
    logLine('loadURL failed', err);
    dialog.showErrorBox('打开失败', '无法加载应用页面。\n' + (err && err.message ? err.message : String(err)));
    app.quit();
    return;
  }

  // 端口变了 → 这次是另一个 origin，界面上的笔记看起来「没了」。
  // 以前只写一行日志，用户看到的就是「数据丢了」；现在明确说清楚 + 标题上留痕。
  if (portChangedFrom) {
    const port = Number(origin.split(':').pop());
    const suffix = `（备用端口 ${port}）`;
    win.on('page-title-updated', (e) => {
      e.preventDefault();
      win.setTitle('语境词块本' + suffix);
    });
    win.setTitle('语境词块本' + suffix);
    await dialog.showMessageBox(win, {
      type: 'warning',
      title: '这次用的是备用端口',
      message: `本次地址是 127.0.0.1:${port}，上次是 127.0.0.1:${portChangedFrom}。`,
      detail:
        '笔记是按「地址」分开存放的（浏览器本地存储的规则），所以你在上次地址上的词块和进度' +
        '这次看不到 —— 数据没有被删除，仍然在磁盘上。\n\n' +
        `最常见的原因是别的程序占用了 ${PREFERRED_PORT} 附近的端口。关掉那个程序再重新打开本应用，` +
        '就会回到原来的地址，笔记自动回来。\n\n' +
        `想查是谁占着：在 PowerShell 里运行  netstat -ano | findstr :${PREFERRED_PORT}\n` +
        '启动日志：' +
        LOG_PATH,
      buttons: ['知道了'],
      defaultId: 0,
      noLink: true
    });
    logLine('端口变化已告知用户', { from: portChangedFrom, to: port });
  }

  // 调试用：启动前设置环境变量 EC_DEBUG=1 会自动打开开发者工具
  if (process.env.EC_DEBUG) win.webContents.openDevTools({ mode: 'detach' });
}

// 单实例：重复双击 exe 时聚焦已有窗口，而不是开第二个（避免两个窗口抢同一份数据）
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  console.warn('[main] 已有实例持有单实例锁，本次启动直接退出（这很可能是"什么窗口都没弹"的原因）');
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.show();
    win.focus();
  });

  app.whenReady().then(async () => {
    try {
      await startServer();
      console.log('[main] 本地静态服务已就绪：' + origin);
      await createWindow();
      console.log('[main] 窗口已创建，页面地址：' + origin + '/index.html');
    } catch (err) {
      console.error('[main] 启动失败：', err && err.stack ? err.stack : err);
      dialog.showErrorBox('启动失败', err && err.message ? err.message : String(err));
      app.quit();
    }
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });

  app.on('window-all-closed', () => {
    if (server) {
      try {
        server.close();
      } catch (e) {
        /* 忽略 */
      }
      server = null;
    }
    app.quit();
  });
}
