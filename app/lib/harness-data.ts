import type { SrlGroup } from '@/app/lib/srl-data';

/* ------------------------------------------------------------------
   HARNESS CATALOGUE (Basic / Advance / Pro / Add-on) - the one place
   to edit. Content copied from akrobat.com.sg/products/fall-arrest-
   equipment/harness-basic-advance-pro/

   TO ADD A MODEL: copy one block and change the content. Then add the
   photo named after the id:  public/products/harness/<id>.jpg
   If the photo is missing a placeholder shows, the page still works.

   `length` is the big label on the card. A value like "2 Points" shows
   a big "2" with "Points" beside it. "Add-on" shows a "+".
   For those numeric cards the FIRST spec is not shown on the card
   (it repeats the big label) but it is still shown in the popup.
------------------------------------------------------------------- */
export const harnessGroups: SrlGroup[] = [
  {
    key: 'basic',
    label: 'Harness Basic',
    note: 'Full-body harnesses with leg adjustment, rated 140 kg.',
    items: [
      {
        id: 'ak-ak1',
        length: '1 Point',
        model: 'AK AK1',
        title: 'Full Body Harness w/ 1 Anchor Point',
        specs: [
          'Full body harness with 1 anchor point',
          'Back attachment',
          'Leg adjustment',
          '140 kg rated',
          'Device weight 1.05 kg',
          'EN 361:2002',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2024/01/AK-AK1-Catalogue.pdf',
      },
      {
        id: 'ak-ak2',
        length: '2 Points',
        model: 'AK AK2',
        title: 'Full Body Harness w/ 2 Anchor Points',
        specs: [
          'Full body harness with 2 anchor points',
          'Metal front & back attachment',
          'Leg adjustment',
          '140 kg rated',
          'Device weight 1.05 kg',
          'EN 361:2002',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2024/01/AK-AK2-Catalogue.pdf',
      },
    ],
  },
  {
    key: 'advance',
    label: 'Harness Advance',
    note: 'Lightweight alloy harness with padded leg loops and automatic locking.',
    items: [
      {
        id: 'ak-vito',
        length: '2 Points',
        model: 'AK VITO (’67)',
        title: 'Harness w/ 2 Attachment Points',
        specs: [
          'Harness with 2 attachment points',
          'Back and front automatic locking',
          'Light alloy components',
          'Padded leg loops reduce strangulation risk during a fall',
          'Without back pad',
          'Comfortable, safe and lightweight',
          'Easy to put on at any body size with automatic locking',
          'Sizes S/M–L',
          'EN 361',
          'Made in France',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2019/12/AKVITO.pdf',
      },
    ],
  },
  {
    key: 'pro',
    label: 'Harness Pro',
    note: 'Suspension harnesses with 5 points and a work positioning belt.',
    items: [
      {
        id: 'ak-p-71',
        length: '5 Points',
        model: 'AK P-71',
        title: 'Suspension Harness With 5 Points',
        specs: [
          'Suspension harness with 5 points',
          'Front and dorsal anchorage point',
          'Attaching point for sitting position',
          'Work positioning belt',
          'Aluminium buckle',
          'Size M/XL',
          'CE product',
          'EN 361, 358, 813',
          'Made in Europe',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2018/11/AK-P71.pdf',
      },
      {
        id: 'ak-alto',
        length: '5 Points',
        model: 'AK ALTO',
        title: 'Suspension Harness With 5 Points',
        specs: [
          'Suspension harness with 5 points',
          'Front and dorsal anchorage point',
          'Attaching point for sitting position',
          'Work positioning belt',
          'Aluminium buckle',
          'Sizes S, M–L · 2050 g',
          'EN 361, 358, 813',
          'Made in Europe',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2018/11/AK-ALTO.pdf',
      },
    ],
  },
  {
    key: 'addon',
    label: 'Add-on (Accessories)',
    note: 'Accessories that add comfort and safety to any harness.',
    items: [
      {
        id: 'akha-203',
        length: 'Add-on',
        model: 'AKHA 203',
        title: 'Trauma Strap AKHA 203',
        specs: [
          'Pair of femoral anti-compression straps',
          'Keeps blood flowing in the legs after a fall, while waiting for help',
          'Adjustable to any harness, fitted on the side straps',
          'Easy and quick to fit',
          'Carrying case',
          'Polyamide · 0.3 kg',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2018/11/AKHA203.pdf',
      },
      {
        id: 'ak-sf-pc-1004',
        length: 'Add-on',
        model: 'AK SF-PC-1004',
        title: 'Easy Seat Pilot Chair AK SF-PC-1004',
        specs: [
          'Easy seat pilot chair',
          'Wide sitting area for stability, comfortable hanging or standing work',
          'Suspension straps do not press on your thighs',
          'Three D-rings for vessel or other gear suspension',
          'Breaking strength 23 kN',
          'Weight 1865 g',
        ],
        brochure:
          'https://akrobat.com.sg/wordpress/wp-content/uploads/2022/11/AK-SF-PC-1004-Catalogue.pdf',
      },
    ],
  },
];

export const harnessHref =
  '/products/fall-arrest-equipment/harness-basic-advance-pro';

/* file locations, always derived from the id */
export const harnessImage = (id: string) => `/products/harness/${id}.jpg`;
