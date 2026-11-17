// Promotions & news. Content taken from https://akrobat.com.sg/promotions-news/
// Newest first. The home page shows the latest 3; /promotions-news shows all.
//
// Pictures: drop a file in /public/news/ and set `image` (e.g. '/news/oct-2023.jpg').
// Until then every card shows a placeholder.

export type NewsCategory = 'Promotions' | 'Blogs' | 'Trade Shows';

export type NewsItem = {
  title: string;
  date: string; // e.g. 'Oct 2023'
  summary: string;
  href: string;
  category: NewsCategory;
  /** Short headline figure for promotions, shown big on the card. */
  offer?: string;
  /** Path under /public, e.g. '/news/oct-2023.jpg'. Optional for now. */
  image?: string;
};

export const newsCategories: ('All' | NewsCategory)[] = [
  'All',
  'Promotions',
  'Blogs',
  'Trade Shows',
];

const site = 'https://akrobat.com.sg';

export const news: NewsItem[] = [
  {
    title: 'Meet our newest product member: the Akrobat brand',
    date: 'Oct 2023',
    category: 'Promotions',
    offer: 'Bundle deal',
    summary:
      'This October, Akrobat offers a bundle for our new product member: AK SEH1 (1 point) with AK SF-FBRL-3401 (lanyard).',
    href: `${site}/meet-newproduct-member/`,
  },
  {
    title: '2 m self-retracting lifeline now on sale',
    date: 'Apr 2023',
    category: 'Promotions',
    offer: 'Up to 20% off',
    summary:
      'This April, Akrobat offers up to 20% off the 2 m self-retracting lifeline. No minimum quantity.',
    href: `${site}/promo-2mtr-srl-now-on-sale/`,
  },
  {
    title: 'Contractor Safety Dialogue: SMRT 2023',
    date: 'Mar 2023',
    category: 'Trade Shows',
    summary:
      'We were honoured to be invited as a speaker at the SMRT Contractor Safety Dialogue 2023, sharing our knowledge on full protection systems.',
    href: `${site}/contractor-day-smrt-2023/`,
  },
  {
    title: 'Kratos brand items now on sale',
    date: 'Jan 2023',
    category: 'Promotions',
    offer: 'Up to 15% off',
    summary:
      'This January, a major discount on all Kratos brand items (self-retracting lifelines and lanyards). No minimum quantity.',
    href: `${site}/promo-kratos-now-on-sale/`,
  },
  {
    title: 'OS+H Asia 2022',
    date: 'Sep 2022',
    category: 'Trade Shows',
    summary:
      'Drop by our booth for your height safety requirements and learn from our height safety specialists in Singapore.',
    href: `${site}/trade-show-osah-asia-2022/`,
  },
  {
    title: 'Buy 1 SRL, get a harness and gloves free',
    date: 'Jun 2022',
    category: 'Promotions',
    offer: 'Harness + gloves free',
    summary:
      'This June, buy one self-retracting lifeline and get a harness and gloves free. Limited stock only.',
    href: `${site}/promo-buy-1-srl-get-harness-gloves-free/`,
  },
  {
    title: 'BuildTech Asia 2022',
    date: 'Mar 2022',
    category: 'Trade Shows',
    summary:
      'Drop by our booth for your height safety requirements and learn from our height safety specialists in Singapore.',
    href: `${site}/buildtech-asia-2022/`,
  },
  {
    title: 'Selected PPE products now on sale',
    date: 'Aug 2021',
    category: 'Promotions',
    offer: 'Up to 15% off',
    summary:
      'This August, a major discount on selected self-retracting lifelines.',
    href: `${site}/selected-ppe-product-now-on-sales/`,
  },
  {
    title: 'Full body harness now on sale',
    date: 'Dec 2020',
    category: 'Promotions',
    offer: '$63 → $45',
    summary:
      'This December, a major discount on the advanced full body harness. Usual price $63, now only $45.',
    href: `${site}/promo-full-body-harness-now-on-sale/`,
  },
  {
    title: 'Assorted PPE products now on sale',
    date: 'Sep 2020',
    category: 'Promotions',
    offer: 'Cost price deal',
    summary:
      'This September, a major discount on assorted PPE products at cost price. Limited stock only.',
    href: `${site}/promo-assorted-ppe-products-now-on-sale/`,
  },
  {
    title: 'How to choose the right safety harness',
    date: 'Feb 2020',
    category: 'Blogs',
    summary:
      '“Which one is the cheapest harness?” is one of the questions clients ask us most.',
    href: `${site}/how-to-choose-the-right-safety-harness/`,
  },
  {
    title: 'Should I inspect my own harness?',
    date: 'Feb 2020',
    category: 'Blogs',
    summary:
      'The quick answer is yes. According to WSHC, all personal protective equipment has to be regularly inspected.',
    href: `${site}/should-i-inspect-my-own-harness/`,
  },
  {
    title: 'Aluminium alloy carabiner now on sale',
    date: 'Dec 2019',
    category: 'Promotions',
    offer: '10 for $100',
    summary:
      'A major discount on the advanced carabiner S2002B. Usual price $14 each, now 10 for $100.',
    href: `${site}/carabiner-in-aluminium-alloy-now-on-sale/`,
  },
  {
    title: 'OS+H Asia 2018',
    date: 'Aug 2018',
    category: 'Trade Shows',
    summary:
      'Drop by our booth for your height safety requirements and learn from our height safety specialists in Singapore.',
    href: `${site}/osh-asia-2018/`,
  },
];
