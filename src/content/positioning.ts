import type { Localized } from './types';

/**
 * Section 2 — positioning. Typography only: no cards, no icons, no figures.
 * The statement is Mahmoud's own positioning line from docs/master-context.md
 * ("I don't only understand the campaign..."); `about.statement` carries the
 * proof underneath it, so this file must never repeat that wording.
 */
export const positioning = {
  label: { ar: 'الفكرة باختصار', en: 'In one line' } satisfies Localized,

  /** Rendered as two sentences: the second one lands in the accent. */
  statement: {
    lead: {
      ar: 'مبدأتش بالإعلانات.',
      en: 'I didn’t start with ads.',
    } satisfies Localized,
    accent: {
      ar: 'بدأت إني أفهم البيزنس — من المنتج لحد التسليم.',
      en: 'I started by understanding the business — from product to delivery.',
    } satisfies Localized,
  },
};
