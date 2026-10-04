"""Build Kyle's original block display face. Requires fonttools."""
from pathlib import Path
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

PATTERNS = {
'A':'01110/11011/11011/11111/11011/11011/11011',
'B':'11110/11011/11011/11110/11011/11011/11110',
'C':'01111/11000/11000/11000/11000/11000/01111',
'D':'11110/11011/11011/11011/11011/11011/11110',
'E':'11111/11000/11000/11110/11000/11000/11111',
'F':'11111/11000/11000/11110/11000/11000/11000',
'G':'01111/11000/11000/11011/11011/11011/01111',
'H':'11011/11011/11011/11111/11011/11011/11011',
'I':'11111/01110/01110/01110/01110/01110/11111',
'J':'00111/00011/00011/00011/00011/11011/01110',
'K':'11011/11011/11110/11100/11110/11011/11011',
'L':'11000/11000/11000/11000/11000/11000/11111',
'M':'11011/11111/11111/11011/11011/11011/11011',
'N':'11011/11111/11111/11111/11011/11011/11011',
'O':'01110/11011/11011/11011/11011/11011/01110',
'P':'11110/11011/11011/11110/11000/11000/11000',
'Q':'01110/11011/11011/11011/11011/11110/01111',
'R':'11110/11011/11011/11110/11110/11011/11011',
'S':'01111/11000/11000/01110/00011/00011/11110',
'T':'11111/01110/01110/01110/01110/01110/01110',
'U':'11011/11011/11011/11011/11011/11011/01110',
'V':'11011/11011/11011/11011/11011/01110/00100',
'W':'11011/11011/11011/11011/11111/11111/01010',
'X':'11011/11011/01110/00100/01110/11011/11011',
'Y':'11011/11011/01110/00100/00100/00100/00100',
'Z':'11111/00011/00110/01100/11000/11000/11111',
'.':'00000/00000/00000/00000/00000/01100/01100',
"'":'01100/01100/01000/00000/00000/00000/00000',
}

def main():
    builder = FontBuilder(1000, isTTF=True)
    glyphs = {'.notdef': TTGlyphPen(None).glyph(), 'space': TTGlyphPen(None).glyph()}
    metrics = {'.notdef': (620, 0), 'space': (320, 0)}
    cmap = {32: 'space'}
    for character, rows in PATTERNS.items():
        name = f'block{ord(character)}'
        pen = TTGlyphPen(None)
        for row, line in enumerate(rows.split('/')):
            for column, pixel in enumerate(line):
                if pixel != '1': continue
                x, y = 40 + column * 100, 600 - row * 100
                # Stepped pixels with a slight forward slant echo the reference typography.
                points = [(x + int(y * .12), y), (x + 100 + int(y * .12), y),
                          (x + 100 + int((y + 100) * .12), y + 100), (x + int((y + 100) * .12), y + 100)]
                pen.moveTo(points[0])
                for point in points[1:]: pen.lineTo(point)
                pen.closePath()
        glyphs[name] = pen.glyph()
        metrics[name] = (650, 40)
        cmap[ord(character)] = name
        if character.isalpha(): cmap[ord(character.lower())] = name
    cmap[0x2019] = cmap[ord("'")]
    builder.setupGlyphOrder(list(glyphs))
    builder.setupCharacterMap(cmap)
    builder.setupGlyf(glyphs)
    builder.setupHorizontalMetrics(metrics)
    builder.setupHorizontalHeader(ascent=800, descent=-200)
    builder.setupNameTable({'familyName':'Kyle Block', 'styleName':'Regular', 'uniqueFontIdentifier':'KyleBlock-Regular-2026', 'fullName':'Kyle Block Regular', 'psName':'KyleBlock-Regular'})
    builder.setupOS2(sTypoAscender=800, sTypoDescender=-200, usWinAscent=800, usWinDescent=200)
    builder.setupPost()
    builder.setupMaxp()
    builder.font.flavor = 'woff'
    destination = Path(__file__).resolve().parents[1] / 'public/assets/fonts/kyle-block.woff'
    builder.font.save(destination)

if __name__ == '__main__': main()
