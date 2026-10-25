// 本机（Windows，无管理员、无桌面会话）构建 NSIS 安装包的两处补丁。
//
// 背景：electron-builder 在 Windows 上生成“已签名卸载器”的做法是：先编译一个
// BUILD_UNINSTALLER 版安装包，再**运行它**让它 WriteUninstaller 出 __uninstaller-*.exe，
// 然后用 File 把该文件打进最终安装包。本机构建 shell 无法运行 GUI 子系统程序
// （运行后挂起，最终 exit code null），所以这一步必然失败。
//
// 对策：
// 1) 给 include/installer.nsh 里的 File "${UNINSTALLER_OUT_FILE}" 加 ifdef 保护；
// 2) 生成 electron/installer.nsi（模板副本），改为安装时用 WriteUninstaller 现场生成卸载程序，
//    并无条件 include uninstaller.nsh（最终包需要 Section "un.install" 作为卸载代码段）。
// 配合 package.json 的 nsis.script 指向 electron/installer.nsi，electron-builder 会跳过
// “运行安装包生成卸载器”和“签名卸载器”两步。
const fs = require('fs');
const path = require('path');

const templates = path.join(__dirname, '..', 'node_modules', 'app-builder-lib', 'templates', 'nsis');
const incPath = path.join(templates, 'include', 'installer.nsh');
const outPath = path.join(__dirname, '..', 'electron', 'installer.nsi');

// ---- 1) include/installer.nsh：给 File 指令加条件保护 ----
const incLines = fs.readFileSync(incPath, 'utf8').split(/\r?\n/);
const anchorIdx = incLines.findIndex((l) => l.trim().startsWith('File "/oname=${UNINSTALL_FILENAME}"'));
if (anchorIdx >= 0) {
  incLines.splice(anchorIdx, 1,
    '  # patched by tools/patch-nsis.js: 本机无法运行 exe 预生成卸载器，改为安装时 WriteUninstaller',
    '  !ifdef UNINSTALLER_OUT_FILE',
    incLines[anchorIdx],
    '  !endif');
  fs.writeFileSync(incPath, incLines.join('\n'));
  console.log('[patch-nsis] include/installer.nsh 已打补丁');
} else {
  console.log('[patch-nsis] include/installer.nsh 无需补丁');
}

// ---- 2) 生成 electron/installer.nsi ----
let nsi = fs.readFileSync(path.join(templates, 'installer.nsi'), 'utf8');
const anchor = 'Section "install" INSTALL_SECTION_ID';
if (!nsi.includes(anchor)) throw new Error('模板结构变化：找不到 install Section');
const injected = [
  '# patched by tools/patch-nsis.js：安装开始前先落地卸载程序',
  'Section "writeUninstaller"',
  '  CreateDirectory $INSTDIR',
  '  WriteUninstaller "$INSTDIR\\' + '${UNINSTALL_FILENAME}"',
  'SectionEnd',
  '',
  anchor,
].join('\n');
nsi = nsi.replace(anchor, injected);

const guarded = '!ifdef BUILD_UNINSTALLER\r\n  !include "uninstaller.nsh"\r\n!endif';
const guardedLf = '!ifdef BUILD_UNINSTALLER\n  !include "uninstaller.nsh"\n!endif';
if (nsi.includes(guardedLf)) {
  nsi = nsi.replace(guardedLf, '!include "uninstaller.nsh"  # patched：最终安装包也需要卸载代码段');
} else if (nsi.includes(guarded)) {
  nsi = nsi.replace(guarded, '!include "uninstaller.nsh"  # patched：最终安装包也需要卸载代码段');
} else {
  console.log('[patch-nsis] 警告：未找到 uninstaller.nsh 的条件 include，请人工检查');
}
fs.writeFileSync(outPath, nsi);
console.log('[patch-nsis] 已生成', outPath, nsi.length, '字节');
