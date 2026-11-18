// Projects page content. Sector names come from the site menu; landmark names
// come from Akrobat's company profile. The old site's per-sector project lists
// could not be read, so `projects` is empty for now: add names here
// (e.g. projects: ['Project name']) and they appear on the page.
// Pictures: put files in /public/projects/ and set `image` ('/projects/x.jpg').

export type Sector = {
  id: string;
  label: string;
  region: 'Singapore' | 'International';
  blurb: string;
  projects: string[];
  image?: string;
  /** Gallery pictures for this sector, e.g. ['/projects/ent-1.jpg']. Up to 4 are shown. */
  images?: string[];
  /** Named sites with photo galleries (shown as sections on the sector page). */
  sites?: Site[];
  /** Smaller sites listed with the systems installed (no photos). */
  others?: OtherSite[];
};

export type Site = { name: string; images: string[] };
export type OtherSite = { name: string; detail?: string; systems: string[] };

// Photos below are the ones on the old site (akrobat.com.sg). Until they are
// copied into /public/projects/, they load from there. To switch an image,
// replace the `up(...)` call with a local path like '/projects/gov/mrt-1.jpg'.
const up = (path: string) =>
  `https://akrobat.com.sg/wordpress/wp-content/uploads/${path}`;

export const sectors: Sector[] = [
  {
    id: 'entertainment',
    label: 'Entertainment',
    region: 'Singapore',
    blurb: 'Height safety for resorts, attractions and event venues.',
    projects: [],
  },
  {
    id: 'government',
    label: 'Government',
    region: 'Singapore',
    blurb: 'Fall protection and access systems for public buildings.',
    projects: [],
    sites: [
      {
        name: 'MRT / LTA',
        images: [
          '2018/07/IMG_5163.jpg',
          '2018/07/IMG_5145.jpg',
          '2018/07/IMG_5126.jpg',
          '2018/07/IMG_1646.jpg',
        ].map(up),
      },
      {
        name: 'Singapore Expo',
        images: [
          '2018/07/20171129_112551.jpg',
          '2018/07/20180306_142538.jpg',
          '2018/07/20180306_142556.jpg',
          '2018/07/20180306_142557.jpg',
        ].map(up),
      },
      {
        name: 'Changi Airport',
        images: [
          '2018/07/20150331_112801.jpg',
          '2018/07/IMG-20150227-WA0025.jpg',
          '2018/07/IMG_2044-copy.jpg',
          '2018/07/IMG_0089-copy.jpg',
          '2018/07/IMG_0082-copy.jpg',
        ].map(up),
      },
      {
        name: 'PSA',
        images: ['2018/07/26052011893-copy.jpg', '2018/07/DSC001352.jpg'].map(
          up,
        ),
      },
      {
        name: 'Tuas New Shipyard',
        images: [
          '2018/07/IMG_20130622_122602-copy.jpg',
          '2018/07/Untitled-1-copy.jpg',
        ].map(up),
      },
      {
        name: 'National Gallery Singapore',
        images: [
          '2018/07/20150904_110106-copy.jpg',
          '2018/07/20150904_110043-copy.jpg',
          '2018/07/20150904_105210-copy.jpg',
        ].map(up),
      },
      {
        name: 'National Museum of Singapore',
        images: [
          '2018/07/002.jpg',
          '2018/07/Photo1390.jpg',
          '2018/07/DSCN0821-copy.jpg',
          '2018/07/Photo1329-copy.jpg',
        ].map(up),
      },
      {
        name: 'Hospitals',
        images: [
          '2018/07/IMG_44831.jpg',
          '2018/07/20180203_105615-copy.jpg',
          '2018/07/20160922_103149-copy.jpg',
        ].map(up),
      },
    ],
    others: [
      {
        name: 'Bus depots',
        detail: 'Loyang, Sungei Seletar, Ulu Pandan, East Coast',
        systems: ['Lifeline'],
      },
      {
        name: 'Bus interchanges & terminals',
        detail:
          'Tampines, Choa Chu Kang, Eunos, Hougang, Bukit Merah, Harbourfront, Tuas, Interim and Kent Ridge',
        systems: ['Lifeline'],
      },
      {
        name: 'National Stadium Singapore',
        systems: ['Anchorage points', 'Lifeline'],
      },
      {
        name: 'Singapore Tourism Board',
        systems: ['Anchorage points', 'Horizontal lifeline'],
      },
      {
        name: 'National Heritage Conservation Centre',
        systems: ['Anchorage points', 'Horizontal lifeline'],
      },
      {
        name: 'JTC Fusionopolis',
        detail:
          'Anchorage points supplied and installed by rope access technicians, plus installation and testing of LED lights',
        systems: ['Anchorage points', 'Rope access'],
      },
      { name: 'Punggol Digital District', systems: ['Lifeline'] },
      { name: 'Horticulture Park', systems: ['Lifeline'] },
      { name: 'Police Station, DNR', systems: ['Monorail', 'Lifeline'] },
      {
        name: 'Family Justice Court',
        systems: ['Lifeline', 'Securail', 'Anchorage point'],
      },
      {
        name: 'Churches',
        detail: 'Novena Church, Church of the Good Shepherd, St Joseph Church',
        systems: [
          'Lifeline',
          'Anchorage point',
          'Cage ladder',
          'Walkway',
          'Guardrail',
        ],
      },
      {
        name: 'Social & community facilities',
        detail:
          'Compassvale Bow, Kaki Bukit, Kolam Ayer, Fengshan, Kovan, Upper Thomson, Thomson, Jurong Spring, HomeTeamNS Bedok and Khatib, Tampines nursing home, St John’s Home',
        systems: [
          'Anchorage point',
          'Lifeline',
          'Aluminium ladder',
          'Davit arms',
        ],
      },
      {
        name: '10-storey community facility, Compassvale Bow',
        detail: 'Sengkang planning area',
        systems: ['Gondola sockets', 'Davit arms', 'Anchorage points'],
      },
    ],
  },
  {
    id: 'factories',
    label: 'Factories',
    region: 'Singapore',
    blurb: 'Roof and plant access for industrial sites.',
    projects: [],
  },
  {
    id: 'oil-offshore',
    label: 'Oil Offshore',
    region: 'Singapore',
    blurb: 'Systems for offshore and marine work at height.',
    projects: [],
  },
  {
    id: 'schools',
    label: 'Schools',
    region: 'Singapore',
    blurb: 'Safe roof and facade maintenance access for campuses.',
    projects: [],
  },
  {
    id: 'condominium-hotel',
    label: 'Condominium / Hotel',
    region: 'Singapore',
    blurb: 'Facade, roof and rope access solutions for residences and hotels.',
    projects: [],
  },
  {
    id: 'shopping-center-offices',
    label: 'Shopping Center / Offices',
    region: 'Singapore',
    blurb: 'Building maintenance and roof safety for commercial towers.',
    projects: [],
  },
  {
    id: 'international',
    label: 'International',
    region: 'International',
    blurb: 'Installations for airports, exhibition centres and hotels abroad.',
    projects: [],
    sites: [
      {
        name: 'Abu Dhabi',
        images: [
          '2018/07/IMG_1842.jpg',
          '2018/07/085.jpg',
          '2018/07/IMG_1999.jpg',
        ].map(up),
      },
      { name: 'Oman', images: ['2018/09/DB1.png', '2018/09/DB2.png'].map(up) },
      { name: 'Dubai', images: ['2018/09/AL111.png'].map(up) },
      {
        name: 'Maldives',
        images: [
          '2018/09/MAL2.png',
          '2018/07/20171114_093835.jpg',
          '2018/07/20171114_093834.jpg',
          '2018/07/20171109_090558.jpg',
          '2018/07/20171110_151818.jpg',
        ].map(up),
      },
      {
        name: 'Philippines',
        images: [
          '2018/09/PH2.png',
          '2018/09/PH3.png',
          '2018/09/PH4.png',
          '2018/07/total-life-line-manila-033.jpg',
          '2018/09/PH5.png',
          '2018/09/PH6.png',
        ].map(up),
      },
      { name: 'Thailand', images: ['2018/09/TH2.png'].map(up) },
      {
        name: 'Indonesia',
        images: [
          '2018/09/IND2.png',
          '2018/09/IND3.png',
          '2018/09/IND1.png',
        ].map(up),
      },
      {
        name: 'Vietnam',
        images: [
          '2018/09/VT3.png',
          '2018/09/VT1.png',
          '2018/09/VT4.png',
          '2018/09/VT5.png',
        ].map(up),
      },
      {
        name: 'Malaysia',
        images: [
          '2018/09/ML3.png',
          '2018/09/ML6.png',
          '2018/09/ML5.png',
          '2018/09/ML4.png',
          '2018/09/ML2.png',
          '2018/09/ML1.png',
        ].map(up),
      },
    ],
  },
];

export const landmarks: { place: string; items: string[] }[] = [
  {
    place: 'In Singapore',
    items: ['Gardens by the Bay', 'Marina Bay Sands', 'Resorts World Sentosa'],
  },
  {
    place: 'Worldwide',
    items: [
      'Al Maktoum International Airport, Dubai',
      'Abu Dhabi Exposition Centre',
      'Okada Hotel, Manila',
    ],
  },
];

export const slugify = (n: string) =>
  n
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const sectorHref = (s: Sector) =>
  s.region === 'International'
    ? '/projects/international'
    : `/projects/singapore-projects/${s.id}`;

export const singaporeSectors = sectors.filter((s) => s.region === 'Singapore');

export const allProjectSlugs: string[][] = [
  ['singapore-projects'],
  ...singaporeSectors.map((s) => ['singapore-projects', s.id]),
  ['international'],
];
