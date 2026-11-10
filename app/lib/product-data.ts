import { products, type NavGroup, type NavLeaf } from './nav-data';

/* ------------------------------------------------------------------
   IMAGES
   Every picture on the product pages is an "image slot" with an id
   (shown on the placeholder). Put the file in /public/products and add
   one line here, e.g.   'FA-01': '/products/fa-01-srl.jpg',
------------------------------------------------------------------- */
export const images: Record<string, string> = {
  'FA-COVER': '/products/fa-cover.png',
  'FA-01': '/products/fa-01.jpg',
};

export type CategoryMeta = {
  code: string;
  kicker: string;
  summary: string;
  marquee: string[];
};

export const categoryMeta: Record<string, CategoryMeta> = {
  '/products/fall-arrest-equipment': {
    code: 'FA',
    kicker: 'Personal fall protection',
    summary:
      'The equipment that links a worker to a safe anchor and stops a fall before it becomes an injury: lifelines, harnesses, lanyards, connectors and ropes.',
    marquee: [
      'EN 360',
      'EN 361',
      'EN 362',
      'EN 353-2',
      'EN 354 / 355',
      'EN 1891',
    ],
  },
  '/products/mobile-fall-protection': {
    code: 'MF',
    kicker: 'Portable anchorage',
    summary:
      'Movable fall protection that brings a safe anchor to the work: tripod, counterweight and rail Alsipercha systems.',
    marquee: [
      'Tripod',
      'Counterweight',
      'Rail',
      'No permanent fixing',
      'Alsipercha',
    ],
  },
  '/products/permanent-anchorage-system': {
    code: 'PA',
    kicker: 'Fixed anchorage',
    summary:
      'Permanent anchor points for roofs and structures, supplied and installed with Professional Engineer endorsement.',
    marquee: ['Anchor points', 'PE endorsement', 'Supply & install', 'EN 795'],
  },
  '/products/clamps': {
    code: 'RC',
    kicker: 'Roof attachment',
    summary:
      'Clamps that secure anchorage to roof profiles: our own AK Clamps and the S-5 range.',
    marquee: ['AK Clamps', 'S-5 Clamps', 'Roof anchorage'],
  },
  '/products/rescue-winch': {
    code: 'ST',
    kicker: 'Lifting & rescue',
    summary:
      'Safety tripod and winch for controlled access, lifting and rescue at openings and shafts.',
    marquee: ['Tripod', 'Winch', 'Access', 'Rescue'],
  },
  '/products/other-equipment': {
    code: 'OE',
    kicker: 'Add-on equipment',
    summary:
      'The extras that complete a safe kit: bags, ladders, rope climbers, RAT devices and pulleys.',
    marquee: ['Bags', 'Ladders', 'Rope climber', 'RAT device', 'Pulley'],
  },
};

export type ProductDetail = {
  standard: string;
  summary: string;
  features: { t: string; d: string }[];
  uses: string[];
};

/* Content written from the product names and common industry standards.
   Please check every line before this goes live. */
export const itemDetails: Record<string, ProductDetail> = {
  '/products/fall-arrest-equipment/self-retracting-lifeline-wire-webbing-special':
    {
      standard: 'EN 360',
      summary:
        'A lifeline that pays out as you move and locks within a fraction of a second when you fall, keeping the drop short.',
      features: [
        {
          t: 'Always taut',
          d: 'The line retracts on its own, so there is no slack to trip over or to lengthen a fall.',
        },
        {
          t: 'Locks on a sudden pull',
          d: 'A normal pace moves freely. A fall engages the brake and holds you.',
        },
        {
          t: 'Wire, webbing or special',
          d: 'Pick the line for the environment: tough wire, lighter webbing, or a special version for demanding sites.',
        },
        {
          t: 'Inspected and re-certified',
          d: 'We service and re-certify units on schedule so they stay ready for use.',
        },
      ],
      uses: [
        'Roof edges',
        'Plant platforms',
        'Towers & ladders',
        'Maintenance gantries',
      ],
    },
  '/products/fall-arrest-equipment/harness-basic-advance-pro': {
    standard: 'EN 361',
    summary:
      'Full-body harnesses that spread the force of a fall across shoulders, chest and thighs, in three levels from Basic to Pro.',
    features: [
      {
        t: 'Full-body support',
        d: 'Straps cross the strongest parts of the body so the load is shared, not concentrated.',
      },
      {
        t: 'Basic, Advance, Pro',
        d: 'Step up from the essentials to extra comfort and features as the work demands.',
      },
      {
        t: 'Adjustable fit',
        d: 'Shoulder, chest and leg adjustment so one harness fits many workers properly.',
      },
      {
        t: 'Back attachment',
        d: 'A dorsal D-ring keeps you upright and connected when a fall is arrested.',
      },
    ],
    uses: [
      'Roof & facade work',
      'Plant maintenance',
      'Construction',
      'Telecom towers',
    ],
  },
  '/products/fall-arrest-equipment/temporary-lifeline-fall-arrester': {
    standard: 'EN 353-2',
    summary:
      'A rigged line with a fall arrester that travels with you, for jobs where nothing permanent exists.',
    features: [
      {
        t: 'Rigged in minutes',
        d: 'Fix the line to suitable anchors and the work area is protected.',
      },
      {
        t: 'Moves with you',
        d: 'The arrester follows along the line and locks the moment a fall begins.',
      },
      {
        t: 'No permanent fixing',
        d: 'Take it down when the job is done and nothing is left on the structure.',
      },
      {
        t: 'Short or long spans',
        d: 'Set up to suit the route and the number of people using it.',
      },
    ],
    uses: [
      'Short-term roof jobs',
      'Steel erection',
      'Shutdowns',
      'Temporary access routes',
    ],
  },
  '/products/fall-arrest-equipment/lanyard': {
    standard: 'EN 354 / EN 355',
    summary:
      'The link between harness and anchor, with energy absorption that softens the shock of a fall.',
    features: [
      {
        t: 'Energy absorber',
        d: 'It tears open in a controlled way to reduce the force on the body.',
      },
      {
        t: 'Right length',
        d: 'Choose a length that keeps the fall distance short for your work.',
      },
      {
        t: 'Single or twin leg',
        d: 'Twin-leg versions let you stay connected while moving between anchors.',
      },
      {
        t: 'Compatible fittings',
        d: 'Matched to our harnesses, carabiners and hooks.',
      },
    ],
    uses: ['Roof work', 'Scaffolding', 'Structural steel', 'Plant access'],
  },
  '/products/fall-arrest-equipment/carabiner-hook': {
    standard: 'EN 362',
    summary:
      'Connectors that join harness, lanyard and anchor, and stay shut until you decide to open them.',
    features: [
      {
        t: 'Self-locking gates',
        d: 'Reduce the chance of the gate opening by accident.',
      },
      {
        t: 'Carabiners and hooks',
        d: 'Compact carabiners and large-opening hooks for scaffold and structure.',
      },
      {
        t: 'Strong and light',
        d: 'Forged shapes carry the load without weighing down the kit.',
      },
      {
        t: 'Easy to inspect',
        d: 'Simple to check before each use, and to re-certify on schedule.',
      },
    ],
    uses: [
      'Every fall arrest kit',
      'Scaffold connections',
      'Anchor attachment',
    ],
  },
  '/products/fall-arrest-equipment/rope-sling': {
    standard: 'EN 1891 / EN 795',
    summary:
      'Low-stretch rope and slings to form anchor connections and work lines.',
    features: [
      {
        t: 'Low-stretch rope',
        d: 'Holds position under load with little give.',
      },
      {
        t: 'Anchor slings',
        d: 'Wrap around a suitable structure to create a quick anchor point.',
      },
      {
        t: 'Lengths to suit',
        d: 'Supplied in lengths for rope work, rescue and anchorage.',
      },
      {
        t: 'Inspection support',
        d: 'We inspect and re-certify slings and ropes in service.',
      },
    ],
    uses: ['Rope access', 'Rescue', 'Anchor connection', 'Temporary lines'],
  },
};

export function getDetail(item: NavLeaf, group: NavGroup): ProductDetail {
  return (
    itemDetails[item.href] ?? {
      standard: group.label,
      summary: `${item.label} from the Akrobat ${group.label} range. Tell us about your site and we will recommend the right model.`,
      features: [
        {
          t: 'Specified for your site',
          d: 'Our engineers match the product to your work at height.',
        },
        {
          t: 'Supply and installation',
          d: 'Supplied and, where needed, installed by our own team.',
        },
        {
          t: 'Inspection & re-certification',
          d: 'Ongoing checks keep the equipment compliant.',
        },
        {
          t: 'Quote on request',
          d: 'Contact us with your requirements for pricing and availability.',
        },
      ],
      uses: ['Roofs', 'Plants', 'Buildings'],
    }
  );
}

/* ---------- lookups ---------- */
export function findGroup(href: string) {
  return products.find((g) => g.href === href);
}
export function findItem(href: string) {
  for (const group of products) {
    const index = group.children.findIndex((c) => c.href === href);
    if (index >= 0) return { group, item: group.children[index], index };
  }
  return undefined;
}
export const allProductSlugs: string[][] = [
  ...products.flatMap((g) => [g.href, ...g.children.map((c) => c.href)]),
].map((href) => href.replace(/^\/products\//, '').split('/'));

export const stripParens = (s: string) => s.replace(/\s*\(.*\)\s*$/, '');
export const parens = (s: string) => s.match(/\((.*)\)/)?.[1];
