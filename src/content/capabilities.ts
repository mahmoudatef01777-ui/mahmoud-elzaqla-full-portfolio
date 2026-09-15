import type { Localized } from './types';

/**
 * Section 6 — capabilities.
 *
 * Deliberately not a grid of service cards: the framing line says these are
 * used together on one business, and each row names what Mahmoud actually does
 * (docs/master-context.md -> SKILLS). Nothing here may imply a skill listed as
 * "developing" is a strong one. GA4 and GTM are NOT listed here at all — the
 * "currently learning" line was removed on Mahmoud’s instruction, so a
 * developing skill must not be reintroduced as a capability instead.
 */

export interface Capability {
  id: string;
  name: Localized;
  detail: Localized;
  /** The concrete things inside it. Short, no marketing adjectives. */
  items: Localized<string[]>;
}

export const capabilities = {
  label: { ar: 'اللي بعمله', en: 'What I do' } satisfies Localized,

  title: {
    ar: 'خمس حاجات بشتغلها مع بعض، مش خمس خدمات منفصلة',
    en: 'Five things I use together, not five separate services',
  } satisfies Localized,

  intro: {
    ar: 'البراند الواحد محتاجهم كلهم في نفس الوقت. لما واحدة منهم تبقى ضعيفة، الباقي بيتحمّل التمن — وده اللي بيخلّي فصلهم عن بعض مش مفيد.',
    en: 'One brand needs all of them at once. When one is weak the others pay for it \u2014 which is exactly why splitting them apart does not help.',
  } satisfies Localized,

  items: [
    {
      id: 'performance',
      name: { ar: 'إعلانات الأداء', en: 'Performance marketing' },
      detail: {
        ar: 'Meta وTikTok: بناء الحساب، هيكلة الحملات بـ ABO، تجربة الزوايا، والتوسيع على أساس تكلفة الأوردر.',
        en: 'Meta and TikTok: account build, ABO campaign structure, angle testing, and scaling against cost per order.',
      },
      items: {
        ar: ['Meta Ads', 'TikTok Ads', 'Pixel وCAPI'],
        en: ['Meta Ads', 'TikTok Ads', 'Pixel & CAPI'],
      },
    },
    {
      id: 'shopify',
      name: { ar: 'Shopify والـ E-commerce', en: 'Shopify & e-commerce' },
      detail: {
        ar: 'بناء الستور من الأول: الثيم، صفحات المنتج، الشحن، السياسات، والتطبيقات اللي فعلاً بتفرق.',
        en: 'Building the store from scratch: theme, product pages, shipping, policies, and the apps that actually matter.',
      },
      items: {
        ar: ['بناء الستور', 'صفحة المنتج', 'الباندلز والريفيوهات', 'إعداد الشحن'],
        en: ['Store build', 'Product pages', 'Bundles & reviews', 'Shipping setup'],
      },
    },
    {
      id: 'creative',
      name: { ar: 'الكرياتيف', en: 'Performance creative' },
      detail: {
        ar: 'الزاوية قبل الكاميرا: بحث المنافسين، السكريبت، التصوير، والمونتاج — وكل كرياتيف ليه دور في الرحلة.',
        en: 'The angle before the camera: competitor research, scripts, shooting and editing \u2014 each creative with a job in the journey.',
      },
      items: {
        ar: ['زوايا وهوكس', 'سكريبت وتصوير', 'ريلز', 'UGC ومحتوى'],
        en: ['Angles & hooks', 'Scripts & shoots', 'Reels', 'UGC direction'],
      },
    },
    {
      id: 'cro',
      name: { ar: 'تحسين التحويل (CRO)', en: 'CRO' },
      detail: {
        ar: 'نفس الترافيك يطلع مبيعات أكتر: صفحة المنتج، الثقة، تجربة الموبايل، ومتوسط قيمة الأوردر.',
        en: 'More sales from the same traffic: the product page, trust, the mobile experience, and average order value.',
      },
      items: {
        ar: ['صفحة المنتج', 'تجربة الموبايل', 'رفع الـ AOV', 'عناصر الثقة'],
        en: ['Product page', 'Mobile experience', 'AOV', 'Trust elements'],
      },
    },
    {
      id: 'strategy',
      name: { ar: 'استراتيجية ونمو', en: 'Business & growth strategy' },
      detail: {
        ar: 'تشخيص المشكلة، قراءة المنافسين، حساب الربحية وbreak-even، وقرار إمتى تكبّر وإمتى تستنى.',
        en: 'Diagnosing the problem, reading competitors, working out profitability and break-even, and deciding when to scale and when to wait.',
      },
      items: {
        ar: ['تشخيص البيزنس', 'بحث سوق ومنافسين', 'ربحية وbreak-even', 'خطة توسيع'],
        en: ['Business diagnosis', 'Market & competitor research', 'Profitability & break-even', 'Scaling plan'],
      },
    },
  ] satisfies Capability[],
};
