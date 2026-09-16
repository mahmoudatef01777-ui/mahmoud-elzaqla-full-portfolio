import type { Project } from './types';

/**
 * Single source of truth for the Work section.
 * Facts mirror docs/context.md — never add a number that is not there.
 * `assets` stay empty until `npm run assets` has produced the optimized
 * copies under public/work/<id>/.
 *
 * Arabic strings drafted by Claude are marked // REVIEW for Mahmoud to approve.
 */
export const projects: Project[] = [
  {
    id: 'bloomy',
    name: 'Bloomy',
    tier: 'A',
    role: {
      // REVIEW
      ar: 'براندي أنا. المنتج، الخامة، الإنتاج، ستور Shopify، إعلانات Meta، الكرياتيف، الموديريشن، والتشغيل على ERP.',
      en: 'My own brand. Product, fabric sourcing, production, the Shopify store, Meta ads, creative direction, moderation and ERP operations.',
    },
    summary: {
      // REVIEW
      ar: 'براند ملابس حريمي بدأ أوائل 2026. اشتغلت فيه من أول اختيار القماش لحد آخر أوردر بيتسلّم.',
      en: 'A womenswear brand I launched in early 2026 — I ran it from fabric sourcing to the last delivered order.',
    },
    tags: {
      ar: ['براند خاص', 'Shopify', 'Meta Ads', 'ERP', 'تشغيل'],
      en: ['Own brand', 'Shopify', 'Meta Ads', 'ERP', 'Operations'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/bloom.egg' },
      { label: 'Facebook', href: 'https://facebook.com/BloomyWear' },
    ],
    results: [
      {
        value: 'EGP 2.94M',
        label: { ar: 'مبيعات متسجّلة', en: 'recorded sales' },
        period: { ar: 'فبراير – يونيو 2026', en: 'Feb – Jun 2026' },
        source: 'Odoo ERP',
        verified: true,
      },
      {
        value: 'EGP 1.02M',
        label: { ar: 'مبيعات الستور · 1,229 أوردر', en: 'store sales · 1,229 orders' },
        period: { ar: '28 أبريل – 14 يونيو 2026 (47 يوم)', en: 'Apr 28 – Jun 14, 2026 (47 days)' },
        source: 'Shopify',
        verified: true,
      },
      {
        value: '5.44%',
        label: { ar: 'معدل التحويل', en: 'conversion rate' },
        period: { ar: '28 أبريل – 14 يونيو 2026', en: 'Apr 28 – Jun 14, 2026' },
        source: 'Shopify',
        verified: true,
      },
      {
        value: 'EGP 33',
        label: { ar: 'تكلفة الشراء على Meta', en: 'Meta cost per purchase' },
        period: { ar: 'مايو 2026', en: 'May 2026' },
        source: 'Meta Ads Manager',
        verified: true,
        note: {
          // REVIEW
          ar: 'الصرف على Meta لوحده ≈ 139 ألف جنيه (فبراير–يونيو)، وإجمالي صرف الإعلانات على كل الفترة 145 ألف — أقل من 5% من المبيعات.',
          en: 'Meta alone was about EGP 139K (Feb–Jun); total ad spend across the whole run was EGP 145K — under 5% of sales.',
        },
      },
    ],
    cover: {
      src: '/work/bloomy/ops-2.webp',
      width: 1920,
      height: 1080,
      fit: 'cover',
      alt: {
        ar: 'ستوك Bloomy متغلّف ومرصوص في المخزن.',
        en: 'Bloomy stock bagged and stacked in the storeroom.',
      },
    },
    logo: '/work/bloomy/logo.webp',
    href: '/work/bloomy',
    cardResult: {
      ar: 'EGP 3.17M مبيعات متسجّلة · Odoo ERP',
      en: 'EGP 3.17M in recorded sales · Odoo ERP',
    },
    assets: [],
  },
  {
    id: 'cove',
    name: 'Cove',
    tier: 'A',
    role: {
      // REVIEW
      ar: 'بنيت ستور Shopify وشغّلت العمليات والمبيعات، بالتعاون القريب مع صاحبة البراند.',
      en: 'Built the Shopify store, ran operations and sales, working closely with the owner.',
    },
    summary: {
      // REVIEW
      ar: 'ستور أزياء حريمي بجمهور موجود بالفعل. الشغل كان إن الجمهور ده يتحوّل لأوردرات.',
      en: 'A womenswear store with an audience that already existed. The job was turning that audience into orders.',
    },
    tags: {
      ar: ['Shopify', 'CRO', 'تشغيل'],
      en: ['Shopify', 'CRO', 'Operations'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/cove.egg' },
      { label: 'covestore.co', href: 'https://covestore.co' },
    ],
    results: [
      {
        value: 'EGP 1.01M',
        label: { ar: 'مبيعات الستور · 1,526 أوردر', en: 'store sales · 1,526 orders' },
        period: { ar: '9 مايو – 14 يوليو 2026', en: 'May 9 – Jul 14, 2026' },
        source: 'Shopify',
        verified: true,
        note: {
          // REVIEW
          ar: 'طلب عضوي من جمهور موجود — مش إعلانات مدفوعة.',
          en: 'Organic demand from an existing audience — not paid ads.',
        },
      },
      {
        value: '4.14%',
        label: { ar: 'معدل التحويل · 35.7 ألف زيارة', en: 'conversion rate · 35.7K sessions' },
        period: { ar: '9 مايو – 14 يوليو 2026', en: 'May 9 – Jul 14, 2026' },
        source: 'Shopify',
        verified: true,
      },
    ],
    cover: {
      src: '/work/cove/ops-1.webp',
      width: 1500,
      height: 2000,
      fit: 'cover',
      alt: {
        ar: 'أرفف مخزن Cove مرصوصة بالمنتجات.',
        en: "Cove’s stockroom shelves, fully stocked.",
      },
    },
    logo: '/work/cove/logo.webp',
    cardResult: {
      ar: 'EGP 1.01M · 1,526 أوردر في شهرين — طلب عضوي · Shopify',
      en: 'EGP 1.01M and 1,526 orders in two months — organic · Shopify',
    },
    assets: [],
  },
  {
    id: 'veloura',
    name: 'Veloura',
    tier: 'A',
    status: { ar: 'شغّال — نتايج أولية', en: 'Live — early results' },
    role: {
      // REVIEW
      ar: 'أعدت بناء الموقع، ظبّطت الصفحة، وبشغّل إعلانات Meta وTikTok.',
      en: 'Rebuilt the website, set up the page, and run Meta and TikTok ads.',
    },
    summary: {
      // REVIEW
      ar: 'أزياء حريمي كاچوال وهوم وير. عميل حالي من أوائل سبتمبر 2026 — الأرقام دي أول أيام الإعلانات.',
      en: 'Casual womenswear and homewear. A current client since early Sep 2026 — these are the first days of ads.',
    },
    tags: {
      ar: ['Shopify', 'Meta Ads', 'TikTok Ads'],
      en: ['Shopify', 'Meta Ads', 'TikTok Ads'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/_veloura5_' },
      { label: 'Facebook', href: 'https://facebook.com/profile.php?id=61564967639763' },
    ],
    results: [
      {
        value: '563',
        label: { ar: 'أوردر · أول 6 أيام إعلانات', en: 'orders · first 6 days of ads' },
        period: { ar: '7–12 سبتمبر 2026', en: 'Sep 7–12, 2026' },
        source: 'Shopify',
        verified: true,
      },
      {
        value: 'EGP 465,925',
        label: { ar: 'مبيعات الستور', en: 'store sales' },
        period: { ar: '7–12 سبتمبر 2026', en: 'Sep 7–12, 2026' },
        source: 'Shopify',
        verified: true,
      },
      {
        value: 'EGP 10.9K',
        label: { ar: 'صرف إعلانات', en: 'ad spend' },
        period: { ar: '7–12 سبتمبر 2026', en: 'Sep 7–12, 2026' },
        source: 'Meta Ads Manager',
        verified: true,
        note: {
          // REVIEW
          ar: 'Meta 8,810 جنيه + TikTok 2,139 جنيه.',
          en: 'Meta EGP 8,810 + TikTok EGP 2,139.',
        },
      },
    ],
    cover: {
      src: '/work/veloura/website-3.webp',
      width: 293,
      height: 521,
      fit: 'contain',
      alt: {
        ar: 'شاشة من ستور Veloura على الموبايل.',
        en: "A screen from Veloura’s store on mobile.",
      },
    },
    logo: '/work/veloura/logo.webp',
    cardResult: {
      ar: '563 أوردر في أول 6 أيام إعلانات · 7–12 سبتمبر 2026',
      en: '563 orders in the first 6 days of ads · Sep 7–12, 2026',
    },
    assets: [],
  },
  {
    id: 'brilliant',
    name: 'Brilliant Book Store',
    tier: 'B',
    status: { ar: 'الموقع تحت التنفيذ', en: 'Website in progress' },
    role: {
      // REVIEW
      ar: 'إعلانات رسايل على Meta، ودلوقتي ببني موقع مركّز على التحويل.',
      en: 'Meta message ads, and currently building a conversion-focused website.',
    },
    summary: {
      // REVIEW
      ar: 'كتب أطفال ومدارس للمدارس الدولية، بتستورد من بره. بيزنس كبير بمتابعين قليلين — المبيعات مش جاية من السوشيال.',
      en: 'Children and school books for international schools, imported from abroad. A large business with a small following — the sales do not come from social.',
    },
    tags: {
      ar: ['Meta Ads', 'إعلانات رسايل', 'موقع'],
      en: ['Meta Ads', 'Message ads', 'Website'],
    },
    links: [
      { label: 'Facebook', href: 'https://facebook.com/brilliant200' },
      { label: 'Instagram', href: 'https://instagram.com/brilliant.book' },
    ],
    results: [],
    assets: [],
  },
  {
    id: 'el-haramein',
    name: 'El Haramein For Lighting',
    tier: 'B',
    status: { ar: 'استشاري', en: 'Advisory' },
    role: {
      // REVIEW
      ar: 'بنيت البنية الإعلانية والسوشيال، وكتالوج واتساب مقسّم بالفئة والسعر، وتوجيه الريلز، ومسح 20+ منافس. دلوقتي أصحاب المحل بيشغّلوا إعلاناتهم بنفسهم، وبيستشيروني لو احتاجوا حاجة.',
      en: 'Built the ad infrastructure and social setup, a WhatsApp catalog split by category and price, reels direction, and a 20+ competitor map. The owners run their own ads now, and come to me for advice when they need it.',
    },
    summary: {
      // REVIEW
      ar: 'شوروم إضاءة راقي في مصر الجديدة. الحالة دي عن الاستراتيجية وتجربة العميل، مش عن الأرقام.',
      en: 'A premium lighting showroom in Heliopolis. This one is about strategy and customer experience, not numbers.',
    },
    tags: {
      ar: ['استراتيجية', 'تجربة العميل', 'كتالوج واتساب'],
      en: ['Strategy', 'Customer experience', 'WhatsApp catalog'],
    },
    links: [
      { label: 'Facebook', href: 'https://facebook.com/elharameinforlighting' },
      { label: 'Instagram', href: 'https://instagram.com/harameinlight' },
    ],
    results: [],
    assets: [],
  },
  {
    id: 'dahab-decor',
    name: 'Dahab Decor',
    tier: 'B',
    status: { ar: 'استشاري', en: 'Advisory' },
    role: {
      // REVIEW
      ar: 'بنيت البنية الإعلانية واستراتيجية إعلانات الرسايل، ودرّبت أصحاب البيزنس اللي بيشغّلوها دلوقتي.',
      en: 'Built the ad infrastructure and the message-ads strategy, then trained the owners who run it now.',
    },
    summary: {
      // REVIEW
      ar: 'أبواب مصفّحة تركي، منتج غالي (حوالي 14,400 جنيه للباب) ومسعّر فوق السوق. فانل بيبدأ برسالة مش بشراء مباشر.',
      en: 'Turkish armored doors — a high-ticket product (about EGP 14,400 a door) priced above market. A funnel that starts with a message, not a checkout.',
    },
    tags: {
      ar: ['منتج غالي', 'إعلانات رسايل', 'تسليم للعميل'],
      en: ['High-ticket', 'Message ads', 'Handover'],
    },
    links: [{ label: 'Facebook', href: 'https://facebook.com/dahab.decor.egy' }],
    results: [],
    assets: [],
  },
  {
    id: 'fakhama',
    name: 'Fakhama',
    tier: 'B',
    role: {
      // REVIEW
      ar: 'وحّدت البراند على كل المنصات، وكتبت السكريبتات، ووجّهت التصوير، وصوّرت وركّبت الريلز والنشر.',
      en: 'Unified the brand across platforms, wrote the scripts, directed the shoots, shot and edited the reels, and published.',
    },
    summary: {
      // REVIEW
      ar: 'تاجر جلاليب وملابس إسلامية رجالي في العتبة، جملة وقطاعي. الحالة دي عن المحتوى مش عن شراء الإعلانات.',
      en: 'A mens Islamic wear trader in Ataba, wholesale and retail. This is a content case, not a media buying one.',
    },
    tags: {
      ar: ['محتوى', 'ريلز', 'هوية موحّدة'],
      en: ['Content', 'Reels', 'Brand consistency'],
    },
    links: [
      { label: 'TikTok', href: 'https://tiktok.com/@fkhama.eg' },
      { label: 'Instagram', href: 'https://instagram.com/fkhama.eg' },
      { label: 'Facebook', href: 'https://facebook.com/fkhamaaboanas' },
    ],
    results: [
      {
        value: '1.5M',
        label: { ar: 'مشاهدة لأعلى فيديو', en: 'views on the top video' },
        period: { ar: '', en: '' },
        source: 'TikTok',
        verified: true,
      },
      {
        value: '43.6K',
        label: { ar: 'متابع على TikTok', en: 'TikTok followers' },
        period: { ar: '', en: '' },
        source: 'TikTok',
        verified: true,
      },
    ],
    cover: {
      src: '/work/fakhama/creative-1.webp',
      width: 1536,
      height: 326,
      fit: 'contain',
      alt: {
        ar: 'كرياتيف من شغل Fakhama.',
        en: 'A creative produced for Fakhama.',
      },
    },
    logo: '/work/fakhama/logo.webp',
    cardResult: {
      ar: '1.5M مشاهدة لأعلى فيديو · 43.6K متابع على TikTok',
      en: '1.5M views on the top video · 43.6K TikTok followers',
    },
    assets: [],
  },
  {
    id: 'yours-shoes',
    name: 'Yours Shoes',
    tier: 'B',
    role: {
      // REVIEW
      ar: 'بنيت ستور Shopify مركّز على التحويل.',
      en: 'Built the conversion-focused Shopify store.',
    },
    summary: {
      // REVIEW
      ar: 'أحذية حريمي. الشغل هنا الستور نفسه — مفيش أرقام قبل وبعد منشورة.',
      en: 'Womens footwear. The work here is the store itself — there is no before/after data to publish.',
    },
    tags: {
      ar: ['Shopify', 'CRO'],
      en: ['Shopify', 'CRO'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/yoursshoes.eg' },
      { label: 'Store', href: 'https://yoursshoes-eg.myshopify.com' },
    ],
    results: [],
    assets: [],
  },
  {
    id: 'kayan',
    name: 'KAYAN',
    tier: 'B',
    role: {
      ar: 'بنيت ستور Shopify.',
      en: 'Built the Shopify store.',
    },
    summary: {
      ar: 'ستريت وير أطفال. الشغل هنا الستور نفسه — مشتغلتش على الإعلانات ولا التشغيل، ومفيش أرقام منشورة.',
      en: 'Kids streetwear. The work here is the store itself — not the ads, not the operations, and no figures are published.',
    },
    tags: {
      ar: ['Shopify'],
      en: ['Shopify'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/kayaan_eg' },
      { label: 'Store', href: 'https://kayaan.com.co' },
    ],
    results: [],
    assets: [],
  },
  {
    id: 'asloaraby',
    name: 'أصله عربي',
    tier: 'B',
    role: {
      ar: 'بنيت ستور Shopify.',
      en: 'Built the Shopify store.',
    },
    summary: {
      ar: 'ملابس مستوحاة من الإرث العربي. الشغل هنا الستور نفسه — مشتغلتش على الإعلانات ولا التشغيل، ومفيش أرقام منشورة.',
      en: 'Clothing drawing on Arab heritage. The work here is the store itself — not the ads, not the operations, and no figures are published.',
    },
    tags: {
      ar: ['Shopify'],
      en: ['Shopify'],
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/asloaraby.egy' },
      { label: 'Store', href: 'https://asloaraby.myshopify.com' },
    ],
    results: [],
    assets: [],
  },
];

export const tierA = projects.filter((p) => p.tier === 'A');
export const tierB = projects.filter((p) => p.tier === 'B');
