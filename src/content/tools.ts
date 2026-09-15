import type { Localized } from './types';

/**
 * The platforms Mahmoud actually works in, shown as a light band under the
 * hero. Not a services list and not a skills claim — just the tools.
 *
 * The marks are the official brand glyphs (simple-icons, CC0), inlined as
 * paths so nothing is fetched at runtime and no generic stand-in is ever
 * substituted for a real logo.
 *
 * RESTING STATE IS MONOCHROME, and that is the point: four grey marks read
 * as one quiet row under the hero instead of four competing logos. The real
 * colours belong to the hover, where they arrive slowly.
 *
 * `brand` is the one colour that describes a platform — it tints the hairline
 * ring and, for a mark that is genuinely one colour, fills the glyph.
 *
 * `layers` is for a mark that is NOT one colour. Each layer is a real part of
 * the real logo, never a decoration invented here — TikTok's note in cyan and
 * in red, offset either side of the black one, which is how the mark is
 * actually built. Its top layer takes `--c-ink` rather than #000 so it is
 * near-white in dark mode, which is what TikTok's own guidance does on dark
 * grounds. The field stays for whatever comes next.
 *
 * DO NOT add a tool Mahmoud has not worked in. Every entry has to be
 * something he can be asked about in an interview. Odoo ERP and Google Ads
 * both came out on 2026-09-15 at his request; the Bloomy case study still
 * cites Odoo ERP as the source of its figures, which is a different claim
 * and stays.
 */

/** One coloured part of a mark that is not a single colour. */
export interface ToolLayer {
  /** 24x24 viewBox path. */
  d: string;
  /**
   * Any CSS colour. Applied through `style`, not the `fill` attribute, so
   * `rgb(var(--c-ink))` resolves — an attribute would not expand the var.
   */
  fill: string;
  /** Offset inside the 24x24 box, for marks built from offset copies. */
  dx?: number;
  dy?: number;
}

export interface Tool {
  id: string;
  name: string;
  /** The platform's own colour: the ring on hover, and the glyph fill for a
   *  mark that has no `layers`. */
  brand: string;
  /** 24x24 viewBox path. The resting, monochrome state — always used. */
  path: string;
  /** The mark in its real colours, cross-faded in on hover. Omit when
   *  `brand` alone is the whole truth about the logo. */
  layers?: ToolLayer[];
}

/** TikTok's mark is this one glyph drawn three times, offset. */
const TIKTOK =
  'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z';

export const tools = {
  title: {
    ar: 'المنصات اللي بشتغل عليها في الوقت الحالي',
    en: 'Platforms I work on right now',
  } satisfies Localized,

  items: [
    {
      id: "meta",
      name: "Meta Ads",
      brand: "#0467DF",
      path:
        "M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z",
    },
    {
      id: "tiktok",
      name: "TikTok Ads",
      // The ring colour. TikTok's registered colour is #000000, which would
      // read as no change at all against the resting grey.
      brand: "#FE2C55",
      path: TIKTOK,
      layers: [
        { d: TIKTOK, fill: "#25F4EE", dx: -0.85, dy: -0.85 },
        { d: TIKTOK, fill: "#FE2C55", dx: 0.85, dy: 0.85 },
        { d: TIKTOK, fill: "rgb(var(--c-ink))" },
      ],
    },
    {
      id: "shopify",
      name: "Shopify",
      brand: "#7AB55C",
      path:
        "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z",
    },
  ] satisfies Tool[],
};
