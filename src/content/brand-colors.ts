/**
 * Each brand's own colour, used only to tint its name on hover.
 *
 * Taken from the brand's actual logo in public/work/<id>/, not invented: the
 * logo was sampled for its most chromatic colour (scripts are ad hoc; the
 * values are checked in here so the site never has to read an image to paint
 * text). Each one is then darkened until it clears 4.5:1 on the page
 * background — a logo gold at its true lightness is around 1.9:1 and would be
 * unreadable as a 16px name.
 *
 * So these read as the brand without failing the contrast floor the rest of
 * the site holds to. If a brand supplies an official hex, replace the value
 * here and re-check it against #F4F1E8.
 */
export const brandColors: Record<string, string> = {
  // Gold dress mark on white.                              4.7:1
  bloomy: '#8A6528',
  // The mint/teal circle.                                  4.6:1
  cove: '#4E7374',
  // The burgundy field behind the gold monogram.           10.7:1
  veloura: '#6B1226',
  // The olive field behind the cream lettering.            8.9:1
  fakhama: '#4A421C',
  // Gold on near-black.                                    4.8:1
  'dahab-decor': '#8A6220',
  // The gold field behind the white calligraphy.           4.7:1
  'el-haramein': '#7E6A2E',
  // Red-orange from the book mark.                         4.8:1
  brilliant: '#BB412F',
  // NOTE: this logo is genuinely monochrome — black mark on white, no colour
  // anywhere in it. Its "brand colour" is the near-black it is drawn in, so
  // its hover is deliberately the quietest of the set.
  'yours-shoes': '#3A3A3A',
  // Also genuinely monochrome: a charcoal mark on transparent, sampled at
  // #34312E. Kept as-is — it already clears the floor by a wide margin.
  kayan: '#34312E',
  // Black Arabic calligraphy on white — monochrome like the two above.
  asloaraby: '#202020',
};

/** Falls back to the site accent for a project with no logo colour on file. */
export function brandColor(id: string): string {
  return brandColors[id] ?? 'rgb(var(--c-orange))';
}
