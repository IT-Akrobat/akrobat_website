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
};

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
