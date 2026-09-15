import type { Localized, ProjectLink } from './types';
import { projects } from './projects';

/**
 * Brand social profiles.
 *
 * The links themselves already live on each project (and, for the ones with a
 * page, on each case study). This module only classifies them, so a brand's
 * Instagram and Facebook can render as icons next to its name while a live
 * store or a domain keeps its readable text link.
 *
 * Adding a platform: add it to PLATFORMS and to ORDER, then give it an icon in
 * components/ui/SocialLinks.tsx. Nothing else needs to change.
 */

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok';

export interface BrandSocial {
  platform: SocialPlatform;
  href: string;
  /** Accessible name — the icon has no visible text of its own. */
  label: Localized;
}

/** Matched against the link's label, lower-cased. */
const PLATFORMS: Record<string, SocialPlatform> = {
  instagram: 'instagram',
  facebook: 'facebook',
  tiktok: 'tiktok',
};

/** Display order, so every brand's row reads the same way. */
const ORDER: SocialPlatform[] = ['instagram', 'facebook', 'tiktok'];

const ON: Record<SocialPlatform, Localized> = {
  instagram: { ar: 'على إنستجرام', en: 'on Instagram' },
  facebook: { ar: 'على فيسبوك', en: 'on Facebook' },
  tiktok: { ar: 'على تيك توك', en: 'on TikTok' },
};

/** The raw links recorded for a project, by id. */
export function linksForProject(id: string): ProjectLink[] {
  return projects.find((p) => p.id === id)?.links ?? [];
}

/**
 * Split a project's links into the social profiles (rendered as icons) and
 * everything else (a store, a domain — rendered as text, because the address
 * is the point).
 */
export function splitLinks(
  links: ProjectLink[] | undefined,
  brand: string,
): { social: BrandSocial[]; other: ProjectLink[] } {
  const social: BrandSocial[] = [];
  const other: ProjectLink[] = [];

  for (const link of links ?? []) {
    const platform = PLATFORMS[link.label.trim().toLowerCase()];
    if (!platform) {
      other.push(link);
      continue;
    }
    social.push({
      platform,
      href: link.href,
      label: {
        ar: `${brand} ${ON[platform].ar}`,
        en: `${brand} ${ON[platform].en}`,
      },
    });
  }

  social.sort((a, b) => ORDER.indexOf(a.platform) - ORDER.indexOf(b.platform));
  return { social, other };
}
