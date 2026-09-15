import type { Localized } from './types';

/**
 * The home page Projects strip — navigation only.
 *
 * No figures, no screenshots, no dashboards. Results are evidence and they
 * live inside the case studies; this row exists to make a visitor curious
 * enough to open one.
 *
 * Order is deliberate: the deepest case studies lead.
 */
export const projectsStrip = {
  label: { ar: 'المشاريع', en: 'Projects' } satisfies Localized,
  title: {
    ar: 'براندات اشتغلت عليها من جوّه',
    en: 'Brands I have worked on from the inside',
  } satisfies Localized,
  hint: {
    ar: 'كل مشروع ليه صفحة فيها دوري والأرقام ومصدرها.',
    en: 'Each one has its own page — my role, the numbers, and where they came from.',
  } satisfies Localized,

  /** Goes to the full grid, which carries the work with no numbers too. */
  cta: {
    route: '/projects',
    label: { ar: 'كل المشاريع', en: 'All projects' } satisfies Localized,
  },

  items: [
    { id: 'bloomy', name: 'Bloomy', logo: '/work/bloomy/logo.webp',
      role: { ar: 'براندي أنا', en: 'My own brand' } },
    { id: 'cove', name: 'Cove', logo: '/work/cove/logo.webp',
      role: { ar: 'ستور وتشغيل', en: 'Store & operations' } },
    { id: 'veloura', name: 'Veloura', logo: '/work/veloura/logo.webp',
      role: { ar: 'ستور وإعلانات', en: 'Store & ads' } },
    { id: 'fakhama', name: 'Fakhama', logo: '/work/fakhama/logo.webp',
      role: { ar: 'براند ومحتوى', en: 'Brand & content' } },
    { id: 'dahab-decor', name: 'Dahab Decor', logo: '/work/dahab-decor/logo.webp',
      role: { ar: 'منتج غالي', en: 'High-ticket' } },
    { id: 'el-haramein', name: 'El Haramein', logo: '/work/el-haramein/logo.webp',
      role: { ar: 'حضور وتجربة عميل', en: 'Presence & experience' } },
    { id: 'yours-shoes', name: 'Yours Shoes', logo: '/work/yours-shoes/imgi-57-593287240-1126488553026048-5494534627175785149-n.webp',
      role: { ar: 'ستور Shopify', en: 'Shopify store' } },
    { id: 'brilliant', name: 'Brilliant', logo: '/work/brilliant/logo.webp',
      role: { ar: 'إعلانات وموقع', en: 'Ads & website' } },
    { id: 'kayan', name: 'KAYAN', logo: '/work/kayan/logo.webp',
      role: { ar: 'ستور Shopify', en: 'Shopify store' } },
    { id: 'asloaraby', name: 'أصله عربي', logo: '/work/asloaraby/logo.webp',
      role: { ar: 'ستور Shopify', en: 'Shopify store' } },
  ] as Array<{ id: string; name: string; logo: string; role: Localized }>,
};
