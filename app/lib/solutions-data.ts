// Engineering Solutions content, adapted from https://akrobat.com.sg
// Image ids (ES-xx-x) are placeholders: add the file path to `images`
// in product-data.ts and the photo appears in that slot.

export type Section = {
  title: string;
  body?: string;
  points?: string[];
  specs?: [string, string][];
  link?: { label: string; href: string };
  image?: { id: string; hint: string };
};
export type Solution = {
  slug: string;
  label: string;
  short: string;
  cover: { id: string; hint: string };
  standard?: string;
  lead: string;
  facts: [string, string][];
  sections: Section[];
};

const up = 'https://akrobat.com.sg/wordpress/wp-content/uploads/2018/08/';

export const solutions: Solution[] = [
  {
    slug: 'safety-consulting',
    label: 'Safety Consulting',
    short: 'A specialist team that designs the right system for your brief.',
    cover: { id: 'ES-01', hint: 'Engineer reviewing a roof plan on site' },
    lead: 'Our safety specialists respond to your brief, visit the site when needed and propose the system the project requires, from design and engineering to installation and inspection.',
    facts: [
      ['Scope', 'Design to inspection'],
      ['Site visit', 'When required'],
    ],
    sections: [
      {
        title: 'From brief to installed system',
        points: [
          'Site visit and risk review',
          'Design and engineering',
          'Installation',
          'Inspection and after-sales service',
        ],
        image: { id: 'ES-01-A', hint: 'Site survey on a rooftop' },
      },
      {
        title: 'PPE advice and product demonstration',
        body: 'We advise on personal protective equipment and demonstrate how it works with your system. Handled case by case.',
        image: { id: 'ES-01-B', hint: 'Product demo and training session' },
      },
    ],
  },
  {
    slug: 'flexible-lifeline',
    label: 'Lifeline Flexible',
    short: 'Horizontal, vertical and overhang cable lifelines.',
    cover: { id: 'ES-02', hint: 'Horizontal lifeline along a roof walkway' },
    standard: 'EN 795 Class C · EN 353-1',
    lead: 'Cable lifelines that let workers move the full length of a system without unhooking. Fitted to concrete, metal roofs and steel structures.',
    facts: [
      ['Horizontal', 'EN 795 Class C'],
      ['Vertical', 'EN 353-1'],
      ['Overhang', 'EN 795 Class C'],
    ],
    sections: [
      {
        title: 'Horizontal lifeline',
        body: 'A continuous system: the worker stays connected end to end. Every intermediate bracket has an integrated absorber that can be reset after a fall.',
        points: [
          'Glider: passes over intermediate anchors, so the worker keeps 100% tie-off',
          'Intermediate bracket: non-deformable, resettable, and a certified EN 795 anchor point for rescue',
          'End bracket: fixed with two M12 bolts, takes an absorber at one end and a tensioner at the other',
          'Energy absorber: a spring system that takes most of the fall energy and returns to position',
        ],
        image: {
          id: 'ES-02-A',
          hint: 'Intermediate bracket and glider close-up',
        },
      },
      {
        title: 'Vertical lifeline',
        body: 'Fall protection for façade ladders, posts and masts. A removable fall arrester runs on an 8 mm galvanized steel cable and locks automatically in a fall.',
        points: [
          'Cable supported every 10 m by guides that stop wind chatter and fretting',
          'Inline energy absorber removes shock on the traveler',
          'Users can attach and detach at any point',
          'Tested to EN 353-1 and CE marked',
        ],
        image: { id: 'ES-02-B', hint: 'Vertical lifeline on a fixed ladder' },
      },
      {
        title: 'Overhang lifeline',
        body: 'Built for loading bays, oil depots and aircraft hangars.',
        points: [
          'Non-deformable absorbers limit the load passed to the structure',
          '10 mm stainless steel wire rope reduces deflection in a fall',
          'Retractable blocks on pulleys follow the worker, even above 20 m',
        ],
        image: {
          id: 'ES-02-C',
          hint: 'Overhang lifeline in a hangar or loading bay',
        },
      },
    ],
  },
  {
    slug: 'lifeline-rigid-securail-en-795-d',
    label: 'Lifeline Rigid (Securail)',
    short: 'A slim anodised aluminium rail for fall arrest and abseiling.',
    cover: { id: 'ES-03', hint: 'Securail rail with trolley on a roof' },
    standard: 'EN 795:2012 Class D',
    lead: 'A European rail system for both fall arrest and abseiling. Anodised aluminium alloy withstands marine environments, and the treatment prevents electrolytic corrosion against steel.',
    facts: [
      ['Profile', '31 × 31 mm'],
      ['Trolleys', '6 types'],
      ['Standard', 'EN 795 Class D'],
    ],
    sections: [
      {
        title: 'Securail Horizontal',
        body: 'Fits any roof shape, industrial, residential or commercial, on metal or glass supports. Can be coloured to match the façade.',
        points: [
          'Maximum span of 3 m to 5 m between brackets',
          'Two people maximum per span',
          'Mounts on ground, wall or ceiling, at any angle',
        ],
        image: { id: 'ES-03-A', hint: 'Horizontal rail on a roof' },
      },
      {
        title: 'Securail Vertical',
        body: 'Installed on an existing ladder, the curve at the top keeps the worker attached until they stand on the platform.',
        image: {
          id: 'ES-03-B',
          hint: 'Vertical rail with curved top on a ladder',
        },
      },
      {
        title: 'Overhang',
        body: 'Mounted overhead where fall clearance is low or where a self-retracting lifeline needs to travel freely.',
        image: { id: 'ES-03-C', hint: 'Overhead rail in an industrial area' },
      },
    ],
  },
  {
    slug: 'walkway-guardrail-handrail',
    label: 'Anti Slip Walkway System',
    short:
      'A defined, grippy route across the roof that protects the roof too.',
    cover: { id: 'ES-04', hint: 'Yellow walkway across a roof' },
    lead: 'A rooftop walkway gives a stable, slip-resistant, level surface and a defined route. It guards users against hazards and protects the roof from damage.',
    facts: [
      ['Materials', 'Aluminium · Fibreglass'],
      ['Colours', 'Yellow or grey'],
    ],
    sections: [
      {
        title: 'What you get',
        points: [
          'No damage to the roof surface',
          'Lightweight, quick to install',
          'Fire-retardant and UV-resistant',
          'Multi-directional anti-slip surface for wet weather',
          'Limits access to unauthorised zones',
          'Fixes to metal deck, standing seam, concrete or other supports on request',
        ],
        image: { id: 'ES-04-A', hint: 'Walkway on a standing seam roof' },
      },
      {
        title: 'Aluminium walkway',
        points: [
          'Durable and non-corrosive',
          'No welding needed; fits new or existing structures',
          '6063 aluminium with a mill finish',
          'Non-penetrating roof fixings available',
          'Guardrails can be added',
        ],
        link: {
          label: 'Download brochure',
          href: up + 'ALUMINIUM-WALKWAY-BROCHURE.pdf',
        },
        image: { id: 'ES-04-B', hint: 'Aluminium walkway detail' },
      },
      {
        title: 'Fibreglass walkway',
        body: 'Suited to corrosive settings such as petrochemical plants, water treatment and marine vessels.',
        points: [
          'Lighter than aluminium and very strong',
          'Fire retardant, no welding needed',
          'Yellow for visibility or grey for low impact',
          'Handrails on one or both sides',
        ],
        link: {
          label: 'Download brochure',
          href: up + 'FIBERGLASS-WALKWAY-BROCHURE.pdf',
        },
        image: { id: 'ES-04-C', hint: 'Fibreglass walkway on a plant roof' },
      },
    ],
  },
  {
    slug: 'safety-guardrail-systems',
    label: 'Guardrail (Handrail)',
    short: 'Edge protection for permanent or temporary roof access.',
    cover: { id: 'ES-05', hint: 'Guardrail along a roof edge' },
    standard: 'EN ISO 14122-3 · NF E 85-015',
    lead: 'A protective barrier that allows safe access at height. Fully tested to meet or exceed the major fall protection requirements, and installed without penetrating most roofs.',
    facts: [
      ['Standards', 'EN 14122-3, NF E 85-015'],
      ['Reply time', 'Within 1 working day'],
    ],
    sections: [
      {
        title: 'Why it works',
        points: [
          'Corrosion resistant with a long life',
          'Not damaged by sun or weather',
          'Minimal maintenance, no specialist training',
          'Installs without penetration on a wide range of roofs',
          'Made to fit existing or new structures',
        ],
        link: {
          label: 'Download brochure',
          href: up + 'GUARDRAIL-BROCHURE.pdf',
        },
        image: {
          id: 'ES-05-A',
          hint: 'Free-standing guardrail on a flat roof',
        },
      },
      {
        title: 'Configurations',
        points: [
          'Free standing',
          'Parapet',
          'Roof slab',
          'Skylight protection',
          'Metal deck roof',
          'Temporary edge protection',
        ],
        image: { id: 'ES-05-B', hint: 'Parapet or skylight guardrail' },
      },
    ],
  },
  {
    slug: 'height-access-solutions',
    label: 'Safety Cage Ladders',
    short: 'Fixed ladders with cage or built-in fall arrest.',
    cover: { id: 'ES-06', hint: 'Aluminium cage ladder on a building' },
    standard: 'EN ISO 14122-4 · NF E 85',
    lead: 'Falls from ladders are common and serious. We have designed and installed fixed safety ladders at more than 600 sites in Singapore, with the tools workers carry in mind.',
    facts: [
      ['Ladder width', '600 mm'],
      ['Intermediate landing', 'Above 9 m'],
      ['Sites', '600+'],
    ],
    sections: [
      {
        title: 'Aluminium safety cage ladder',
        points: [
          'Suits indoor and outdoor use',
          'Quick to install',
          'Overall width of 600 mm, one of the widest available',
          'Lockable door to stop unauthorised access',
          'Anodised or powder-coated in your colour',
        ],
        image: { id: 'ES-06-A', hint: 'Cage ladder with lockable door' },
      },
      {
        title: 'Vertical ladder with fall arrest',
        body: 'An alternative to the cage. The fall arrest rail is built into the ladder. A rigid trolley with an absorber follows the climber and locks at once in a fall.',
        points: [
          'Protects one or two climbers, 4 m apart',
          'Anodised aluminium',
          'Standard brackets, custom lengths on request',
        ],
        image: {
          id: 'ES-06-B',
          hint: 'Ladder with integrated fall arrest rail',
        },
      },
      {
        title: 'Options',
        points: [
          'Retractable ladder',
          'Security locking system',
          'Safety door',
          'Integrated vertical lifeline',
          'Secure handhold at the landing',
        ],
        image: { id: 'ES-06-C', hint: 'Retractable or locked ladder detail' },
      },
    ],
  },
  {
    slug: 'building-maintenance-unit',
    label: 'Building Maintenance Unit',
    short: 'Permanent suspended access for tall and complex façades.',
    cover: { id: 'ES-07', hint: 'Gondola on a high-rise façade' },
    lead: 'A BMU moves systematically over a structure and is the most complete form of suspended access. Permanently installed, it is used for repair, inspection, cleaning and maintenance of façades.',
    facts: [
      ['Type', 'Permanent'],
      ['Use', 'Façade access'],
    ],
    sections: [
      {
        title: 'Configurations',
        points: [
          'Manual davit arms',
          'Motorized davit arms',
          'Gondola track',
          'Ladder and gantry system',
        ],
        image: { id: 'ES-07-A', hint: 'Davit arm or gondola track on a roof' },
      },
    ],
  },
  {
    slug: 'rope-access-works',
    label: 'Rope Access',
    short: 'Rope access teams for work that scaffolding cannot reach quickly.',
    cover: { id: 'ES-08', hint: 'Technician on rope against a façade' },
    lead: 'A safe, cost-effective way to reach high structures without scaffolding, aerial platforms or cradles. Workers move between parts of a building quickly and reach awkward spots without disrupting operations.',
    facts: [
      ['Services', '9'],
      ['Region', 'Singapore and international'],
    ],
    sections: [
      {
        title: 'What our rope access team does',
        points: [
          'Building service and maintenance, including façade cleaning and repairs',
          'Geotechnical',
          'Inspection and testing',
          'NDT (non-destructive testing)',
          'Coating and painting',
          'Insulation and cladding',
          'Fireproofing',
          'Building signage',
          'Stand-by rescue',
        ],
        image: { id: 'ES-08-A', hint: 'Rope access team at work' },
      },
    ],
  },
  {
    slug: 'anchors-points-en-795',
    label: 'Roof Safety Anchor Points',
    short: 'Permanent and mobile anchors for every roof and structure.',
    cover: { id: 'ES-09', hint: 'Anchor point on a metal roof' },
    standard: 'EN 795 Class A, B',
    lead: 'Anchor points for concrete, tile and metal roofs, installed temporarily or permanently. They support fall arrest, restraint, rope access and rescue. Not every anchor suits every job, so choose by purpose.',
    facts: [
      ['Permanent', '5 types'],
      ['Mobile', '7 models'],
    ],
    sections: [
      {
        title: 'Permanent anchors',
        points: [
          'Rope access: EN 795 Class A1, for concrete, steel, windows, rooftops, ladder tops and slabs',
          'Concealed: a socket stays in the wall under a cover, and a removable anchor needs two hands to insert',
          'Tile roof: fits clay, cement and slate with no penetration, so no leaks',
          'Metal roof: clamps to standing seam, kalzip and lock seam without drilling',
          'Structural beam: fits I-beams and steel in any direction, absorbs energy',
        ],
        image: {
          id: 'ES-09-A',
          hint: 'Permanent anchor on tile or metal roof',
        },
      },
      {
        title: 'Mobile anchors',
        specs: [
          [
            'Door / Window Anchor AK SF-DA-802',
            '600–1250 mm openings · aluminium · 5.65 kg · EN 795:2012 Type B',
          ],
          [
            'Girder Grip AKSS 2318 (506 mm)',
            'Steel work · min. breaking load 22 kN',
          ],
          [
            'Girder Grip AKSS 2251 (210 mm)',
            'Steel work · min. breaking load 22 kN',
          ],
          [
            'Rib Bar Anchor Clamp AT187-01',
            'Rib bar ø18–32 mm · stainless · 1.62 kg · EN 795',
          ],
          [
            'Universal Mobile Anchor AK AC 340',
            'Clamps 75–140 mm · stainless · 2.5 kg · EN 795 Class A',
          ],
          [
            'Transportable Anchor AK SYAM',
            '15 kg · 24 kN · 2 people · EN 795 Class B',
          ],
          [
            'Parapet Wall Anchor AK SF-PA-804',
            'Parapets 60–360 mm · 9.56 kg · >23 kN · EN 795:2012 Type B',
          ],
        ],
        image: { id: 'ES-09-B', hint: 'Girder grip or parapet anchor in use' },
      },
    ],
  },
  {
    slug: 'inspection-recert',
    label: 'Inspection & Re-Certification',
    short: 'Annual inspection, re-certification and maintenance.',
    cover: { id: 'ES-10', hint: 'Inspector checking a lifeline bracket' },
    lead: 'Regulations, codes and manufacturers require height safety equipment and PPE to be inspected by a competent person at least once a year. Regular checks keep each part working and extend its service life.',
    facts: [
      ['Frequency', 'At least yearly'],
      ['Coverage', 'Nationwide and offshore'],
    ],
    sections: [
      {
        title: 'What our department provides',
        points: [
          'Nationwide and offshore inspection and testing',
          'Detailed reports on system and equipment condition',
          'Inspection and re-certification of PPE',
          'Preventive maintenance',
          'Repair or replacement of damaged items',
          'Signage and timely reminders',
        ],
        image: { id: 'ES-10-A', hint: 'Inspection tag and report' },
      },
      {
        title: 'What we inspect',
        points: [
          'Horizontal lifelines',
          'Rail systems',
          'Vertical lifelines',
          'Anchorage points',
          'PPE',
          'Guardrails',
          'Walkways',
          'Fixed ladders',
          'Davit arms',
          'Safety nets',
          'Gondola tracks',
          'Abseil systems',
        ],
        image: { id: 'ES-10-B', hint: 'Inspector on a roof with equipment' },
      },
    ],
  },
  {
    slug: 'safety-net',
    label: 'Safety Net',
    short: 'Netting that catches people and falling objects.',
    cover: {
      id: 'ES-11',
      hint: 'Safety netting under a roof or high-rise structure',
    },
    lead: 'Fall protection netting deflects and absorbs the energy of a fall, so a person is less likely to be injured. The same net stops tools and materials from dropping onto people and property below.',
    facts: [
      ['Material', '100% recyclable'],
      ['Reuse', 'Relocate to a new site'],
      ['Design', 'Custom to your site'],
    ],
    sections: [
      {
        title: 'Why use netting',
        points: [
          'Easy to install, easy to uninstall',
          '100% recyclable and can move to a new job site',
          'Keeps objects and materials from falling on high-rise projects',
          'Lets people work at height without restricting movement',
          'Custom designed to suit your needs',
        ],
        image: {
          id: 'ES-11-A',
          hint: 'Netting installed on a high-rise project',
        },
      },
      {
        title: 'Where it protects',
        body: 'Nets cover the gaps where a fall is most likely.',
        points: [
          'Between roof trusses',
          'High strutting formwork',
          'Brittle roofs and skylights',
          'Roof and floor openings',
        ],
        image: {
          id: 'ES-11-B',
          hint: 'Net beneath a skylight or roof opening',
        },
      },
    ],
  },
];

export const findSolution = (slug: string) =>
  solutions.find((s) => s.slug === slug);

// The index page groups the systems by where they sit on a building.
export type SolutionGroup = {
  id: string;
  label: string;
  blurb: string;
  slugs: string[];
};
export const groups: SolutionGroup[] = [
  {
    id: 'fall-arrest',
    label: 'Fall arrest',
    blurb: 'Keep a worker connected, or catch them if they fall.',
    slugs: [
      'flexible-lifeline',
      'lifeline-rigid-securail-en-795-d',
      'anchors-points-en-795',
      'safety-net',
    ],
  },
  {
    id: 'roof-access',
    label: 'Roof access and edges',
    blurb: 'Get people onto the roof and keep them on safe ground.',
    slugs: [
      'height-access-solutions',
      'walkway-guardrail-handrail',
      'safety-guardrail-systems',
    ],
  },
  {
    id: 'facade',
    label: 'Façade and suspended access',
    blurb: 'Reach the outside of tall and complex buildings.',
    slugs: ['building-maintenance-unit', 'rope-access-works'],
  },
  {
    id: 'support',
    label: 'Advice and upkeep',
    blurb: 'Choose the right system, then keep it certified.',
    slugs: ['safety-consulting', 'inspection-recert'],
  },
];
