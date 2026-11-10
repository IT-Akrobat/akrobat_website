/* ------------------------------------------------------------------
   SELF-RETRACTING LIFELINE (SRL) CATALOGUE  -  the one place to edit.

   TO ADD A MODEL: copy one block below and change only the content
   (id, length, model, title, specs). Then add the photo named after
   the id:  public/products/srl/<id>.jpg
   If the file is missing the page still works: a placeholder shows.
------------------------------------------------------------------- */

export type SrlModel = {
  id: string; // also the image file name (without extension)
  length: string; // shown big, e.g. "20 m"
  model: string; // e.g. "AK CR30"
  title: string; // card heading
  specs: string[]; // short list shown on the rail card
};

export type SrlGroup = {
  key: string;
  label: string;
  note?: string;
  items: SrlModel[];
};

export const srlGroups: SrlGroup[] = [
  {
    key: 'wire',
    label: 'SRL Wire',
    note: 'Galvanized steel wire rope, from 3 m to 30 m.',
    items: [
      {
        id: 'ak-cr30',
        length: '3 m',
        model: 'AK CR30',
        title: 'Self-Retracting Lifeline AK CR30',
        specs: [
          '140 kg rated',
          'Built-in fall indicator',
          '3 m length',
          'Ø 4 mm galvanized steel',
          'Device weight 1.75 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfae-10',
        length: '10 m',
        model: 'AK SF-RFAE-10',
        title: 'Self-Retracting Lifeline AK SF-RFAE-10',
        specs: [
          '10 m galvanized steel Ø 4.8 mm',
          'Horizontal & vertical use',
          'Weight 4.56 kg',
          'Max loading 100 kg',
          'EN 360:2002',
          'VG 11 RFU # 11.060',
        ],
      },
      {
        id: 'ak-sf-rfa-30',
        length: '30 m',
        model: 'AK SF-RFA-30',
        title: 'Self-Retracting Lifeline AK SF-RFA-30',
        specs: [
          '30 m galvanized steel Ø 4.5 mm',
          'Vertical use',
          'Weight 12.68 kg',
          'Max loading 100 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfa-25',
        length: '25 m',
        model: 'AK SF-RFA-25',
        title: 'Self-Retracting Lifeline AK SF-RFA-25',
        specs: [
          '25 m galvanized steel Ø 4.5 mm',
          'Vertical use',
          'Weight 12.1 kg',
          'Max loading 100 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfa-20',
        length: '20 m',
        model: 'AK SF-RFA-20',
        title: 'Self-Retracting Lifeline AK SF-RFA-20',
        specs: [
          '20 m galvanized steel Ø 4.5 mm',
          'Vertical use',
          'Weight 7.16 kg',
          'Max loading 140 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfa-15',
        length: '15 m',
        model: 'AK SF-RFA-15',
        title: 'Self-Retracting Lifeline AK SF-RFA-15',
        specs: [
          '15 m galvanized steel Ø 4.5 mm',
          'Vertical use',
          'Weight 6.80 kg',
          'Max loading 140 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfa-10',
        length: '10 m',
        model: 'AK SF-RFA-10',
        title: 'Self-Retracting Lifeline AK SF-RFA-10',
        specs: [
          '10 m galvanized steel Ø 4.5 mm',
          'Vertical use',
          'Weight 4.28 kg',
          'Max loading 140 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-cr-250v-15',
        length: '15 m',
        model: 'AK CR 250V 15',
        title: 'Self-Retracting Lifeline AK CR 250V 15',
        specs: [
          '15 m galvanized steel Ø 4 mm',
          'Vertical use',
          'Weight 4.90 kg',
          'Max loading 140 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-cr-300-20',
        length: '20 m',
        model: 'AK CR 300 20',
        title: 'Self-Retracting Lifeline AK CR 300 20',
        specs: [
          '20 m galvanized steel wire rope Ø 4 mm',
          'Plastic casing with fall indicator',
          'Weight 11.25 kg',
          'Max loading 140 kg',
          'EN 360:2002',
          'Made in Europe',
        ],
      },
    ],
  },
  {
    key: 'webbing',
    label: 'SRL Webbing',
    note: 'Lightweight UHMPE webbing, from 2 m to 6 m.',
    items: [
      {
        id: 'ak-sf-rfae-6w',
        length: '6 m',
        model: 'AK SF-RFAE-6W',
        title: 'Self-Retracting Lifeline AK SF-RFAE-6W',
        specs: [
          '6 m UHMPE webbing Ø 24 mm',
          'Horizontal & vertical use',
          'Weight 3.56 kg',
          'Max loading 100 kg',
          'EN 360:2002',
          'VG 11 RFU # 11.060',
        ],
      },
      {
        id: 'ak-sf-rfa-6w',
        length: '6 m',
        model: 'AK SF-RFA-6W',
        title: 'Self-Retracting Lifeline AK SF-RFA-6W',
        specs: [
          '6 m UHMPE webbing Ø 24 mm',
          'Vertical use',
          'Weight 3.28 kg',
          'Max loading 100 kg',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-sf-rfae-3-5w',
        length: '3.5 m',
        model: 'AK SF-RFAE-3.5W',
        title: 'Self-Retracting Lifeline AK SF-RFAE-3.5W',
        specs: [
          '3.5 m UHMPE webbing Ø 24 mm',
          'Horizontal & vertical use',
          'Weight 2.10 kg',
          'Max loading 100 kg',
          'EN 360:2002',
          'VG 11 RFU # 11.060',
        ],
      },
      {
        id: 'ak-sf-rfa-2by2w',
        length: '2 m',
        model: 'AK SF-RFA-2BY2W',
        title: 'Self-Retracting Lifeline AK SF-RFA-2BY2W',
        specs: [
          '2 m UHMPE webbing Ø 24 mm',
          'Vertical use',
          'Weight 2.86 kg',
          'Max loading 100 kg',
          'Opening 60 mm',
          'EN 360:2002',
        ],
      },
      {
        id: 'ak-wr-020',
        length: '2 m',
        model: 'AK WR 20',
        title: 'Self-Retracting Lifeline AK WR 020',
        specs: [
          '2.0 m length',
          'Shock absorber',
          '1 swivel hook at bottom',
          'Weight 850 g',
          'EN 360',
          'Made in Europe',
        ],
      },
      {
        id: 'ak-wr-25',
        length: '2.4 m',
        model: 'AK WR 25',
        title: 'Self-Retracting Lifeline AK WR 25',
        specs: [
          '2.4 m length',
          'Shock absorber',
          '1 swivel hook at bottom',
          'Weight 850 g',
          'EN 360',
          'Made in Europe',
        ],
      },
    ],
  },
  {
    key: 'special',
    label: 'SRL Special',
    items: [
      {
        id: 'ak-sf-rfa-25r',
        length: '25 m',
        model: 'AK SF-RFA-25R',
        title: 'Self-Retracting Lifeline AK SF-RFA-25R',
        specs: [
          'Self-locking & rescue device',
          'Aluminium alloy housing',
          '25 m galvanized steel cable Ø 4.8 mm',
          'Weight 15.05 kg',
          'Max working load 150 kg',
          'EN 360 · EN 1496 Class B',
        ],
      },
    ],
  },
  {
    key: 'addon',
    label: 'Add-on (Accessories)',
    items: [
      {
        id: 'akos10',
        length: 'Add-on',
        model: 'AKOS10 / AKOS30',
        title: 'Self-Retracting Lifeline Cover AKOS10, 30',
        specs: [
          'SRL protector',
          'AKOS10: 500 × 335 mm (clear & non-clear)',
          'AKOS30: 500 × 390 mm (clear)',
          'Protects against extreme weather',
          'Extends the life of retractable devices',
          'Made in Europe',
        ],
      },
    ],
  },
];

export const srlHref =
  '/products/fall-arrest-equipment/self-retracting-lifeline-wire-webbing-special';

/* file locations, always derived from the id */
export const srlImage = (id: string) => `/products/srl/${id}.jpg`;
