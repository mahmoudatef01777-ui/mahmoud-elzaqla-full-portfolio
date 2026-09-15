import type { Lang } from '@/i18n/config';

/** Every user-facing string exists in both languages. */
export type Localized<T = string> = Record<Lang, T>;

/** Where a number came from. Shown next to it, always. */
export type EvidenceSource = 'Shopify' | 'Odoo ERP' | 'Meta Ads Manager' | 'TikTok' | 'Self-reported';

/**
 * A single published number.
 * Evidence rules (docs/CLAUDE.md): sales are not profit, store sales are not
 * ad-attributed sales, and no number ships without a period and a source.
 */
export interface Result {
  /** Pre-formatted for display, e.g. "EGP 2.9M", "5.44%", "1,526". */
  value: string;
  label: Localized;
  period: Localized;
  source: EvidenceSource;
  /** true = seen in a dashboard/screenshot. false = self-reported, show "approx." */
  verified: boolean;
  note?: Localized;
}

export type AssetGroup =
  | 'product'
  | 'creative'
  | 'ops'
  | 'orders'
  | 'results'
  | 'website'
  | 'social'
  | 'portrait';

export interface Asset {
  /** Path under site/public, written by scripts/optimize-assets.mjs. */
  src: string;
  type: 'image' | 'video';
  group: AssetGroup;
  /** Poster frame for videos. */
  poster?: string;
  width?: number;
  height?: number;
  alt: Localized;
  caption?: Localized;
}

export interface ProjectLink {
  label: string;
  href: string;
}

/** Cover shown on the Selected work card. */
export interface ProjectCover {
  src: string;
  width: number;
  height: number;
  /** 'cover' fills the card; 'contain' sits the image inside it untouched,
   *  which keeps small screenshots sharp instead of upscaling them. */
  fit: 'cover' | 'contain';
  alt: Localized;
}

export interface Project {
  id: string;
  /** Brand names stay in Latin in both languages. */
  name: string;
  /** Small square logo badge, shown on the work card. */
  logo?: string;
  /** A = large stacking card. B = compact card. */
  tier: 'A' | 'B';
  /** Optional badge, e.g. "Live — early results". */
  status?: Localized;
  role: Localized;
  summary: Localized;
  tags: Localized<string[]>;
  links: ProjectLink[];
  results: Result[];
  assets: Asset[];
  /** Card cover for the Selected work grid. */
  cover?: ProjectCover;
  /** Its own page, when one exists. */
  href?: string;
  /** The single line the card leads with. Must match a row in `results`. */
  cardResult?: Localized;
}
