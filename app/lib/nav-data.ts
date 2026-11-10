// Navigation content taken from https://akrobat.com.sg
// Later this file can be replaced by data from Sanity.

export type NavLeaf = { label: string; href: string };
export type NavGroup = { label: string; href: string; children: NavLeaf[] };
export type NavItem = NavLeaf | NavGroup;

export type SubKey = 'products' | 'solutions' | 'projects';

export const isGroup = (item: NavItem): item is NavGroup => 'children' in item;

export const products: NavGroup[] = [
  {
    label: 'Fall Arrest Equipment',
    href: '/products/fall-arrest-equipment',
    children: [
      {
        label: 'Self-Retracting Lifeline (Wire / Webbing / Special)',
        href: '/products/fall-arrest-equipment/self-retracting-lifeline-wire-webbing-special',
      },
      {
        label: 'Harness (Basic / Advance / Pro)',
        href: '/products/fall-arrest-equipment/harness-basic-advance-pro',
      },
      {
        label: 'Temporary Lifeline & Fall Arrester',
        href: '/products/fall-arrest-equipment/temporary-lifeline-fall-arrester',
      },
      { label: 'Lanyard', href: '/products/fall-arrest-equipment/lanyard' },
      {
        label: 'Carabiner & Hook',
        href: '/products/fall-arrest-equipment/carabiner-hook',
      },
      {
        label: 'Rope & Sling',
        href: '/products/fall-arrest-equipment/rope-sling',
      },
    ],
  },
  {
    label: 'Mobile Fall Protection',
    href: '/products/mobile-fall-protection',
    children: [
      {
        label: 'Alsipercha (Tripod)',
        href: '/products/mobile-fall-protection/alsipercha-tripod',
      },
      {
        label: 'Alsipercha (Counterweight)',
        href: '/products/mobile-fall-protection/alsipercha-counterweight',
      },
      {
        label: 'Alsipercha (Rail)',
        href: '/products/mobile-fall-protection/alsipercha-rail',
      },
    ],
  },
  {
    label: 'Permanent Anchorage System',
    href: '/products/permanent-anchorage-system',
    children: [
      {
        label: 'Permanent Anchorage Point',
        href: '/products/permanent-anchorage-system/permanent-anchorage-point',
      },
      {
        label: 'Anchor Point (Supply & Install with PE Endorsement)',
        href: '/products/permanent-anchorage-system/supply-install-only',
      },
    ],
  },
  {
    label: 'Roof Clamps',
    href: '/products/clamps',
    children: [
      { label: 'AK Clamps', href: '/products/clamps/ak-clamps' },
      { label: 'S-5 Clamps', href: '/products/clamps/s5-clamps' },
    ],
  },
  {
    label: 'Safety Tripod & Winch',
    href: '/products/rescue-winch',
    children: [
      { label: 'Tripod', href: '/products/other-equipment/tripod' },
      { label: 'Winch', href: '/products/other-equipment/winch' },
    ],
  },
  {
    label: 'Other Equipment (Add-on)',
    href: '/products/other-equipment',
    children: [
      { label: 'Bags', href: '/products/rescue-winch/bags' },
      { label: 'Ladders', href: '/products/rescue-winch/ladders' },
      { label: 'Rope Climber', href: '/products/other-equipment/rope-climber' },
      { label: 'RAT Device', href: '/products/rescue-winch/rat-device' },
      { label: 'Pulley', href: '/products/rescue-winch/pulley' },
    ],
  },
];

export const solutions: NavLeaf[] = [
  {
    label: 'Safety Consulting',
    href: '/engineering-solutions/safety-consulting',
  },
  {
    label: 'Lifeline Flexible',
    href: '/engineering-solutions/flexible-lifeline',
  },
  {
    label: 'Lifeline Rigid (Securail)',
    href: '/engineering-solutions/lifeline-rigid-securail-en-795-d',
  },
  {
    label: 'Anti Slip Walkway System',
    href: '/engineering-solutions/walkway-guardrail-handrail',
  },
  {
    label: 'Guardrail (Handrail)',
    href: '/engineering-solutions/safety-guardrail-systems',
  },
  {
    label: 'Safety Cage Ladders',
    href: '/engineering-solutions/height-access-solutions',
  },
  {
    label: 'Building Maintenance Unit',
    href: '/engineering-solutions/building-maintenance-unit',
  },
  { label: 'Rope Access', href: '/engineering-solutions/rope-access-works' },
  {
    label: 'Roof Safety Anchor Points',
    href: '/engineering-solutions/anchors-points-en-795',
  },
  {
    label: 'Inspection & Re-Certification and Maintenance',
    href: '/engineering-solutions/inspection-recert',
  },
];

export const projects: NavItem[] = [
  {
    label: 'Singapore',
    href: '/projects/singapore-projects',
    children: [
      {
        label: 'Entertainment',
        href: '/projects/singapore-projects/entertainment',
      },
      { label: 'Government', href: '/projects/singapore-projects/government' },
      { label: 'Factories', href: '/projects/singapore-projects/factories' },
      {
        label: 'Oil Offshore',
        href: '/projects/singapore-projects/oil-offshore',
      },
      { label: 'Schools', href: '/projects/singapore-projects/schools' },
      {
        label: 'Condominium / Hotel',
        href: '/projects/singapore-projects/condominium-hotel',
      },
      {
        label: 'Shopping Center / Offices',
        href: '/projects/singapore-projects/shopping-center-offices',
      },
      {
        label: 'Rope Access Works',
        href: '/engineering-solutions/rope-access-works-2',
      },
    ],
  },
  { label: 'International', href: '/projects/international' },
];

export const subMenus: Record<SubKey, NavItem[]> = {
  products,
  solutions,
  projects,
};

export const subMeta: Record<SubKey, { label: string; href: string }> = {
  products: { label: 'Products', href: '/products' },
  solutions: { label: 'Engineering Solutions', href: '/engineering-solutions' },
  projects: { label: 'Projects', href: '/projects' },
};

export type MainMenuItem = { label: string; href?: string; sub?: SubKey };

export const mainMenu: MainMenuItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Products', sub: 'products' },
  { label: 'Engineering Solutions', sub: 'solutions' },
  { label: 'Projects', sub: 'projects' },
  { label: 'Promotions & News', href: '/promotions-news' },
  { label: 'Contact Us', href: '/contact-us' },
];

export const company = {
  name: 'Akrobat Pte Ltd',
  address: [
    '53 Ubi Avenue 1 #05-13',
    'Paya Ubi Industrial Park',
    'Singapore 408934',
  ],
  phone: '(65) 6744 4235',
  phoneHref: 'tel:+6567444235',
  email: 'salesup@akrobat.com.sg',
};

// Flat list used by the search box
export type SearchEntry = { label: string; href: string; type: string };

export const searchIndex: SearchEntry[] = [
  ...products.flatMap((g) => [
    { label: g.label, href: g.href, type: 'Product' },
    ...g.children.map((c) => ({ ...c, type: 'Product' })),
  ]),
  ...solutions.map((s) => ({ ...s, type: 'Solution' })),
  ...projects.flatMap((p) =>
    isGroup(p)
      ? [
          { label: p.label, href: p.href, type: 'Project' },
          ...p.children.map((c) => ({ ...c, type: 'Project' })),
        ]
      : [{ ...p, type: 'Project' }],
  ),
];
