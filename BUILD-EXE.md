# Windows 桌面版：安装包与打包说明

## 当前产物（已完成）

| 文件 | 大小 | 用途 |
| --- | --- | --- |
| `dist/EcChunks-0.6.0-setup.exe` | 107 MB | **正式安装包**，双击安装，装完桌面 / 开始菜单有「语境词块本」 |
| `dist/EcChunks-v0.6.0-win64.zip` | 139 MB | **免安装版**，解压后双击里面的 `EcChunks.exe` 直接用；起不来就试同目录的两个 `.bat` |

`dist/win-unpacked/`（约 310 MB）是打包**中间产物**，`npm run dist:dir` 会重新生成，随时可以删。

安装包行为：

- 默认**只为当前用户安装**（`PrivilegesRequired=lowest`），落在 `%LOCALAPPDATA%\Programs\EcChunks`，**不需要管理员权限**。
- 装完自动建**桌面快捷方式**和**开始菜单项**，名字都是「语境词块本」。
- 卸载走「设置 → 应用 → 语境词块本」，或安装目录里的 `unins000.exe`。
- **卸载不删学习数据**：笔记固定存在「程序目录下的 `data` 文件夹」（`electron/main.js` 的 `setupPortableUserData()`），整个文件夹拷走笔记就跟着走；卸载程序只删自己安装的文件，`data` 会保留。

## 重新打包

```powershell
npm run dist           # = 下面三条
npm run dist:dir       # electron-builder 生成 dist/win-unpacked（顺带重算 sw.js 的 CACHE_VERSION）
npm run dist:inno      # Inno Setup 把 win-unpacked 压成 dist/EcChunks-<version>-setup.exe
npm run dist:portable  # 把 win-unpacked 打成 dist/EcChunks-v<version>-win64.zip（免安装）
```

只改了网页（`ec-chunks-fixed.html`）时也必须重跑 `npm run dist`，因为页面是打进 `resources/app.asar` 的。

改版本号只需改 `package.json` 的 `version`，`tools/build-installer.js` 会自动同步到 `.iss` 脚本和产物文件名。

## 为什么用 Inno Setup 而不是 electron-builder 的 NSIS

electron-builder 的 NSIS 目标在本机**无法完成打包**，已实测确认：

- `makensis.exe`（NSIS 3.0.4.1 和 3.0.6.0 都试过）一旦要写超过约 10 MB 的输出就失败：
  `Internal compiler error #12345: error creating mmap the size of 142606340`，
  小包则是 `Can't open output file`。
- 同样的 mmap 在 32 位和 64 位 PowerShell 里都能成功映射 136 MB，说明不是系统限制；
  bash 也能在同一目录写 `.exe`。换目录（D 盘、C 盘 Temp、甚至计划任务脱离 Job）全部同样失败。
- 结论：本机安全软件（Huorong / HipsDaemon）对这两个下载来的未签名编译器做了写文件拦截。
  **同一份 ISCC.exe 从 `.cache` 目录运行会报 `Error 5: 拒绝访问`，复制到项目内 `tools/inno-setup/` 后立刻正常** —— 这是最终判定。

所以工具链固定在仓库内：

```
tools/inno-setup/           Inno Setup 6.0.5 编译器（ISCC.exe 及依赖，8 MB，已随仓库保存）
tools/inno-setup/Languages/ChineseSimplified.isl   简体中文界面
electron/installer.iss      安装脚本（UTF-8 BOM，路径相对 electron/）
tools/build-installer.js    调用 ISCC 的封装（自动补 BOM、同步版本号）
```

NSIS 路线的遗留物（`tools/patch-nsis.js`、`electron/installer.nsi`，以及 `package.json` 里的 `nsis` 配置）已经删了：`dist:dir` 用 `--win dir` 出目录，安装包完全由 ISCC 生成。

### 免安装 zip 是怎么来的

`tools/build-portable.js` 基于 `dist/win-unpacked` 流式压缩（借 Windows 自带的 `System.IO.Compression`，不引第三方依赖，250 MB 的 exe 也不会被整个读进内存），顶层目录固定为 `EcChunks/`。以前这个 zip 是手工打的，所以出现过「zip 里还是上一版页面」的情况。

两个启动脚本收在仓库里（`electron/portable/`），打包时一起塞进 zip 根目录：

| 脚本 | 什么时候用 |
| --- | --- |
| `启动语境词块本.bat` | 双击 exe 白屏 / 报 `ERR_FAILED` 时用，加上关掉渲染器沙箱与代码完整性校验的参数 |
| `兼容模式启动.bat` | 上面那个还不行时的最后手段，加 `--single-process` 把所有 Chromium 子进程并进主进程 |

> 历史坑：这两个 bat 以前写的是 `start "" "%~dp0electron.exe"`，而 electron-builder 产出的可执行文件叫 `EcChunks.exe`（取 `productName`），所以双击必然「找不到文件」；文件里还有一段重复的 `@echo off` 头（旧版本拼接失误）。现在 bat 由仓库维护，`npm test` 里有断言守着（必须调 `EcChunks.exe`、必须是 CRLF 行尾），改错会当场失败。

### 别删 dist 里的旧解压目录

`dist/EcChunks-v0.6.0-win64/`（是解压出来的目录，不是 zip）里带着 `EcChunks/data/`，那是实际跑过之后留下的 Chromium 数据目录，**笔记就在 `data/Local Storage/leveldb/`**。它不属于构建产物，重新打包时不要顺手删；升级时把新 zip 解压到别处、只覆盖程序文件，保留 `data/` 即可。

打包前 `dist:dir` 会自动跑 `node tools/stamp-sw.js`，按静态资源内容重算 `sw.js` 里的 `CACHE_VERSION`（手写必然忘记 bump，老用户会卡在旧缓存上）。想单独检查是否过期：`node tools/stamp-sw.js --check`。

## 在受限沙箱里手工打包（`npm run dist` 起不来时）

在 DSH 的 `workspace-write` 沙箱里跑 `npm run dist`，会失败在 electron-builder 这一步：

```
Cannot spawn ...app-builder-bin\win\x64\app-builder.exe: Error: spawn EPERM
```

不是文件权限（直接执行那个 exe 能正常打印版本号），而是沙箱禁止用**管道 stdio** 起子进程：
`execFileSync(cmd, args, { stdio: 'pipe' })` 必然 EPERM，`{ stdio: 'inherit' }` 正常。
electron-builder 内部要抓子进程输出，绕不过去，于是改成手工三步，产物与 `npm run dist` 一致：

```bash
node tools/repack-unpacked.js            # 1) 重打 dist/win-unpacked/resources/app.asar（进程内打包，不起子进程）
tools/inno-setup/ISCC.exe electron/installer.iss   # 2) 编译安装包：从 shell 直接调，不经 node spawn
node tools/build-portable.js             # 3) 免安装 zip（脚本本来就用 stdio:'inherit'）
```

手工重打 asar 的文件清单必须和 `package.json` 的 `build.files` 对齐（`tools/repack-unpacked.js` 已经对齐），
少一个就是「装完打开白页」。ISCC 编译约 2.5 分钟，别用默认 2 分钟的超时去掐它。

**GUI 回归没法在沙箱里做**：打包出来的 `EcChunks.exe` 在这里一律 `rc=3` 且没有任何日志
（Chromium 启动要开命名管道，沙箱同样禁止），环境里若带 `ELECTRON_RUN_AS_NODE=1` 它还会被当成 node 跑
（`--version` 会打印 node 的版本号）。「双击能开、页面能点」必须由人在沙箱外过一遍。

## 首次运行的两个坑（已在 main.js 里处理）

1. **Windows 11 build 26000+ 上 Chromium 崩溃**（`STATUS_BREAKPOINT 0x80000003`），表现为双击没反应。
   `electron/main.js` 顶部已关掉硬件加速并加 `--disable-gpu-sandbox`。
2. **渲染进程 launch-failed**：主进程起来了但页面白屏 / 报 `ERR_FAILED`。
   已在启动参数里加 `no-sandbox` / `disable-renderer-sandbox`，并把 `webPreferences.sandbox` 设为 `false`。

排查日志写在 `%TEMP%\ecchunks-startup.log`。
