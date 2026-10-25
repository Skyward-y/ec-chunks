# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFont
import os

S = 1024
RADIUS = int(116 / 512 * S)

# 对角渐变背景
c1 = (0x2f, 0x9e, 0x6e)
c2 = (0x48, 0xc9, 0x8e)
grad = Image.new('RGBA', (S, S))
px = grad.load()
for y in range(S):
    for x in range(0, S, 1):
        t = (x + y) / (2.0 * (S - 1))
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        px[x, y] = (r, g, b, 255)
    if y % 256 == 0:
        pass

mask = Image.new('L', (S, S), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, S - 1, S - 1], radius=RADIUS, fill=255)

img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
img.paste(grad, (0, 0), mask)

d = ImageDraw.Draw(img)
font_size = int(196 / 512 * S)
font_path = r"C:\Windows\Fonts\segoeuib.ttf"
if not os.path.exists(font_path):
    font_path = r"C:\Windows\Fonts\arialbd.ttf"
font = ImageFont.truetype(font_path, font_size)

# 逐字符绘制以模拟 letter-spacing: 6
spacing = int(6 / 512 * S)
text = "EN"
widths = [d.textlength(ch, font=font) for ch in text]
total_w = sum(widths) + spacing * (len(text) - 1)
x = (S - total_w) / 2
baseline = 322 / 512 * S
for ch, w in zip(text, widths):
    d.text((x, baseline), ch, font=font, fill=(255, 255, 255, 255), anchor='ls')
    x += w + spacing

out_dir = r"dist/EcChunks"
os.makedirs(out_dir, exist_ok=True)
png_path = os.path.join(out_dir, "icon.png")
ico_path = os.path.join(out_dir, "icon.ico")
img.save(png_path)
img.save(ico_path, format='ICO', sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("png:", os.path.getsize(png_path))
print("ico:", os.path.getsize(ico_path))
