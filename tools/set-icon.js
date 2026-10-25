const fs = require('fs');
const PELibrary = require('pe-library');
const ResEdit = require('resedit');

const src = 'dist/EcChunks/electron.exe';
const dst = 'dist/electron.new.exe';
const ico = 'dist/EcChunks/icon.ico';

console.log('reading exe...');
const exe = PELibrary.NtExecutable.from(fs.readFileSync(src), { ignoreCert: true });
const res = PELibrary.NtExecutableResource.from(exe);
console.log('reading ico...');
const iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(ico));
console.log('ico images:', iconFile.icons.map((i) => (i.width || 256) + 'x' + (i.height || 256)).join(','));

ResEdit.Resource.IconGroupEntry.replaceIconsForResource(
  res.entries,
  1,
  1033,
  iconFile.icons.map((i) => i.data)
);
res.outputResource(exe);

const generated = exe.generate();
const out = Buffer.from(generated instanceof ArrayBuffer ? new Uint8Array(generated) : generated);
fs.writeFileSync(dst, out);
console.log('written:', dst, out.length, 'bytes');

const exe2 = PELibrary.NtExecutable.from(fs.readFileSync(dst), { ignoreCert: true });
const res2 = PELibrary.NtExecutableResource.from(exe2);
const g2 = res2.entries.filter((e) => e.type === 14);
const i2 = res2.entries.filter((e) => e.type === 3);
console.log('verify RT_GROUP_ICON:', g2.map((g) => 'id=' + g.id + ' lang=' + g.lang).join(','));
console.log('verify RT_ICON ids:', i2.map((g) => g.id + '(' + (g.bin ? g.bin.length : '?') + 'B)').join(', '));
