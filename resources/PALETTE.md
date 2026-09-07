# Nicolas Heaton — Brand Palette & Artwork

Reference for print work. Values are taken from the live site, **nicolasheaton.uk**.

## Artwork

| File | What it is | Canvas | Aspect |
| --- | --- | --- | --- |
| `logo.svg` | Full lockup — monogram, wordmark, rule, "HAIRDRESSER", fan | 2016 × 1696 | 1.19 : 1 landscape |
| `monogram.svg` | NH monogram only | 756 × 1065 | 0.71 : 1 portrait |

Vector, single colour, transparent background, cropped tight to the artwork. They
open as **solid black** — select and apply any swatch to recolour.

The font used in the logo and monogram is `quasar-didone-regular.ttf`.

## Palette

| Name | Hex | RGB | CMYK | Role |
| --- | --- | --- | --- | --- |
| **Onyx** | `#141210` | 20, 18, 16 | 0/10/20/92 | Primary dark — main ground, and the ink colour on pale grounds. Warm near-black. |
| **Brass** | `#c09553` | 192, 149, 83 | 0/22/57/25 | Accent — rules, keylines, borders, ornament. Trim colour, used sparingly. |
| **Ivory** | `#f5f0e6` | 245, 240, 230 | 0/2/6/4 | Primary light — type on onyx, and pale section grounds. Never pure white. |
| **Jade** | `#16362f` | 22, 54, 47 | 59/0/13/79 | Secondary ground, as a change of key against onyx. |
| Champagne | `#e5d3a6` | 229, 211, 166 | 0/8/28/10 | Sub-headings and links on dark. |
| Ash | `#b4aca0` | 180, 172, 160 | 0/4/11/29 | Secondary text on dark. |
| Ink Muted | `#5c5449` | 92, 84, 73 | 0/9/21/64 | Secondary text on light. |
| Brass Deep | `#8a6f3e` | 138, 111, 62 | 0/20/55/46 | Brass-coloured **text** on pale grounds only. |
| Onyx Deep | `#0e0c0b` | 14, 12, 11 | 0/14/21/95 | Recessed dark — footer, drawer. |
| Onyx Raised | `#1d1a17` | 29, 26, 23 | 0/10/21/89 | Raised dark — panels on onyx. |
| Jade Deep | `#102721` | 16, 39, 33 | 59/0/15/85 | Recessed jade. |
| Ivory Shade | `#ece4d4` | 236, 228, 212 | 0/3/10/7 | Second pale ground. |

Hex/RGB are the source of truth. **CMYK is unmanaged conversion — re-convert through
your own profile and proof it.**

## Pairing

- **On onyx / jade:** ivory type, ash for secondary, brass rules and small caps,
  champagne for sub-headings and links.
- **On ivory:** onyx type, ink muted for secondary, brass rules, **brass deep** for
  any brass-coloured words.

**Brass on ivory is only 2.4:1** — fine for rules and ornament, never for text; use
brass deep instead. On onyx, brass is fine at 6.8:1.

## Print

- **Onyx:** don't print `0/10/20/92` over large areas — it goes washed and patchy.
  Use a warm rich black around **C60 M50 Y50 K100**. K100 alone is fine for small type.
- **Brass:** worth costing **gold foil** or metallic ink (Pantone 871/872 C family)
  rather than a CMYK build — the flat build reads muddy on the hairlines.
- **Ivory:** better as a warm uncoated stock than as an ink printed onto white.
- **Pantone starting points**, to check against a physical book: brass 728 C,
  champagne 7500 C, jade 5535 C, ash Warm Gray 3 C. Onyx has no good spot match.

## Type

Body **Outfit** (300 Light; 500 Medium for labels and small caps), headings **Syne**
(700). Both Google Fonts, OFL, free for print.

Tracking carries the deco feel: −0.012em large headings, +0.1em uppercase,
+0.18em buttons, +0.32em small-caps labels.

The logo is outlined artwork, not live type — no font needed to print it, and the
lettering shouldn't be re-set.

## Logo usage

- **Clear space:** 10% of width around the lockup, 25% around the monogram.
- **Minimum size:** lockup **35 mm** wide (45 mm on uncoated or coarse processes) —
  the letterspaced "HAIRDRESSER" line sets the floor. Monogram **10 mm**. Below that,
  use the monogram rather than shrinking the lockup.
- **Reversed** works as supplied: ivory on onyx or jade. Brass on onyx for foil.
- **Emboss:** monogram only — the lockup's hairlines are too fine to hold.
- Don't recolour the halves separately, stretch, or add effects.
- The lockup has a **circular knockout** around the monogram so the diagonal rules
  stop at the ring. It's an SVG mask — check it survived import; the gap should show
  the background through.
