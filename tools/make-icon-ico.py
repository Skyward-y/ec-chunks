# -*- coding: utf-8 -*-
"""把 icon.png 重新封装成 Windows 兼容性最好的 ICO：
   16~128px 用 BMP(DIB) 条目，256px 用 PNG 条目，planes=1 / bitcount=32。
   Pillow 直接存 ICO 会把 planes 写成 0 且全部用 PNG，资源管理器有时解析不出图标。"""
import struct, io, os
from PIL import Image

src = Image.open("dist/EcChunks/icon.png").convert("RGBA")
SIZES_BMP = [16, 24, 32, 48, 64, 128]
SIZE_PNG = 256

def bmp_entry(img):
    w, h = img.size
    px = img.load()
    rows = []
    for y in range(h - 1, -1, -1):
        row = bytearray()
        for x in range(w):
            r, g, b, a = px[x, y]
            row += bytes((b, g, r, a))
        rows.append(bytes(row))
    xor = b"".join(rows)
    and_stride = ((w + 31) // 32) * 4
    and_mask = b"\x00" * (and_stride * h)
    bih = struct.pack("<IiiHHIIiiII", 40, w, h * 2, 1, 32, 0,
                      len(xor) + len(and_mask), 0, 0, 0, 0)
    return bih + xor + and_mask

entries = []
for s in SIZES_BMP:
    entries.append((s, bmp_entry(src.resize((s, s), Image.LANCZOS))))

buf = io.BytesIO()
src.resize((SIZE_PNG, SIZE_PNG), Image.LANCZOS).save(buf, format="PNG", optimize=True)
entries.append((256, buf.getvalue()))

out = bytearray()
out += struct.pack("<HHH", 0, 1, len(entries))
offset = 6 + 16 * len(entries)
for size, data in entries:
    dim = 0 if size >= 256 else size
    out += struct.pack("<BBBBHHII", dim, dim, 0, 0, 1, 32, len(data), offset)
    offset += len(data)
for _, data in entries:
    out += data

path = "dist/EcChunks/icon.ico"
open(path, "wb").write(out)
print("written:", path, len(out), "bytes,", len(entries), "entries")

# 复核
d = open(path, "rb").read()
_, _, cnt = struct.unpack_from("<HHH", d, 0)
for i in range(cnt):
    w, h, cc, res, planes, bits, size, off = struct.unpack_from("<BBBBHHII", d, 6 + i * 16)
    kind = "PNG" if d[off:off+4] == b"\x89PNG" else "BMP"
    print("  %3dx%-3d planes=%d bits=%d %-3s %d bytes" % (w or 256, h or 256, planes, bits, kind, size))
