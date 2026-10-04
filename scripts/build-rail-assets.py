"""Trim existing public catalog cutouts for the hanger carousel; preserve alpha."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
images = {
 'nds-sweats-02-gray': 'sweats-02-gray-0',
 'nds-sweats-02-black': 'sweats-02-black-0',
 'nds-exp-04-bl-vessel': 'exp-04-bl-vessel-0',
 'nds-exp-04-wh-vessel': 'exp-04-wh-vessel-0',
 'nds-exp-03-belt-pants': 'exp-03-belt-pants-0',
 'nds-exp-02-canvas-jacket-navy': 'exp-02-canvas-jacket-navy-0',
 'nds-exp-02-canvas-lace-jacket-black': 'exp-02-canvas-lace-jacket-black-0',
 'nds-sweats-01-v2': 'sweats-01-v2-1',
}
destination = root / 'public/assets/clothes/rail'
destination.mkdir(parents=True, exist_ok=True)
for name, source in images.items():
    image = Image.open(root / f'public/assets/nep/current/{source}.webp').convert('RGBA')
    box = image.getchannel('A').point(lambda alpha: 255 if alpha > 16 else 0).getbbox()
    if not box:
        raise ValueError(f'Empty garment: {source}')
    image = image.crop(box)
    image.thumbnail((900, 1100))
    image.save(destination / f'{name}.webp', quality=86, method=6)
    print(name, image.size)
