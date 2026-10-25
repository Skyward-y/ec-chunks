// electron-builder 的 afterPack 钩子：给打包出来的 exe 烧上应用图标。
//
// 为什么不用 electron-builder 自带的 win.icon：
// 它依赖 winCodeSign 里的 rcedit，而 winCodeSign 的 7z 内含 macOS 的符号链接，
// 在 Windows 上（没有管理员权限/开发者模式）解压必然失败，导致整个打包中断。
// 所以这里禁用内置的资源编辑（build.win.signAndEditExecutable=false），
// 改用 resedit 自己把 icon.ico 写进 exe 的资源段。
const fs = require('fs');
const path = require('path');
const PELibrary = require('pe-library');
const ResEdit = require('resedit');

function burnIcon(exePath, icoPath) {
  const exe = PELibrary.NtExecutable.from(fs.readFileSync(exePath), { ignoreCert: true });
  const res = PELibrary.NtExecutableResource.from(exe);
  const iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(icoPath));
  ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
    res.entries,
    1,
    1033,
    iconFile.icons.map((i) => i.data)
  );
  res.outputResource(exe);
  const generated = exe.generate();
  fs.writeFileSync(exePath, Buffer.from(generated instanceof ArrayBuffer ? new Uint8Array(generated) : generated));
  return iconFile.icons.length;
}

module.exports = async function afterPack(context) {
  const outDir = context.appOutDir;
  const exeName = context.packager.appInfo.productFilename + '.exe';
  const exePath = path.join(outDir, exeName);
  const icoPath = path.join(context.packager.projectDir, 'electron', 'icon.ico');

  if (!fs.existsSync(exePath)) {
    console.warn('[after-pack] 未找到 exe，跳过图标写入:', exePath);
    return;
  }
  try {
    const count = burnIcon(exePath, icoPath);
    console.log('[after-pack] 已写入图标', count, '个尺寸 →', exePath);
  } catch (e) {
    console.error('[after-pack] 写入图标失败:', e.message);
    throw e;
  }
};
