"""Side-by-side check: render | render with linework overlaid in red. Writes art/raw/_check.jpg.

    python art/check_plate.py <name>
"""
import sys

import numpy as np
from PIL import Image

name = sys.argv[1]
raw = "C:/Users/navyr/Documents/GitHub/navyrobson.com/art/raw/"
R = Image.open(raw + name + "_render.png").convert("RGB")
L = Image.open(raw + name + "_line.png").convert("RGBA").resize(R.size, Image.LANCZOS)
a = np.array(L)[..., 3].astype(float)[..., None] / 255
r = np.array(R).astype(float)
ov = r * (1 - a) + a * np.array([255, 60, 40])
Image.fromarray(np.concatenate([r, ov], 1).astype("uint8")).resize((1080, 720)).save(raw + "_check.jpg")
print("ok", R.size)
