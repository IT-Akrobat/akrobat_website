import type { SrlGroup } from '@/app/lib/srl-data';

/* ------------------------------------------------------------------
   TEMPORARY LIFELINE & FALL ARRESTER CATALOGUE - the one place to edit.

   Model names come from akrobat.com.sg. Only details visible in the
   product names are filled in; add real specs (rating, weight, EN
   standard, material) line by line in `specs` when you have them.

   TO ADD A MODEL: copy one item block and change the content. Then add
   the photo named after the id:  public/products/templifeline/<id>.jpg
   If the photo is missing a placeholder shows, the page still works.
   Add  brochure: '<pdf url>'  to show a Download brochure button.
------------------------------------------------------------------- */
export const tempLifelineGroups: SrlGroup[] = [
  {
    key: 'lifeline',
    label: 'Temporary Lifeline',
    note: 'Rigged lines for jobs where nothing permanent exists.',
    items: [
      {
        id: 'ak-sf-hl-5001',
        length: 'Horizontal',
        model: 'AK SF-HL-5001',
        title: 'Temporary Horizontal Lifeline AK SF-HL-5001',
        specs: ['Temporary horizontal lifeline', 'Supplied with carry bag'],
      },
      {
        id: 'ak-ae-300',
        length: 'Horizontal',
        model: 'AK AE 300',
        title: 'Temporary Horizontal Lifeline AK AE 300',
        specs: ['Temporary horizontal lifeline', 'Supplied with carry bag'],
      },
      {
        id: 'akc-060',
        length: '10–50 m',
        model: 'AKC 060',
        title: 'Temporary Lifeline AKC 060',
        specs: ['Temporary lifeline', 'Lengths: 10, 15, 20, 30 and 50 m'],
      },
      {
        id: 'ak-prot-3',
        length: '10 / 15 m',
        model: 'AK PROT 3',
        title: 'Work Positioning Rope AK PROT 3',
        specs: ['Work positioning rope', 'Lengths: 10 m and 15 m'],
      },
    ],
  },
  {
    key: 'arrester',
    label: 'Fall Arrester',
    note: 'Travels along the line with the worker and locks when a fall begins.',
    items: [
      {
        id: 'ac360',
        length: 'Wire rope',
        model: 'AC360',
        title: 'Fall Arrester (Wire rope) AC360',
        specs: ['Fall arrester for wire rope'],
      },
      {
        id: 'aks-2038-i',
        length: 'Nylon rope',
        model: 'AKS-2038-I',
        title: 'Fall Arrester (Nylon rope) AKS-2038-I',
        specs: ['Fall arrester for nylon rope'],
      },
    ],
  },
];

export const tempLifelineHref =
  '/products/fall-arrest-equipment/temporary-lifeline-fall-arrester';

export const tempLifelineImage = (id: string) =>
  `/products/templifeline/${id}.jpg`;
