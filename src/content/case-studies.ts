import type { Localized } from './types';
import type { SocialPlatform } from './social';

/** Who actually did a thing. Shown as a tag so credit is never ambiguous. */
export type By = 'did' | 'advised' | 'client' | 'existing' | 'result';

export const byLabel: Record<By, Localized> = {
  did: { ar: 'عملته بنفسي', en: 'I did this' },
  advised: { ar: 'استشارة مني', en: 'I advised' },
  client: { ar: 'العميل / الفريق', en: 'Client / team' },
  existing: { ar: 'كان موجود قبلي', en: 'Already there' },
  result: { ar: 'نتيجة الشغل', en: 'Result of the work' },
};

export interface CaseFact {
  value: string;
  label: Localized;
  source: Localized;
  /** Self-reported or approximate figures say so on the card. */
  soft?: boolean;
}

export interface CaseShot {
  src: string;
  width: number;
  height: number;
  /** Why this image matters — never a bare gallery caption. */
  caption: Localized;
  alt: Localized;
}

export interface CaseSection {
  id: string;
  title: Localized;
  body?: Localized<string[]>;
  points?: Array<{ text: Localized; by: By }>;
  facts?: CaseFact[];
  shots?: CaseShot[];
  note?: Localized;
}

export interface CaseStudy {
  id: string;
  brand: string;
  logo: string;
  role: Localized;
  status?: Localized;
  intro: Localized;
  links?: Array<{ label: string; href: string }>;
  /**
   * Platforms to surface as icon links beside the brand name.
   *
   * The full row of social icons was taken off these headers on 2026-09-15
   * because three platform icons under a brand name is a set of exits, not a
   * citation. This is the exception that rule needed: when the evidence in
   * the case IS an account — Fakhama's results are its TikTok — the reader's
   * next move is to go and look at it, and refusing them the link makes the
   * figures harder to believe, not tidier.
   *
   * So: name only the platform a case actually rests on, never the whole set.
   * The href still comes from `links`, so a platform named here without a
   * matching link simply renders nothing.
   */
  social?: SocialPlatform[];
  /**
   * A live site, shown as a demo frame instead of described.
   *
   * The screens are real captures of the running store, refreshed with
   * scripts/capture-store.mjs — never a mockup and never a redraw. An
   * <iframe> is not an option: the store sends `X-Frame-Options: DENY`, so a
   * browser refuses to embed it at all.
   */
  demo?: {
    href: string;
    /** Shown in the frame's address bar, so it reads as the real site. */
    domain: string;
    label: Localized;
    caption: Localized;
    open: Localized;
    desktop: { src: string; width: number; height: number; alt: Localized };
    phone: { src: string; width: number; height: number; alt: Localized };
  };
  sections: CaseSection[];
}

/**
 * Case studies for every project except Bloomy, which has its own deeper page.
 *
 * Rules, from docs/master-context.md:
 *  - Only sections the project actually has. Nothing is padded out.
 *  - Every figure carries its source and period. No invented metrics, no
 *    manufactured percentages, nothing called profit.
 *  - Credit is tagged: what Mahmoud did himself, what he advised on, what the
 *    client ran, and what already existed before he arrived.
 *
 * Arabic drafted by Claude is marked // REVIEW.
 */
export const caseStudies: CaseStudy[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'cove',
    brand: 'Cove',
    logo: '/work/cove/logo.webp',
    role: { ar: 'الستور والتشغيل والمبيعات', en: 'Store, operations and sales' },
    intro: {
      // REVIEW
      ar: 'ستور أزياء حريمي بجمهور موجود بالفعل. الشغل مكانش جلب ناس — كان تحويل الناس دي لأوردرات.',
      en: 'A womenswear store with an audience that already existed. The job was not getting people in — it was turning them into orders.',
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/cove.egg' },
      { label: 'covestore.co', href: 'https://covestore.co' },
    ],
    /*
      Replaced two flat screenshots in "The store" on 2026-09-14. Same
      treatment as Yours Shoes: the store is live, so show it running rather
      than describe it. Refresh with
        node scripts/capture-store.mjs --site=https://covestore.co           --out=public/work/cove --desktop=collections/all           --phone=products/tokyo-blouse --desktop-scroll=680 --phone-scroll=300
    */
    demo: {
      href: 'https://covestore.co',
      domain: 'covestore.co',
      label: { ar: 'الستور شغّال دلوقتي', en: 'The store, running now' },
      caption: {
        ar: 'لقطات حقيقية من الستور نفسه: صفحة المنتجات على الديسكتوب، وصفحة منتج على الموبايل — ودي اللي بيشوفها اللي جاي من إنستجرام.',
        en: 'Real screens from the store itself: the products page on desktop, and a product page on mobile — which is what a visitor arriving from Instagram actually sees.',
      },
      open: { ar: 'افتح الستور', en: 'Open the store' },
      desktop: {
        src: '/work/cove/live-desktop.webp',
        width: 2880,
        height: 1360,
        alt: {
          ar: 'صفحة المنتجات في ستور Cove على الديسكتوب، بالمنتجات وأسعارها وألوانها.',
          en: 'The Cove products page on desktop, with the products, their prices and their colours.',
        },
      },
      phone: {
        src: '/work/cove/live-product.webp',
        width: 1170,
        height: 2280,
        alt: {
          ar: 'صفحة منتج في ستور Cove على الموبايل، بالسعر والألوان والمقاس.',
          en: 'A Cove product page on mobile, with the price, the colours and the size.',
        },
      },
    },
    sections: [
      {
        id: 'overview',
        title: { ar: 'نظرة عامة', en: 'Overview' },
        body: {
          // REVIEW
          ar: [
            'Cove براند أزياء حريمي ليه جمهور على إنستجرام بيتفاعل ويسأل. الطلب كان موجود قبل ما أدخل — اللي كان ناقص قناة بيع بتشتغل ٢٤ ساعة وتستحمل الطلب ده.',
          ],
          en: [
            'Cove is a womenswear brand with an Instagram audience that already engaged and asked to buy. The demand existed before I arrived — what was missing was a sales channel that ran around the clock and could hold that demand.',
          ],
        },
        points: [
          { text: { ar: 'جمهور إنستجرام والطلب العضوي', en: 'The Instagram audience and the organic demand' }, by: 'existing' },
        ],
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت ستور Shopify من الصفر', en: 'Built the Shopify store from scratch' }, by: 'did' },
          { text: { ar: 'شغّلت العمليات والمبيعات', en: 'Ran operations and sales' }, by: 'did' },
          { text: { ar: 'اشتغلت قريب جدًا من صاحبة البراند', en: 'Worked closely with the owner' }, by: 'did' },
        ],
        note: {
          // REVIEW
          ar: 'الشغل كان أقرب لشراكة في التشغيل — بس مش co-founder، والملكية مش بتاعتي.',
          en: 'The working relationship was partner-like on operations — but not co-founder, and I have no ownership.',
        },
      },
      {
        id: 'approach',
        title: { ar: 'المنهج', en: 'The approach' },
        body: {
          // REVIEW
          ar: [
            'لما الترافيك عضوي وموجود، الرقم اللي بيفرق مش عدد الزيارات — هو نسبة اللي بيشتروا منهم. فالشغل كله اتركّز على التحويل: صفحة المنتج، وضوح السعر والشحن، وسهولة إنك تخلص الأوردر من الموبايل.',
          ],
          en: [
            'When traffic is organic and already there, the number that matters is not visits — it is the share of them that buy. So the work concentrated on conversion: the product page, clear pricing and shipping, and finishing an order easily on a phone.',
          ],
        },
      },
      {
        id: 'ecommerce',
        title: { ar: 'الستور', en: 'The store' },
        body: {
          // REVIEW
          ar: ['الستور اتبنى موبايل-أول، لأن كل الترافيك تقريبًا جاي من إنستجرام. والستور لسه شغّال — اللي فوق ده هو هو مش لقطة قديمة.'],
          en: ['The store was built mobile-first, because nearly all the traffic arrives from Instagram. And it is still running — the frame above is the live site, not an old screenshot.'],
        },
      },
      /*
        THE OPERATIONS SECTION IS GONE, not emptied. Mahmoud removed the
        stockroom photograph on 2026-09-19 and it was the whole of that
        section — no body copy, no second shot — so a heading with nothing
        under it is all that would have been left.
      */
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        facts: [
          { value: 'EGP 1,013,875', label: { ar: 'مبيعات الستور', en: 'store sales' }, source: { ar: 'Shopify · 9 مايو – 14 يوليو 2026', en: 'Shopify · May 9 – Jul 14, 2026' } },
          { value: '1,526', label: { ar: 'أوردر', en: 'orders' }, source: { ar: 'Shopify · نفس الفترة', en: 'Shopify · same period' } },
          { value: '35.7K', label: { ar: 'زيارة', en: 'sessions' }, source: { ar: 'Shopify · نفس الفترة', en: 'Shopify · same period' } },
          { value: '4.14%', label: { ar: 'معدل تحويل الستور', en: 'store conversion rate' }, source: { ar: 'Shopify · نفس الفترة', en: 'Shopify · same period' } },
        ],
        shots: [
          { src: '/work/cove/results-1.webp', width: 692, height: 395,
            caption: { ar: 'داشبورد Shopify للفترة كلها — ده مصدر الأرقام اللي فوق.', en: 'The Shopify dashboard for the whole period — the source of the figures above.' },
            alt: { ar: 'داشبورد Shopify لستور Cove.', en: "Cove’s Shopify dashboard." } },
        ],
        note: {
          // REVIEW
          ar: 'المبيعات دي عضوية من جمهور البراند — مفيش صرف إعلانات وراها، ومينفعش تتنسب لإعلانات مدفوعة. ودي مبيعات متسجلة مش أرباح.',
          en: 'These sales are organic, from the brand’s own audience — there is no ad spend behind them and they must not be attributed to paid ads. They are recorded sales, not profit.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'veloura',
    brand: 'Veloura',
    logo: '/work/veloura/logo.webp',
    status: { ar: 'شغال دلوقتي', en: 'Live' },
    role: { ar: 'الستور وإعلانات Meta وTikTok', en: 'Store, Meta and TikTok ads' },
    intro: {
      // REVIEW
      ar: 'أزياء حريمي كاچوال وهوم وير. عميل حالي من أوائل سبتمبر 2026 — الأرقام دي أول أيام الإعلانات، مش حالة ناضجة.',
      en: 'Casual womenswear and homewear. A current client since early September 2026 — these are the first days of ads, not a mature case.',
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/_veloura5_' },
      { label: 'Facebook', href: 'https://facebook.com/profile.php?id=61564967639763' },
      { label: 'veloura5.com', href: 'https://veloura5.com' },
    ],
    /*
      Replaced two flat screenshots in "The website" on 2026-09-15. The store
      is live and he rebuilt it, so show it running rather than describe it.
      The domain came off the brand's own Instagram bio, not from a guess.
      Refresh with
        node scripts/capture-store.mjs --site=https://veloura5.com           --out=public/work/veloura --desktop=collections/all           --phone=products/the-polo-chic-dress
    */
    demo: {
      href: 'https://veloura5.com',
      domain: 'veloura5.com',
      label: { ar: 'الموقع شغّال دلوقتي', en: 'The site, running now' },
      caption: {
        ar: 'لقطات حقيقية من الموقع نفسه: صفحة المنتجات على الديسكتوب، وصفحة منتج على الموبايل — ودي الصفحة اللي الإعلان بيودّي عليها.',
        en: 'Real screens from the site itself: the products page on desktop, and a product page on mobile — the page the ads land on.',
      },
      open: { ar: 'افتح الموقع', en: 'Open the site' },
      desktop: {
        src: '/work/veloura/live-desktop.webp',
        width: 2880,
        height: 1360,
        alt: {
          ar: 'صفحة المنتجات في موقع Veloura على الديسكتوب، بالمنتجات والفلاتر.',
          en: 'The Veloura products page on desktop, with the products and the filters.',
        },
      },
      phone: {
        src: '/work/veloura/live-product.webp',
        width: 1170,
        height: 2280,
        alt: {
          ar: 'صفحة منتج في موقع Veloura على الموبايل، بالسعر والألوان والمقاسات.',
          en: 'A Veloura product page on mobile, with the price, the colours and the sizes.',
        },
      },
    },
    sections: [
      {
        id: 'overview',
        title: { ar: 'نظرة عامة', en: 'Overview' },
        body: {
          // REVIEW
          ar: ['براند أزياء حريمي كان محتاج موقع يقدر يستقبل إعلانات، وإعلانات تشتغل من أول يوم.'],
          en: ['A womenswear brand that needed a site able to receive paid traffic, and ads working from day one.'],
        },
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'أعدت بناء الموقع', en: 'Rebuilt the website' }, by: 'did' },
          { text: { ar: 'ظبّطت الصفحة والإعداد الإعلاني', en: 'Set up the page and the ad infrastructure' }, by: 'did' },
          { text: { ar: 'بشغّل إعلانات Meta وTikTok', en: 'Run the Meta and TikTok ads' }, by: 'did' },
        ],
      },
      {
        id: 'ecommerce',
        title: { ar: 'الموقع', en: 'The website' },
        body: {
          ar: ['الموقع اللي فوق ده هو نفسه اللي الإعلان بيودّي عليه دلوقتي — مش لقطة قديمة. اتبنى عشان يستقبل ترافيك مدفوع: صفحة المنتج، الألوان والمقاسات، والسعر في شاشة واحدة.'],
          en: ['The site in the frame above is the one the ads land on right now — not an old screenshot. It was rebuilt to receive paid traffic: the product page, colours and sizes, and the price in one screen.'],
        },
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        /*
          THREE WINDOWS, NOT ONE, AND EVERY LINE SAYS WHICH IT IS.

          The Shopify figures moved to the Sep 7-17 capture on 2026-09-19, at
          Mahmoud's request: it is the ten-day dashboard and it supersedes the
          Sep 7-14 one, which reported 988 orders against the 1,361 here.

          THE AD SPEND DID NOT MOVE WITH IT. Meta's figure is read off a Sep
          7-14 capture and TikTok's off a Sep 9-14 one, and those are the
          captures beside them. Carrying them forward to the 17th would mean
          publishing a number with no capture under it, which is the one thing
          this site does not do. Each line is labelled with its own window, so
          nothing here claims to cover the same days as anything else.

          DO NOT add Meta's 657 purchases to TikTok's 287 conversions and set
          the total against the store's orders. Each platform counts a purchase
          its own way and one order can be counted by both. The note below says
          so; keep it.
        */
        facts: [
          { value: '1,361', label: { ar: 'أوردر', en: 'orders' }, source: { ar: 'Shopify · 7–17 سبتمبر 2026', en: 'Shopify · Sep 7–17, 2026' } },
          { value: 'EGP 1,061,525', label: { ar: 'مبيعات الستور · كل القنوات', en: 'store sales · all channels' }, source: { ar: 'Shopify · نفس الفترة', en: 'Shopify · same period' } },
          { value: 'EGP 13,629', label: { ar: 'صرف Meta', en: 'Meta spend' }, source: { ar: 'Meta Ads · 7–14 سبتمبر 2026', en: 'Meta Ads · Sep 7–14, 2026' } },
          { value: 'EGP 4,061', label: { ar: 'صرف TikTok', en: 'TikTok spend' }, source: { ar: 'TikTok Ads · 9–14 سبتمبر 2026', en: 'TikTok Ads · Sep 9–14, 2026' } },
        ],
        shots: [
          { src: '/work/veloura/results-shopify-7-17.webp', width: 1648, height: 561,
            caption: { ar: 'Shopify — 28.3 ألف زيارة · EGP 1,061,525 مبيعات · 1,361 أوردر · معدل تحويل 4.51% · 7–17 سبتمبر 2026.', en: 'Shopify — 28.3K sessions · EGP 1,061,525 in sales · 1,361 orders · 4.51% conversion rate · Sep 7–17, 2026.' },
            alt: { ar: 'داشبورد Shopify لستور Veloura من 7 لـ 17 سبتمبر 2026.', en: "Veloura’s Shopify dashboard for Sep 7–17, 2026." } },
          { src: '/work/veloura/results-meta-7-14.webp', width: 1820, height: 430,
            caption: { ar: 'Meta Ads — حملتين شغالين: 657 عملية شرا من الموقع بتكلفة EGP 20.75 للشرا، وصرف EGP 13,629.83 · 7–14 سبتمبر 2026.', en: 'Meta Ads — two live campaigns: 657 website purchases at EGP 20.75 per purchase, on EGP 13,629.83 spent · Sep 7–14, 2026.' },
            alt: { ar: 'جدول حملات Meta Ads لـ Veloura فيه 657 عملية شرا وصرف 13,629.83 جنيه.', en: 'A Meta Ads campaigns table for Veloura showing 657 purchases on EGP 13,629.83 spent.' } },
          { src: '/work/veloura/results-tiktok-9-14.webp', width: 835, height: 600,
            caption: { ar: 'TikTok Ads — صرف EGP 4,061.68 · 197,436 ظهور · CTR 2.86% · 287 تحويل · 9–14 سبتمبر 2026.', en: 'TikTok Ads — EGP 4,061.68 spent · 197,436 impressions · 2.86% CTR · 287 conversions · Sep 9–14, 2026.' },
            alt: { ar: 'داشبورد TikTok Ads لـ Veloura من 9 لـ 14 سبتمبر 2026.', en: "Veloura’s TikTok Ads dashboard for Sep 9–14, 2026." } },
        ],
        note: {
          // REVIEW
          ar: 'دي أول 10 أيام من تشغيل الإعلانات على الستور، وأرقام Shopify دي لقطة يوم 17 سبتمبر — الحساب لسه شغّال والأرقام بتتحرك كل يوم. وكل منصة بتحسب الشرا بطريقتها، فماينفعش أجمع رقم Meta على رقم TikTok وأقارنهم بأوردرات الستور: الأوردر الواحد ممكن يتحسب في الاتنين. ودي مبيعات متسجلة مش أرباح.',
          en: "These are the first ten days of ads on the store, and the Shopify figures are a capture from Sep 17 — the account is still running and the numbers move daily. Each platform counts a purchase its own way, so Meta’s number and TikTok’s cannot be added together and set against the store’s orders: one order can be counted by both. These are recorded sales, not profit.",
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'fakhama',
    brand: 'Fakhama',
    logo: '/work/fakhama/logo.webp',
    role: { ar: 'البراند والمحتوى والكرياتيف', en: 'Brand, content and creative' },
    intro: {
      // REVIEW
      ar: 'تاجر جلاليب وملابس إسلامية رجالي في العتبة، جملة وقطاعي. بيزنس كبير بحضور سوشيال ضعيف — ودي كانت المشكلة.',
      en: "A men’s Islamic wear trader in Ataba, wholesale and retail. A large business with a weak social presence — that was the problem.",
    },
    links: [
      { label: 'TikTok', href: 'https://tiktok.com/@fkhama.eg' },
      { label: 'Instagram', href: 'https://instagram.com/fkhama.eg' },
      { label: 'Facebook', href: 'https://facebook.com/fkhamaaboanas' },
    ],
    // The 1.5M views and the 43.6K followers in the results are this account.
    social: ['tiktok'],
    sections: [
      {
        id: 'challenge',
        title: { ar: 'المشكلة', en: 'The challenge' },
        body: {
          // REVIEW
          ar: [
            'البيزنس كبير وبيبيع، بس الحضور الأونلاين مكانش بيعكس ده: صور ضعيفة، صور شكلها AI، وتسمية ولوجو وbio مش متسقين بين المنصات. يعني حد بيدوّر على البراند مش هيلاقي صورة واضحة عنه.',
          ],
          en: [
            'The business is large and sells well, but its online presence did not reflect that: weak photography, obviously AI-looking images, and an inconsistent name, logo and bio across platforms. Anyone searching for the brand found no clear picture of it.',
          ],
        },
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'راجعت الحضور على كل المنصات وأعدت بناءه', en: 'Audited the presence across every platform and rebuilt it' }, by: 'did' },
          { text: { ar: 'وحّدت اتجاه البراند والاسم والـ bio', en: 'Unified the brand direction, the name and the bio' }, by: 'did' },
          { text: { ar: 'بحث منافسين', en: 'Competitor research' }, by: 'did' },
          { text: { ar: 'كتبت السكريبتات ووجّهت التصوير', en: 'Wrote the scripts and directed the shoots' }, by: 'did' },
          { text: { ar: 'صوّرت وركّبت الريلز ونشرتها', en: 'Shot, edited and published the reels' }, by: 'did' },
          { text: { ar: 'أول كامبين إعلانية على الحساب، بعد شغل المحتوى', en: 'The first ad campaign on the account, after the content work' }, by: 'did' },
        ],
      },
      {
        id: 'creative',
        title: { ar: 'الكرياتيف', en: 'The creative' },
        body: {
          // REVIEW
          ar: [
            'المنتج نفسه كان كويس؛ اللي كان ناقص إنه يتعرض بشكل يليق بيه. صوّرنا الجلاليب على موديل حقيقي في المحل، بإضاءة طبيعية وحركة، بدل الصور الثابتة أو المولّدة.',
          ],
          en: [
            'The product itself was good; what was missing was showing it in a way that did it justice. We shot the thobes on a real model in the shop, with natural light and movement, instead of flat or generated images.',
          ],
        },
        shots: [
          { src: '/work/fakhama/creative-1.webp', width: 1536, height: 326,
            caption: { ar: 'أعلى ٦ ريلز بعد إعادة بناء المحتوى: 1.5M · 1.2M · 1.2M · 889.1K · 474.3K · 401K مشاهدة.', en: 'The top six reels after the content was rebuilt: 1.5M · 1.2M · 1.2M · 889.1K · 474.3K · 401K views.' },
            alt: { ar: 'ستة ريلز من TikTok لـ Fakhama وتحت كل واحد عدد مشاهداته.', en: 'Six TikTok reels for Fakhama, each showing its view count.' } },
        ],
      },
      {
        /*
          THE ONLY PLATFORM-SOURCED EVIDENCE ON THIS PAGE, and it sits
          directly above the results so the ~120 orders are read next to it.

          It proves the messaging VOLUME, not the order count: 664 + 2,824 =
          3,488 conversations. A conversation is not an order and the caption
          says so. What it does settle is the spend — EGP 1,103.54 +
          EGP 1,528.02 — which is where the ~2,650 comes from.

          The date range in the screenshot reads "Maximum", i.e. the life of
          the ad account, not the campaign. It is not cropped out: cropping a
          screenshot to make it say something narrower than it says is how
          evidence stops being evidence.
        */
        id: 'evidence',
        title: { ar: 'الإعلانات', en: 'The ads' },
        shots: [
          { src: '/work/fakhama/ads-adsets.webp', width: 1872, height: 459,
            caption: {
              ar: 'Meta Ads Manager — الـ ad sets بتاعة الكامبين: صرف 1,103.54 + 1,528.02 جنيه، و664 + 2,824 محادثة. دي محادثات مش أوردرات؛ الأوردرات كانت بتتجمع يدوي على واتساب.',
              en: 'Meta Ads Manager — the ad sets in this campaign: EGP 1,103.54 + EGP 1,528.02 spent, and 664 + 2,824 messaging conversations. These are conversations, not orders; the orders were collected by hand over WhatsApp.',
            },
            alt: {
              ar: 'جدول ad sets في Meta Ads Manager لحساب Fkhama بنتيجة messaging conversations والمبالغ المنفقة.',
              en: 'A Meta Ads Manager ad-sets table for the Fkhama account showing messaging conversations and amounts spent.',
            } },
        ],
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        /*
          Rewritten 2026-09-15. This section used to say the ad figures were
          not publishable because the spend was not confirmed. It now is:
          Mahmoud's Ad sets screenshot — already published as
          /work/fakhama/ads-adsets.webp — shows EGP 1,103.54 + EGP 1,528.02,
          i.e. EGP 2,631.56, which is the "~2,650" he quoted. The spend tile is
          therefore sourced to Meta, not to him.

          THE ORDER COUNT IS NOT. That same dashboard reports 664 + 2,824 =
          3,488 MESSAGING CONVERSATIONS, and a conversation is not an order —
          there was no store on this account, so no platform ever counted an
          order. The ~120 and the ~1,500 average are the business's own count.
          Never merge the two: quoting 3,488 as orders would be false, and so
          would sourcing ~120 to Meta.

          Ads lead the grid because the ad test is what Mahmoud came back to
          correct; the content figures follow, which is also how the 6-tile
          grid wraps (3 + 3) on a desktop.

          2026-09-16, from Mahmoud: this was the FIRST campaign on the
          account, run after a stretch of organic work that showed which
          product was worth spending on, and the orders came over four days.

          THE SALES TILE IS ARITHMETIC, NOT A REPORTED FIGURE. He gave the
          order count and the average order value; nobody gave a sales total,
          so ~120 x ~1,500 is stated on the tile itself rather than presented
          as something a dashboard said. Two approximate numbers multiplied
          make a third, looser one — which is why it is the only tile whose
          source line is a sum.
        */
        facts: [
          { value: '~EGP 2,650', label: { ar: 'صرف إعلانات', en: 'ad spend' }, source: { ar: 'Meta Ads Manager', en: 'Meta Ads Manager' } },
          { value: '~120', label: { ar: 'أوردر', en: 'orders' }, source: { ar: 'رقم من البيزنس', en: 'Reported by the business' }, soft: true },
          { value: '~EGP 1,500', label: { ar: 'متوسط قيمة الأوردر', en: 'average order value' }, source: { ar: 'رقم من البيزنس', en: 'Reported by the business' }, soft: true },
          { value: '~EGP 180,000', label: { ar: 'مبيعات في 4 أيام', en: 'sales in 4 days' }, source: { ar: '~120 أوردر × ~1,500', en: '~120 orders x ~1,500' }, soft: true },
          { value: '1.5M', label: { ar: 'مشاهدة لأعلى ريل', en: 'views on the top reel' }, source: { ar: 'TikTok', en: 'TikTok' } },
          { value: '43.6K', label: { ar: 'متابع على TikTok', en: 'TikTok followers' }, source: { ar: 'TikTok · عام', en: 'TikTok · public' } },
        ],
        note: {
          ar: 'دي أول كامبين إعلانية على الحساب، وجت بعد فترة شغل أورجانك هي اللي ورّتنا أنهي منتج يستاهل نصرف عليه — يعني الصرف ما ابتداش من تخمين. الصرف نفسه من Meta Ads Manager، لكن عدد الأوردرات ومتوسط قيمتها أرقام من البيزنس مش من داشبورد: مكانش في ستور، والبيع كله كان ماشي على الرسايل. ورقم المبيعات ده حاصل ضرب الاتنين، مش رقم متسجّل. الداشبورد بتعدّ محادثات، والمحادثة مش أوردر، فالرقمين مش من نفس المصدر ومينفعش يتجمعوا. دي مبيعات مش أرباح.',
          en: 'This was the first ad campaign on the account, and it came after a stretch of organic work that showed which product was worth spending on — so the spend did not start from a guess. The spend itself is from Meta Ads Manager, but the order count and the average order value come from the business rather than a dashboard: there was no store, and every sale ran through messages. The sales figure is those two multiplied, not a recorded total. The dashboard counts conversations, and a conversation is not an order, so the two do not share a source and cannot be added together. These are sales, not profit.',
        },
      },
      {
        id: 'problems',
        title: { ar: 'نهاية الشغل', en: 'How it ended' },
        body: {
          // REVIEW
          ar: [
            'بعد ما المحتوى اشتغل، رشّحت إننا نبني موقع بيع — لأن المحتوى كان بيجيب طلب والبيع كله ماشي على الرسايل. العميل مكانش شايف كده، والشغل وقف عند النقطة دي.',
          ],
          en: [
            'Once the content was working, I recommended building a sales website — the content was generating demand and every sale was running through messages. The client saw it differently, and the engagement ended there.',
          ],
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'dahab-decor',
    brand: 'Dahab Decor',
    logo: '/work/dahab-decor/logo.webp',
    status: { ar: 'استشاري', en: 'Advisory' },
    role: { ar: 'البنية الإعلانية واستراتيجية الرسايل', en: 'Ad infrastructure and message strategy' },
    intro: {
      // REVIEW
      ar: 'أبواب مصفّحة تركي — منتج غالي (حوالي 14,400 جنيه للباب) ومسعّر فوق السوق عن قصد.',
      en: 'Turkish armored doors — a high-ticket product (about EGP 14,400 a door), deliberately priced above the market.',
    },
    links: [{ label: 'Facebook', href: 'https://facebook.com/dahab.decor.egy' }],
    sections: [
      {
        id: 'challenge',
        title: { ar: 'المشكلة', en: 'The challenge' },
        body: {
          // REVIEW
          ar: [
            'حد بيشتري باب بـ 14 ألف جنيه مش بيضغط «اشتري دلوقتي». بيسأل عن الخامة والضمان والتركيب والسعر، وبيقارن. فالفانل لازم يبدأ بمحادثة، مش بصفحة دفع.',
          ],
          en: [
            'Nobody buys a EGP 14,000 door by clicking "buy now". They ask about the material, the warranty, the fitting and the price, and they compare. So the funnel has to start with a conversation, not a checkout.',
          ],
        },
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت البنية الإعلانية تحت الـ Business Manager بتاعي', en: 'Built the ad infrastructure under my own Business Manager' }, by: 'did' },
          { text: { ar: 'استراتيجية إعلانات الرسايل للمنتج الغالي', en: 'The message-ads strategy for a high-ticket product' }, by: 'did' },
          { text: { ar: 'درّبت الأونرز على تشغيلها بنفسهم', en: 'Trained the owners to run it themselves' }, by: 'did' },
          { text: { ar: 'دلوقتي هما اللي بيشغّلوا الإعلانات', en: 'They run the ads themselves now' }, by: 'client' },
          { text: { ar: 'بيستشيروني لو احتاجوا حاجة', en: 'They come to me for advice when they need it' }, by: 'advised' },
        ],
      },
      {
        id: 'creative',
        title: { ar: 'الكرياتيف', en: 'The creative' },
        shots: [
          { src: '/work/dahab-decor/creative-1.webp', width: 730, height: 726,
            caption: { ar: 'محتوى المنتج — الباب نفسه بالتفاصيل والخامة والتركيب. المشتري عايز يشوف الحاجة قبل ما يسأل عن سعرها.', en: 'Product content — the door itself, its detailing, its material, its fitting. A buyer wants to see the thing before asking its price.' },
            alt: { ar: 'شبكة محتوى لأبواب Dahab Decor.', en: 'A content grid of Dahab Decor doors.' } },
        ],
      },
      {
        id: 'evidence',
        title: { ar: 'الإعلانات', en: 'The ads' },
        shots: [
          { src: '/work/dahab-decor/results-1.webp', width: 1841, height: 644,
            caption: { ar: 'Meta Ads Manager — الحملات والصرف وتكلفة النتيجة على الحساب اللي بنيته. الحساب بقى شغال عند الأونرز.', en: 'Meta Ads Manager — the campaigns, spend and cost per result on the account I built. The account is now run by the owners.' },
            alt: { ar: 'جدول حملات Meta Ads لـ Dahab Decor.', en: 'A Meta Ads campaigns table for Dahab Decor.' } },
        ],
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        /*
          Corrected 2026-09-14 from Mahmoud: spend is EGP 11,000, and the
          doors split into ~40 the campaign sold directly plus ~30 that came
          with one deal it brought in. The old single "~70-100" range hid that
          split, and the old "~EGP 7K" spend was wrong.

          2026-09-15, also from Mahmoud: those doors are about EGP 770,000 of
          SALES. That is the outcome the reader is here for, so it takes the
          fourth tile and the ad cost per door moves down into the note, which
          already worked that division out in full. Nothing was recalculated
          to make room — the note still carries both the 275 and the 157.

          The figure is the owner's, not a dashboard's, and it is the only
          number on this page that is not either ad-platform spend or a count
          Mahmoud watched happen. It stays marked approximate for that reason.
        */
        facts: [
          { value: '~40', label: { ar: 'باب اتباع من الكامبين مباشرة', en: 'doors sold by the campaign directly' }, source: { ar: 'رقم تقديري', en: 'Approximate' }, soft: true },
          { value: '+~30', label: { ar: 'باب زيادة من صفقة جات من الكامبين', en: 'more doors from one deal the campaign brought in' }, source: { ar: 'رقم تقديري', en: 'Approximate' }, soft: true },
          { value: 'EGP 11,000', label: { ar: 'صرف إعلانات', en: 'ad spend' }, source: { ar: 'صرف الكامبين', en: 'Campaign spend' } },
          { value: '~EGP 770,000', label: { ar: 'مبيعات من الكامبين', en: 'sales from the campaign' }, source: { ar: 'رقم تقديري', en: 'Approximate' }, soft: true },
        ],
        note: {
          // REVIEW
          ar: 'عدد الأبواب والمبيعات أرقام تقديرية من صاحب البيزنس، وبتغطي الـ 70 باب كلهم — الـ 40 المباشرين والـ 30 اللي جوّا الصفقة. دي مبيعات، مش أرباح. التكلفة الإعلانية للباب حوالي 275 جنيه لو حسبناها على الـ 40 المباشرين بس، وبتنزل لحوالي 157 جنيه لو حسبنا الـ 70 كلهم. في أرقام أقدم متضاربة معاها ومش بستخدمها.',
          en: 'The door counts and the sales figure are the owner\'s own, approximate, and cover all 70 doors — the 40 the campaign sold directly and the 30 inside the deal. These are sales, not profit. Ad cost per door is about EGP 275 against the 40 direct doors alone, and about EGP 157 counting all 70. There are older, conflicting figures that I do not use.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'el-haramein',
    brand: 'El Haramein',
    logo: '/work/el-haramein/logo.webp',
    status: { ar: 'استشاري', en: 'Advisory' },
    role: { ar: 'الحضور الرقمي وتجربة العميل', en: 'Digital presence and customer experience' },
    intro: {
      // REVIEW
      ar: 'شوروم إضاءة راقي في مصر الجديدة. الحالة دي عن الاستراتيجية وتجربة العميل — مش عن أرقام إعلانات.',
      en: 'A premium lighting showroom in Heliopolis. This one is about strategy and customer experience — not ad numbers.',
    },
    links: [
      { label: 'Facebook', href: 'https://facebook.com/elharameinforlighting' },
      { label: 'Instagram', href: 'https://instagram.com/harameinlight' },
    ],
    sections: [
      {
        id: 'challenge',
        title: { ar: 'المشكلة', en: 'The challenge' },
        body: {
          // REVIEW
          ar: [
            'الإضاءة الراقية منتج بيتشاف قبل ما يتشترى. العميل بيزور الشوروم، بيقارن، وبيسأل كتير. فالمشكلة مكانتش «نعمل إعلانات» — كانت إن كل نقطة بيقابل فيها العميل البراند، أونلاين وفي المحل، تدعم قرار الشرا.',
          ],
          en: [
            'Premium lighting is a product people see before they buy. The customer visits the showroom, compares, and asks a lot. So the problem was never "run ads" — it was making every point where a customer meets the brand, online and in the shop, support the decision to buy.',
          ],
        },
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت البنية الإعلانية', en: 'Built the ad infrastructure' }, by: 'did' },
          { text: { ar: 'ظبّطت السوشيال والـ bio وربط فيسبوك بإنستجرام', en: 'Set up social, the bio, and linked Facebook to Instagram' }, by: 'did' },
          { text: { ar: 'كتالوج واتساب مقسّم بالفئة والسعر', en: 'A WhatsApp catalog split by category and price' }, by: 'did' },
          { text: { ar: 'وجّهت اللي بيصوّر الريلز', en: 'Directed the person shooting the reels' }, by: 'did' },
          { text: { ar: 'مسح أكتر من 20 منافس', en: 'Mapped 20+ competitors' }, by: 'did' },
          { text: { ar: 'توصيات تجربة العميل داخل الشوروم', en: 'Customer-experience recommendations for the showroom' }, by: 'advised' },
          /*
            SAID PLAINLY ON 2026-09-19, at Mahmoud's request. This line used
            to read "notes on the ERP, shipping and inventory", which says he
            looked at three systems and not what he actually found: there was
            no stock count and the pricing was wrong. It stays tagged
            `advised` — he raised it, the business decides what to do with it.
          */
          { text: { ar: 'مكانش فيه سيستم يجرد البضاعة ولا تسعير مظبوط — ملاحظات على ده وعلى الـ ERP والشحن', en: 'No system for counting the stock, and pricing that was not right — notes on that, on the ERP and on shipping' }, by: 'advised' },
          { text: { ar: 'درّبت أصحاب البيزنس يشغّلوا الإعلانات بنفسهم', en: 'Trained the owners to run the ads themselves' }, by: 'did' },
          { text: { ar: 'دلوقتي هما اللي بيشغّلوا إعلانات الرسايل', en: 'They run the message ads themselves now' }, by: 'client' },
        ],
        /*
          Why the handover happened, in Mahmoud's words (2026-09-14). It is a
          judgement call, not a task, so it sits in the note rather than as a
          bullet with a credit tag: the point is that keeping the account would
          have been the wrong recommendation for this client.
        */
        note: {
          ar: 'درّبتهم يشغّلوا الإعلانات بنفسهم عن قصد: البيزنس ده مش محتاج ميديا باير. المنتج بيتشاف قبل ما يتشرى، فاللي بيفرق معاه هو جودة المحتوى اللي بينزل وتجربة العميل جوّه المحل — ودول محدش يقدر يعملهم بدالهم. الإعلان نفسه يتسلّم بعد تدريب، فمفيش سبب يخليهم يدفعوا فيه كل شهر.',
          en: 'Training them to run the ads themselves was deliberate: this business does not need a media buyer. The product is seen before it is bought, so what actually moves it is the quality of the content they publish and the customer experience inside the shop — and nobody can do those two on their behalf. The ads can be handed over after training, so there was no reason for them to keep paying for that every month.',
        },
      },
      {
        id: 'creative',
        title: { ar: 'المحتوى', en: 'The content' },
        shots: [
          { src: '/work/el-haramein/creative-1.webp', width: 1415, height: 442,
            caption: { ar: 'ريلز من الشوروم: 2,523 · 6,471 · 8,034 · 23.6K · 54.9K مشاهدة. المنتج بيتصوّر في مكانه الطبيعي مش على خلفية بيضا.', en: 'Reels from the showroom: 2,523 · 6,471 · 8,034 · 23.6K · 54.9K views. The product shot where it actually lives, not on a white background.' },
            alt: { ar: 'خمس ريلز من شوروم الإضاءة وتحت كل واحد عدد مشاهداته.', en: 'Five reels from the lighting showroom, each showing its view count.' } },
        ],
      },
      {
        id: 'problems',
        title: { ar: 'تجربة العميل', en: 'Customer experience' },
        body: {
          // REVIEW
          ar: [
            'عملت benchmark لتجربة الشوروم نفسها وقارنتها بمنافسين: التكييف، أماكن القعدة، استقبال الموظفين، تقديم مياه أو شوكولاتة، مظهر الموظف ومعرفته بالمنتج، الخصوصية أثناء الاختيار، طريقة عرض المنتج، وخطوات البيع.',
            'المنتج الغالي محتاج تجربة تسنده. لو العميل جه من إعلان ممتاز ولقى استقبال ضعيف، الإعلان اتحرق.',
          ],
          en: [
            'I benchmarked the showroom experience itself against competitors: air conditioning, seating, how staff greet you, offering water or chocolate, staff appearance and product knowledge, privacy while choosing, how the product is displayed, and the steps of the sale.',
            'A high-ticket product needs an experience that carries it. If a customer arrives from an excellent ad and meets a poor welcome, the ad was wasted.',
          ],
        },
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        note: {
          // REVIEW
          ar: 'مفيش أرقام منشورة للحالة دي. الشغل كان استراتيجية وبنية وتجربة عميل، ومفيش عندي داشبورد بينسب نتيجة مبيعات للشغل ده — فمش هخترع رقم.',
          en: 'No figures are published for this one. The work was strategy, infrastructure and customer experience, and I have no dashboard attributing a sales result to it — so I am not inventing a number.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'brilliant',
    brand: 'Brilliant Book Store',
    logo: '/work/brilliant/logo.webp',
    status: { ar: 'الموقع تحت التنفيذ', en: 'Website in progress' },
    role: { ar: 'إعلانات الرسايل والموقع', en: 'Message ads and the website' },
    intro: {
      // REVIEW
      ar: 'كتب أطفال ومدارس للمدارس الدولية، بتستورد من بره — منها الهند. بيزنس كبير بمتابعين قليلين، يعني المبيعات مش جاية من السوشيال.',
      en: "Children’s and school books for international schools, imported from abroad including India. A large business with a small following — meaning the sales do not come from social.",
    },
    links: [
      { label: 'Facebook', href: 'https://facebook.com/brilliant200' },
      { label: 'Instagram', href: 'https://instagram.com/brilliant.book' },
    ],
    sections: [
      {
        id: 'overview',
        title: { ar: 'نظرة عامة', en: 'Overview' },
        body: {
          // REVIEW
          ar: [
            'البيزنس ده بيبيع كتير من غير حضور أونلاين قوي — وده في حد ذاته معلومة: يعني في طلب حقيقي مش محتاج إقناع، محتاج بس قناة أسهل.',
          ],
          en: [
            'This business sells a lot without a strong online presence — which is itself information: the demand is real and does not need persuading, it needs an easier channel.',
          ],
        },
      },
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'شغّلت إعلانات رسايل على Meta', en: 'Ran Meta message ads' }, by: 'did' },
          { text: { ar: 'ببني دلوقتي موقع مركّز على التحويل', en: 'Currently building a conversion-focused website' }, by: 'did' },
        ],
      },
      {
        id: 'creative',
        title: { ar: 'الكرياتيف', en: 'The creative' },
        shots: [
          { src: '/work/brilliant/creative-1.webp', width: 1254, height: 1254,
            caption: { ar: 'كرياتيف منتج — الباكدج والمحتوى والفايدة في صورة واحدة، لأن الأم بتقرر بسرعة.', en: 'A product creative — the pack, what is inside and why it matters in one image, because a parent decides fast.' },
            alt: { ar: 'كرياتيف إعلاني لباكدج كتب تلوين.', en: 'An ad creative for a colouring book pack.' } },
        ],
      },
      /*
        A "The website" section with two captures lived here until
        2026-09-14. Removed at Mahmoud's request: the shots were taken inside
        the Shopify theme editor, so they carried the editor's own chrome
        ("Image slide (parent)", the add-section button) instead of showing
        the site. The site is unfinished, so there is nothing honest to put in
        its place yet — the role bullet and the results note still say it is
        being built. public/work/brilliant/website-1 and -3 stay on disk.
      */
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        note: {
          // REVIEW
          ar: 'إعلانات الرسايل جابت مبيعات كويسة، بس مفيش عندي لقطة بتوثّق رقم وفترة — فمش هنشر رقم. الموقع لسه تحت التنفيذ.',
          en: 'The message ads produced good sales, but I have no screenshot documenting a figure and a period — so no number is published. The website is still in progress.',
        },
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'yours-shoes',
    brand: 'Yours Shoes',
    logo: '/work/yours-shoes/imgi-57-593287240-1126488553026048-5494534627175785149-n.webp',
    role: { ar: 'ستور Shopify', en: 'The Shopify store' },
    intro: {
      // REVIEW
      ar: 'أحذية حريمي بجمهور على إنستجرام. الشغل هنا الستور نفسه.',
      en: 'Women’s footwear with an Instagram audience. The work here is the store itself.',
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/yoursshoes.eg' },
      { label: 'Store', href: 'https://yoursshoes-eg.myshopify.com' },
    ],
    demo: {
      href: 'https://yoursshoes-eg.myshopify.com',
      domain: 'yoursshoes.eg',
      label: { ar: 'الستور شغّال دلوقتي', en: 'The store, running now' },
      caption: {
        ar: 'لقطات حقيقية من الستور نفسه: صفحة المجموعة على الديسكتوب، وصفحة المنتج على الموبايل.',
        en: 'Real screens from the store itself: the collection page on desktop, the product page on mobile.',
      },
      open: { ar: 'افتح الستور', en: 'Open the store' },
      desktop: {
        src: '/work/yours-shoes/live-desktop.webp',
        width: 2880,
        height: 1360,
        alt: {
          ar: 'صفحة المجموعة في ستور Yours Shoes على الديسكتوب، بالمنتجات وأسعارها.',
          en: 'The Yours Shoes collection page on desktop, with the products and their prices.',
        },
      },
      phone: {
        src: '/work/yours-shoes/live-product.webp',
        width: 1170,
        height: 2280,
        alt: {
          ar: 'صفحة منتج في ستور Yours Shoes على الموبايل، بالسعر واختيار المقاس وعروض الباندل.',
          en: 'A Yours Shoes product page on mobile, with the price, the size picker and the bundle offers.',
        },
      },
    },
    sections: [
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت ستور Shopify مركّز على التحويل', en: 'Built the conversion-focused Shopify store' }, by: 'did' },
        ],
      },
      {
        id: 'ecommerce',
        title: { ar: 'الستور', en: 'The store' },
        body: {
          // REVIEW
          ar: [
            'الجزمة منتج مقاسات — يعني أكبر سبب للتردد هو «هيجيلي ولا لأ». فجدول المقاسات والتفاصيل والصور من زوايا مختلفة مش تزويق، دي اللي بتقلل التردد والمرتجع.',
          ],
          en: [
            'Footwear is a sizing product — the biggest hesitation is "will it fit". So a size chart, the details and shots from several angles are not decoration; they are what reduces hesitation and returns.',
          ],
        },
        shots: [
          { src: '/work/yours-shoes/creative-1.webp', width: 1254, height: 1254,
            caption: { ar: 'كرياتيف منتج بجدول مقاسات — نفس المنطق: جاوب على السؤال قبل ما العميل يسأله.', en: 'A product creative with a size chart — same logic: answer the question before the customer asks it.' },
            alt: { ar: 'كرياتيف لمنتج حذاء مع جدول مقاسات.', en: 'A shoe product creative with a size chart.' } },
        ],
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        note: {
          // REVIEW
          ar: 'مفيش أرقام قبل وبعد منشورة للستور ده، فمفيش نسبة تحسّن هقولها. الشغل اللي اتعمل هو الستور نفسه.',
          en: 'There is no published before/after data for this store, so I claim no improvement percentage. The work delivered is the store itself.',
        },
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'kayan',
    brand: 'KAYAN',
    logo: '/work/kayan/logo.webp',
    role: { ar: 'الستور', en: 'The store' },
    intro: {
      ar: 'براند ستريت وير أطفال. الشغل هنا الستور نفسه — مبنيتش الإعلانات ولا التشغيل.',
      en: 'A kids streetwear brand. The work here is the store itself — not the ads and not the operations.',
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/kayaan_eg' },
      { label: 'kayaan.com.co', href: 'https://kayaan.com.co' },
    ],
    /*
      Refresh with
        node scripts/capture-store.mjs --site=https://kayaan.com.co           --out=public/work/kayan --desktop=collections/all           --phone=products/zaahr-off-white-tee --phone-slide=2
      Product and slide chosen by Mahmoud (2026-09-15): the Zaahr tee, resting
      on the second gallery image. The script measures and skips the stray
      line of markup the live theme prints at the top of every page — a real
      bug on the store, reported to Mahmoud; nothing to pass for it.
    */
    demo: {
      href: 'https://kayaan.com.co',
      domain: 'kayaan.com.co',
      label: { ar: 'الستور شغّال دلوقتي', en: 'The store, running now' },
      caption: {
        ar: 'لقطات حقيقية من الستور نفسه: صفحة المنتجات على الديسكتوب، وصفحة منتج على الموبايل.',
        en: 'Real screens from the store itself: the products page on desktop, and a product page on mobile.',
      },
      open: { ar: 'افتح الستور', en: 'Open the store' },
      desktop: {
        src: '/work/kayan/live-desktop.webp',
        width: 2880,
        height: 1360,
        alt: {
          ar: 'صفحة المنتجات في ستور KAYAN على الديسكتوب، بالمنتجات وأسعارها والفلاتر.',
          en: 'The KAYAN products page on desktop, with the products, their prices and the filters.',
        },
      },
      phone: {
        src: '/work/kayan/live-product.webp',
        width: 1170,
        height: 2280,
        alt: {
          ar: 'صفحة منتج في ستور KAYAN على الموبايل: تيشيرت Zaahr الأوف وايت، صور المنتج المصغّرة تحتها، وشريط الشرا فيه المقاس والسعر.',
          en: "A KAYAN product page on mobile: the Zaahr off-white tee, its thumbnail strip beneath it, and the buy bar carrying the size and price.",
        },
      },
    },
    sections: [
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت ستور Shopify', en: 'Built the Shopify store' }, by: 'did' },
        ],
      },
      {
        id: 'ecommerce',
        title: { ar: 'الستور', en: 'The store' },
        body: {
          ar: ['التصفّح بالمجموعات والفلاتر، وصفحة منتج فيها الصور والسعر والمقاسات — والستور شغّال، اللي فوق ده هو هو مش لقطة قديمة.'],
          en: ['Browsing by collection and filter, and a product page carrying the images, the price and the sizes — and the store is live; the frame above is the site itself, not an old screenshot.'],
        },
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        note: {
          ar: 'مفيش أرقام منشورة للستور ده، ومشتغلتش على الإعلانات فيه — فمفيش نتيجة مبيعات أقدر أنسبها لنفسي. الشغل اللي اتعمل هو الستور نفسه.',
          en: 'No figures are published for this store, and I did not run its ads — so there is no sales result I can attribute to myself. The work delivered is the store itself.',
        },
      },
    ],
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'asloaraby',
    brand: 'أصله عربي',
    logo: '/work/asloaraby/logo.webp',
    role: { ar: 'الستور', en: 'The store' },
    intro: {
      ar: 'براند ملابس مستوحى من الإرث العربي. الشغل هنا الستور نفسه — مبنيتش الإعلانات ولا التشغيل.',
      en: 'A clothing brand drawing on Arab heritage. The work here is the store itself — not the ads and not the operations.',
    },
    links: [
      { label: 'Instagram', href: 'https://instagram.com/asloaraby.egy' },
      { label: 'asloaraby.myshopify.com', href: 'https://asloaraby.myshopify.com' },
    ],
    /*
      Refresh with
        node scripts/capture-store.mjs --site=https://asloaraby.myshopify.com           --out=public/work/asloaraby --desktop=collections/all           --phone=products/%D8%AA%D9%8A%D8%B4%D9%8A%D8%B1%D8%AA-%D8%A3%D8%B5%D9%84%D9%87-%D8%B9%D8%B1%D8%A8%D9%8A
    */
    demo: {
      href: 'https://asloaraby.myshopify.com',
      domain: 'asloaraby.myshopify.com',
      label: { ar: 'الستور شغّال دلوقتي', en: 'The store, running now' },
      caption: {
        ar: 'لقطات حقيقية من الستور نفسه: صفحة المنتجات على الديسكتوب، وصفحة منتج على الموبايل.',
        en: 'Real screens from the store itself: the products page on desktop, and a product page on mobile.',
      },
      open: { ar: 'افتح الستور', en: 'Open the store' },
      desktop: {
        src: '/work/asloaraby/live-desktop.webp',
        width: 2880,
        height: 1360,
        alt: {
          ar: 'صفحة المنتجات في ستور أصله عربي على الديسكتوب، بالمنتجات والفلاتر.',
          en: 'The Asloaraby products page on desktop, with the products and the filters.',
        },
      },
      phone: {
        src: '/work/asloaraby/live-product.webp',
        width: 1170,
        height: 2280,
        alt: {
          ar: 'صفحة منتج في ستور أصله عربي على الموبايل، بالصورة والسعر والمقاسات.',
          en: 'An Asloaraby product page on mobile, with the image, the price and the sizes.',
        },
      },
    },
    sections: [
      {
        id: 'role',
        title: { ar: 'دوري', en: 'My role' },
        points: [
          { text: { ar: 'بنيت ستور Shopify', en: 'Built the Shopify store' }, by: 'did' },
        ],
      },
      {
        id: 'ecommerce',
        title: { ar: 'الستور', en: 'The store' },
        body: {
          ar: ['التصفّح بالمجموعات والفلاتر، وصفحة منتج فيها الصور والسعر والمقاسات — والستور شغّال، اللي فوق ده هو هو مش لقطة قديمة.'],
          en: ['Browsing by collection and filter, and a product page carrying the images, the price and the sizes — and the store is live; the frame above is the site itself, not an old screenshot.'],
        },
      },
      {
        id: 'results',
        title: { ar: 'النتايج', en: 'Results' },
        note: {
          ar: 'مفيش أرقام منشورة للستور ده، ومشتغلتش على الإعلانات فيه — فمفيش نتيجة مبيعات أقدر أنسبها لنفسي. الشغل اللي اتعمل هو الستور نفسه.',
          en: 'No figures are published for this store, and I did not run its ads — so there is no sales result I can attribute to myself. The work delivered is the store itself.',
        },
      },
    ],
  },
];

export const caseStudyById = (id: string) => caseStudies.find((c) => c.id === id);
