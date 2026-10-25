# 打包成 .exe（Windows 桌面版）

先说结论：**这个应用本体就是一个网页**，所以"变成 exe"= 给它套一个浏览器外壳。三条路线，选一条就行。

| 路线 | 产物 | 体积 | 需要装什么 | 适合谁 |
| --- | --- | --- | --- | --- |
| **A. 不发 exe，发网址**（PWA） | 无（就是 `https://用户名.github.io/ec-chunks/`） | 0 | 什么都不用装 | 分享给朋友最省事；对方浏览器"安装"后桌面上也有图标 |
| **B. Electron 打包**（本文主推） | 单个 `EcChunks-0.5.0-portable.exe` | ≈ 85 MB | 只要装 Node.js | 想给对方一个双击就能用、断网也能用的文件 |
| **C. Tauri / C# WebView2** | 单个 exe | ≈ 5–15 MB | Rust 工具链 或 .NET SDK + VS | 追求极小体积、愿意折腾编译环境 |

下面只讲 **B**。脚手架我已经写好了：`package.json`（含 electron-builder 配置）和 `electron/main.js`（外壳主程序），你不用写一行代码。

> ⚠️ 我这边没法替你直接跑打包：本会话的命令执行被沙箱挡住（工作区属主权限问题，报 `Workspace is not owned by the current user`）。所以下面第 3–6 步需要你在**自己的电脑上**执行，大约 5–10 分钟。

---

## 已经准备好的两个文件

```
default-workspace\
├── package.json        ← 打包配置（Electron 32 + electron-builder 25）
└── electron\main.js    ← 外壳：开一个 1240×860 的窗口，加载本目录的网页
```

`main.js` 里做了这几件事，都和"让人直接用"有关：

- **不用 `file://` 打开**，而是在本机 `127.0.0.1` 上临时起一个只读静态服务（**随机端口**，不对外开放），页面从 `http://127.0.0.1:端口/` 加载。这样浏览器内核认为它是**安全上下文**——`localStorage`、离线缓存、**云同步的跨域请求**全部正常。（直接用 `file://` 打开时云同步会失败，这是浏览器的硬限制。）
- 单实例：重复双击 exe 只会把已有窗口拉到前面，不会开第二个抢数据。
- 页面里的外链一律丢给系统浏览器；阻止页面被导航到站外。
- 去掉菜单栏，`minWidth/minHeight` 防缩成一条缝。
- 渲染进程崩溃时弹框说明，而不是留个白屏。

---

## 第 1 步：装 Node.js（一次就好）

1. 打开 https://nodejs.org/ → 下载 **LTS** 版（`.msi`，x64）。
2. 一路 Next，**保持勾选** `Add to PATH`（默认是勾的）。
3. 装完**新开**一个命令提示符验证：

```bat
node -v
npm -v
```

能打印出 `v20.x.x` / `10.x.x` 之类就成功了。（必须新开窗口，否则 PATH 还没生效。）

## 第 2 步：配置国内镜像（强烈建议，否则下载会卡住）

**PowerShell 版**（当前会话有效）：

```powershell
npm config set registry https://registry.npmmirror.com
$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
$env:ELECTRON_BUILDER_BINARIES_MIRROR = "https://npmmirror.com/mirrors/electron-builder-binaries/"
```

> ⚠️ 别用 `npm config set electron_mirror …`：npm 11 起会报
> `npm error 'electron_mirror' is not a valid npm option`（它只接受内置配置项）。
> 这两个镜像参数必须用**环境变量**传，Electron 的下载器直接读 `ELECTRON_MIRROR`。
> 想长期生效就把那两行换成 `setx ELECTRON_MIRROR "https://npmmirror.com/mirrors/electron/"`（新开的窗口才生效）。

## 第 2.5 步：允许安装脚本（npm 11+ 必做）

npm 11 默认不执行依赖包的 `postinstall`，而 Electron 正是靠它下载二进制的。`npm install` 时如果看到：

```
npm warn install-scripts 1 package has install scripts not yet covered by allowScripts:
npm warn install-scripts   electron@32.3.3 (postinstall: node install.js)
```

说明二进制**根本没下载**，`npm start` 会报
`Error: Cannot find module '...node_modules\electron\cli.js'`。先批准再装：

```powershell
npm install-scripts approve electron
npm install
```

如果提示 `Unknown command: install-scripts`，说明你的 npm 没这套机制，跳过本步即可。

## 第 3 步：装依赖

```powershell
cd "D:\Users\18359\Documents\deepseek-harness\default-workspace"
npm install
```

- 大约下载 200–400 MB，2–5 分钟。
- 看到 `added N packages` 且**没有红色 `npm error`** 就算成功；会多出一个 `node_modules\` 目录（已被 `.gitignore` 忽略，不会进仓库）。
- 出现 `EBUSY` / `EPERM`：关掉杀毒软件的实时防护或先把 GitHub Desktop 关掉重试。
- **装完必须验证二进制到位**（少了它 `npm start` 必失败）：

```powershell
Test-Path .\node_modules\electron\dist\electron.exe
```

返回 `True` 才继续；返回 `False` 时执行 `cd .\node_modules\electron; node install.js; cd ..\..` 手动补下载。

## 第 4 步：先本地试跑（不用打包就能验证）

```bat
npm start
```

应该弹出一个「语境词块本」窗口。**必须确认这几点再往下走**：

- [ ] 页面正常显示，不是白屏
- [ ] 学习页能打开文章、能收录词块
- [ ] 统计页 → 云同步：填 URL + anon key → 能登录（**这一步能过，说明外壳的地基是对的**）
- [ ] 关掉窗口后重新 `npm start`，数据还在（说明 `localStorage` 持久化正常）

白屏的话按 `Ctrl+Shift+I` 看 Console 报错，把报错贴给我。

## 第 5 步：打包成 exe

```bat
npm run dist
```

产物在：

```
default-workspace\dist\EcChunks-0.5.0-portable.exe
```

**这一个是免安装的绿色版**：发给别人，双击就能用，不需要装 Node、不需要装任何东西。

想要**带安装向导**的版本（可选）：

```bat
npm run dist:setup
```

得到 `dist\EcChunks-0.5.0-setup.exe`，会让对方选安装目录、创建桌面快捷方式。

> `dist\` 也被 `.gitignore` 忽略了，不会被提交到仓库。**exe 不要提交进 git**（85 MB 会让仓库变肿，GitHub 单文件上限 100 MB）；要发布就去仓库右侧 `Releases` → `Create a new release` → 把 exe 拖进附件。

## 第 6 步：发给别人之前

1. **改名**：`EcChunks-0.5.0-portable.exe` 可以随便改成 `语境词块本.exe`，不影响运行。
2. **安全提示**：exe 没有代码签名证书，别人第一次运行时 Windows 会弹蓝框「Windows 已保护你的电脑」→ 点 **`更多信息`** → **`仍要运行`**。想彻底消除这个提示需要买代码签名证书（一年上千元），个人分发一般不买。
3. **杀毒误报**：Electron 打包的未签名 exe 偶尔会被 360/火绒误报，加白名单即可。
4. **告诉对方**：第一次打开需要联网（加载页面），之后断网可用；只有"自动翻译"功能需要联网。

---

## ⚠️ 数据不通用的坑（重要）

exe 里的数据存在**自己的独立存储**里，和浏览器里那套是分开的（origin 不同）。所以：

**如果你已经用了一段时间网页版**，先做一次迁移，否则打开 exe 会是一片空白：

1. 网页版 → 统计页 → **导出备份**（下载 `词块本-备份.json`）；
2. 打开 exe → 统计页 → **导入备份** → 选那个 json；
3. 之后两边想同步，就在 exe 里也配一次**云同步**（同一个邮箱），两边自动对齐。

反过来，先配云同步再换环境更省事：网页版登录 → 上传 → exe 里填同样的 URL + key 登录 → 弹窗选"确定"用云端覆盖。

数据存在哪：`C:\Users\<你>\AppData\Roaming\EcChunks\`（`Local Storage` 子目录）。卸载/换电脑前记得导出备份。

---

## 改了网页之后怎么出新的 exe

```bat
cd /d D:\Users\18359\Documents\deepseek-harness\default-workspace
npm run dist
```

改 `ec-chunks-fixed.html` 之后重新跑一次即可，`dist\` 里会覆盖旧文件。版本号在 `package.json` 的 `"version"` 里改，产物文件名会跟着变。

发到 GitHub Pages 的那份不受影响（`package.json`、`electron/`、`node_modules/` 都不影响网页，Pages 只认 `index.html`）。

---

## 常见问题

| 现象 | 原因 / 处理 |
| --- | --- |
| `npm error 'electron_mirror' is not a valid npm option` | npm 11 只认内置配置项。改用环境变量：`$env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"` |
| `npm start` 报 `Cannot find module '…node_modules\electron\cli.js'` | **electron 二进制没装**（npm 11 跳过了 postinstall）。走第 2.5 步 `npm install-scripts approve electron` + `npm install`；仍不行就 `cd node_modules\electron` → `node install.js` |
| `npm install` 卡在 `electron postinstall` 很久 | 没配镜像。按第 2 步设置 `$env:ELECTRON_MIRROR` 后删掉 `node_modules` 重装 |
| `Test-Path .\node_modules\electron\dist\electron.exe` 是 `False` | 二进制缺失，同上；确认镜像环境变量已设置（`$env:ELECTRON_MIRROR` 在当前窗口生效） |
| `Error: electron failed to download` | 同上；或网络被墙，确认环境变量拼写与末尾的斜杠 |
| `npm run dist` 报 `Cannot find module 'electron-builder'` | `npm install` 没跑完，重跑 |
| 打包报 `cannot find app.asar` / 白屏 | 检查 `package.json` 里 `"files"` 是否包含 `*.html`、`sw.js`、`manifest.webmanifest`、`icon.svg`（已配好，别删） |
| exe 双击没反应 / 闪退 | 用 `npm start` 单独试；或在 cmd 里运行 exe 看报错输出 |
| exe 打开是白屏 | `Ctrl+Shift+I` 看 Console；多半是文件没被打进 asar（检查 `"files"`） |
| 窗口标题是 EcChunks | 正常，`productName` 用的是英文名（避免中文路径在部分打包环节出问题），任务栏显示名由 exe 文件名决定，改名即可 |
| 想换成自己的图标 | 准备一个 256×256 的 `.ico`，放到 `electron\icon.ico`，重新 `npm run dist` |

---

## 附：为什么不用 `file://` 直接打开

很多人会想"把 html 和一个 browser 快捷方式一起发出去就行"，但那样：

- `localStorage` 能用，但数据归属是 `file://`，**不同路径算不同站点**，换个目录打开就"丢数据"；
- 云同步的 `fetch` 会被 CORS 拦（`Origin: null`）；
- 离线缓存（Service Worker）在 `file://` 下注册不了。

Electron 外壳里的 `127.0.0.1` 服务把这三件事一次性解决，代价只是 exe 大了 85 MB。
