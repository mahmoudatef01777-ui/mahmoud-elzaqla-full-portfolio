import type { Localized } from './types';

/**
 * "Experience" — where the understanding came from, placed before the evidence
 * so a visitor knows who is showing them the screenshots.
 *
 * THE ONE THING IT MUST SAY: he did not become an e-commerce marketer and then
 * learn the business. He learned the business from inside the operation first,
 * and learned customer acquisition after that.
 *
 * THEREFORE, DO NOT PUT HERE:
 *  - Shopify, Meta or TikTok as services or tools. They live in Capabilities
 *    and in the Tools band. Naming them here turns the story into a service
 *    list, which is exactly what this section was rewritten to stop doing.
 *  - Anything that reads as web development. He is not a developer.
 *  - Manufacturing expertise. He went into the factory and learned part of the
 *    process; he is not a manufacturer and must never be framed as one.
 *  - The childhood shop and poultry story. Withdrawn from the whole site.
 *
 * FIGURES — supplied by Mahmoud, confirmed 2026-09-14 after being queried
 * twice. The EGP figure is sales made by the BUSINESSES he worked in, which is
 * why its label says "across different e-commerce businesses": it is not
 * revenue attributed to him, and never profit (docs/CLAUDE.md). The period
 * belongs to that figure, not beside it as a separate achievement.
 */

export const experience = {
  label: { ar: 'الخبرة', en: 'Experience' } satisfies Localized,

  title: {
    ar: 'اتعلّمت الـ e-commerce من جوّه.',
    en: 'I learned e-commerce from the inside.',
  } satisfies Localized,

  body: {
    ar: 'مبقيتش ماركتير e-commerce وبعدين اتعلّمت البيزنس. بدأت من جوّه العملية نفسها — المخزن والأوردرات والعملاء — وبعد ما فهمت الشغل ده، اتعلّمت إزاي أجيب العميل.',
    en: 'I did not become an e-commerce marketer and then learn the business. I started inside the operation itself — the warehouse, the orders, the customers — and only after I understood that did I learn how to bring customers in.',
  } satisfies Localized,

  /**
   * THE FIVE MILESTONE ROWS ARE GONE (2026-09-15) AND MUST NOT COME BACK.
   *
   * They told the same progression as /background — warehouse, customers and
   * returns, managing the operation, the factory, Bloomy — one paragraph
   * shorter. A visitor who pressed "الحكاية كاملة" therefore read the whole
   * thing twice, which makes the long version feel like filler.
   *
   * The story lives in content/background-page.ts. This section is now the
   * short version: one claim, two figures, one button. If the progression
   * needs editing, edit it there.
   */

  stats: [
    {
      id: 'orders',
      value: '25,000+',
      label: {
        ar: 'أوردر اتعاملت معاها وأدرتها',
        en: 'Orders handled and managed',
      } satisfies Localized,
    },
    {
      id: 'sales',
      value: 'EGP 7M+',
      label: {
        ar: 'مبيعات في بيزنسات e-commerce مختلفة',
        en: 'Sales across different e-commerce businesses',
      } satisfies Localized,
      /**
       * Belongs to the figure above it, not beside it: the period is how long
       * those sales took, NOT a separate achievement. Never promote it to its
       * own stat — as one it read as "his whole career is seven months".
       */
      note: {
        ar: 'في حوالي 6 شهور',
        en: 'in ~6 months',
      } satisfies Localized,
    },
  ],

  cta: {
    route: '/background',
    label: { ar: 'الحكاية كاملة', en: 'Read the full background' } satisfies Localized,
  },
};
