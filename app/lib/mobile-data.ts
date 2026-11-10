import type { SrlGroup } from '@/app/lib/srl-data';

/* ------------------------------------------------------------------
   MOBILE FALL PROTECTION CATALOGUE - the one place to edit.

   TO ADD A MODEL: copy one block and change the content. Then add the
   photo named after the id:  public/products/mobile/<id>.jpg
   If the photo is missing a placeholder shows, the page still works.

   NOTE: specs below are general placeholders. Please replace them with
   the real Alsipercha model names and figures before going live.
------------------------------------------------------------------- */
export const mobileGroups: SrlGroup[] = [
  {
    key: 'tripod',
    label: 'Alsipercha (Tripod)',
    note: 'Free-standing tripod anchorage, set up anywhere in minutes.',
    items: [
      {
        id: 'alsipercha-tripod',
        length: 'Tripod',
        model: 'Alsipercha Tripod',
        title: 'Alsipercha Tripod Mobile Anchorage',
        specs: [
          'Portable anchorage',
          'No permanent fixing',
          'Quick to set up and move',
          'Suits openings, shafts and flat roofs',
        ],
      },
    ],
  },
  {
    key: 'counterweight',
    label: 'Alsipercha (Counterweight)',
    note: 'Weighted base that holds the anchor without drilling the roof.',
    items: [
      {
        id: 'alsipercha-counterweight',
        length: 'Counterweight',
        model: 'Alsipercha Counterweight',
        title: 'Alsipercha Counterweight Mobile Anchorage',
        specs: [
          'Portable anchorage',
          'No drilling or fixing to roof',
          'Weighted base for stability',
          'Suits flat roofs and terraces',
        ],
      },
    ],
  },
  {
    key: 'rail',
    label: 'Alsipercha (Rail)',
    note: 'Anchorage that travels along a rail with the worker.',
    items: [
      {
        id: 'alsipercha-rail',
        length: 'Rail',
        model: 'Alsipercha Rail',
        title: 'Alsipercha Rail Mobile Anchorage',
        specs: [
          'Moving anchorage along a rail',
          'Hands-free travel along the work area',
          'Longer working reach',
          'Suits long edges and gantries',
        ],
      },
    ],
  },
];

/* item page href -> which tab opens first */
export const mobileTabByHref: Record<string, string> = {
  '/products/mobile-fall-protection/alsipercha-tripod': 'tripod',
  '/products/mobile-fall-protection/alsipercha-counterweight': 'counterweight',
  '/products/mobile-fall-protection/alsipercha-rail': 'rail',
};

export const mobileImage = (id: string) => `/products/mobile/${id}.jpg`;
