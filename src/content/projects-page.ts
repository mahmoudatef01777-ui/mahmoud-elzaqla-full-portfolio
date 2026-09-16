import type { Localized } from './types';

/**
 * /projects — the page around the ten cards. The cards themselves read from
 * `results.ts`, so a figure still only lives in one place.
 */
export const projectsPage = {
  title: { ar: 'كل المشاريع', en: 'All projects' } satisfies Localized,
  subtitle: {
    ar: 'مجموعة من المشاريع اللي اشتغلت عليها — بنتائج موثقة، وتجارب مختلفة من قلب الـE-commerce.',
    en: "A selection of projects I’ve worked on — real results, different challenges, and hands-on e-commerce experience.",
  } satisfies Localized,

  /**
   * A margin note, not a disclaimer. It answers the question a client asks
   * themselves while scanning the grid — "if he understands CRO, content,
   * the store, creative and operations, why is that not visible on every
   * project here?" — before they answer it themselves with something worse.
   *
   * It must stay THREE SHORT LINES at small type. It does not blame a client,
   * it does not apologise, and it never grows into a paragraph.
   */
  scopeNote: {
    ar: [
      'مش كل مشروع اشتغلت عليه كان بنفس النطاق أو بنفس مساحة القرار.',
      'في مشاريع كان دوري فيها محدد، وفي مشاريع كان عندي فيها مساحة أكبر إني أشتغل على الـbusiness والـmarketing والـe-commerce ككل.',
      'اللي هتشوفه هنا هو اللي اتعمل فعلًا في كل تجربة.',
    ],
    en: [
      'Not every project had the same scope or the same room for decision-making.',
      'In some projects, my role was focused on specific areas. In others, I had more room to work across the business, marketing and e-commerce.',
      'What you see here reflects what was actually done in each project.',
    ],
  } satisfies Localized<string[]>,

  /**
   * The last word on the page, and the only forward-looking line on it: what
   * he does with a brand NOW, which is broader than what some of the older
   * engagements allowed. Set larger than the transparency note above it —
   * the note is fine print, this is the message.
   */
  closing: {
    ar: 'ومع أي براند جديد، ببدأ من الصورة كاملة — البيزنس، السوق، المنتج، العميل، الـstore، التسويق والتشغيل — وبحدد الأول إيه اللي محتاج يتصلح قبل ما نبدأ في التوسع.',
    en: 'With a new brand, I start from the full picture — the business, market, product, customer, store, marketing and operations — and first identify what needs fixing before we scale.',
  } satisfies Localized,

  /**
   * Only brands with a real case study page appear here — a card is clickable
   * only if its id has a route in this map.
   *
   * All ten have one now: Bloomy is its own component, the other nine
   * render from case-studies.ts. Until 2026-09-14 only Bloomy was listed here,
   * which left seven finished pages reachable from the home page marquee but
   * dead on this one.
   */
  caseStudies: {
    bloomy: '/work/bloomy',
    cove: '/work/cove',
    veloura: '/work/veloura',
    fakhama: '/work/fakhama',
    'el-haramein': '/work/el-haramein',
    'dahab-decor': '/work/dahab-decor',
    brilliant: '/work/brilliant',
    'yours-shoes': '/work/yours-shoes',
    kayan: '/work/kayan',
    asloaraby: '/work/asloaraby',
  } as Record<string, string | undefined>,

  readCase: { ar: 'اقرا الحالة كاملة', en: 'Read the full case study' } satisfies Localized,

  note: {
    ar: 'المشاريع اللي مفيش جنبها رقم، مفيش ليها أرقام موثقة أقدر أنشرها — فماحطتش أرقام. وكل رقم في الصفحة دي مكتوب جنبه مصدره وفترته، وكله مبيعات وأوردرات متسجلة — مش أرباح.',
    en: "Where a project carries no figure, there is no verified figure I can publish — so none is shown. Every figure on this page carries its source and period, and all of them are recorded sales and orders — not profit.",
  } satisfies Localized,
};
