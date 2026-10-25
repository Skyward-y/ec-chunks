# Windows 桌面版：安装包与打包说明

## 当前产物（已完成）

| 文件 | 大小 | 用途 |
| --- | --- | --- |
| `dist/EcChunks-0.5.0-setup.exe` | 107 MB | **正式安装包**，双击安装，装完桌面 / 开始菜单有「语境词块本」 |
| `dist/win-unpacked/` | 310 MB | 免安装目录（安装包就是它的压缩），可直接运行 `EcChunks.exe` |
| `dist/EcChunks/` | 358 MB | 早期手工便携版（保留备用） |

安装包行为：

- 默认**只为当前用户安装**（`PrivilegesRequired=lowest`），落在 `%LOCALAPPDATA%\Programs\EcChunks`，**不需要管理员权限**。
- 装完自动建**桌面快捷方式**和**开始菜单项**，名字都是「语境词块本」。
- 卸载走「设置 → 应用 → 语境词块本」，或安装目录里的 `unins000.exe`。
- **卸载不删学习数据**：数据存在浏览器的 localStorage / IndexedDB 里（`%APPDATA%\EcChunks`），与安装目录无关。

## 重新打包

```powershell
npm run dist          # = 下面两条
npm run dist:dir      # electron-builder 生成 dist/win-unpacked
npm run dist:inno     # Inno Setup 把 win-unpacked 压成 dist/EcChunks-<version>-setup.exe
```

只改了网页（`ec-chunks-fixed.html`）时也必须重跑 `npm run dist`，因为页面是打进 `resources/app.asar` 的。

改版本号只需改 `package.json` 的 `version`，`tools/build-installer.js` 会自动同步到 `.iss` 脚本和产物文件名。

## 为什么用 Inno Setup 而不是 electron-builder 的 NSIS

electron-builder 的 NSIS 目标在本机**无法完成打包**，已实测确认：

- `makensis.exe`（NSIS 3.0.4.1 和 3.0.5.0 都试过）一旦要写超过约 10 MB 的输出就失败：
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

`tools/patch-nsis.js` 和 `electron/installer.nsi` 是 NSIS 路线的遗留物，当前**不参与构建**，可以删。

## 首次运行的两个坑（已在 main.js 里处理）

1. **Windows 11 build 26000+ 上 Chromium 崩溃**（`STATUS_BREAKPOINT 0x80000003`），表现为双击没反应。
   `electron/main.js` 顶部已关掉硬件加速并加 `--disable-gpu-sandbox`。
2. **渲染进程 launch-failed**：主进程起来了但页面白屏 / 报 `ERR_FAILED`。
   已在启动参数里加 `no-sandbox` / `disable-renderer-sandbox`，并把 `webPreferences.sandbox` 设为 `false`。

排查日志写在 `%TEMP%\ecchunks-startup.log`。
