"""Turn Fusion plate output (art/raw) into web assets (public/plates/<name>/).

For every <name>_render.png with a matching <name>_line.png:
  render.webp  the ray-traced render, as is (quality 86)
  line.webp    linework recoloured to the site's ink (#e9e6df) on full transparency,
               downsampled from the 2x capture so strokes stay crisp
  (art/raw/<name>_meta.json  pixel size + camera info, kept local)

    python art/make_web_art.py            # all plates
    python art/make_web_art.py gimbal     # one plate
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "art" / "raw"
OUT = ROOT / "public" / "plates"
INK = (233, 230, 223)
# Fusion draws visible edges mid-grey; stretch so the darkest stroke reads at full ink
LINE_GAIN = 1.6


def line_asset(src: Path, size: tuple[int, int]) -> Image.Image:
    im = Image.open(src).convert("RGBA").resize(size, Image.LANCZOS)
    alpha = np.asarray(im)[..., 3].astype(np.float32) / 255.0
    alpha = np.clip(alpha * LINE_GAIN, 0, 1)
    out = np.zeros((size[1], size[0], 4), np.uint8)
    out[..., :3] = INK
    out[..., 3] = (alpha * 255).round().astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def main(names: list[str]) -> None:
    renders = sorted(RAW.glob("*_render.png"))
    for r in renders:
        name = r.name[: -len("_render.png")]
        if names and name not in names:
            continue
        line = RAW / f"{name}_line.png"
        if not line.exists():
            print("skip", name, "(no linework)")
            continue
        dst = OUT / name
        dst.mkdir(parents=True, exist_ok=True)
        render = Image.open(r).convert("RGB")
        render.save(dst / "render.webp", quality=86, method=6)
        line_asset(line, render.size).save(dst / "line.webp", lossless=True, method=6)
        info = RAW / f"{name}_info.json"
        meta = {"width": render.width, "height": render.height}
        if info.exists():
            meta["camera"] = json.loads(info.read_text())
        # camera/bbox metadata stays local (art/raw), never published with the site
        (RAW / f"{name}_meta.json").write_text(json.dumps(meta, indent=1))
        kb = [round((dst / f).stat().st_size / 1024) for f in ("render.webp", "line.webp")]
        print(f"{name}: render {kb[0]} KB, line {kb[1]} KB, {render.size}")


if __name__ == "__main__":
    main(sys.argv[1:])
