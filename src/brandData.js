// Product descriptions and photography from the owner's public storefront.
// Snapshot: 2026-10-03. Publication dates are not presented as release dates.
export const BRAND_SOURCE = 'https://nep2une.shop';
const photo = name => `/assets/nep/current/${name}.webp`;
export const BRAND_PRODUCTS = [
  { id: 'nds-sweats-02-gray', name: 'SWEATS 02', color: 'Gray / white star', category: 'Bottoms', series: 'NDS', image: photo('sweats-02-gray-0'), detail: photo('sweats-02-gray-1'), description: 'French terry cotton. Detachable stars, two attachment points, and a triple-pocket detail.' },
  { id: 'nds-sweats-02-black', name: 'SWEATS 02', color: 'Black / cream star', category: 'Bottoms', series: 'NDS', image: photo('sweats-02-black-0'), detail: photo('sweats-02-black-1'), description: 'French terry cotton with detachable stars and the same triple-pocket construction.' },
  { id: 'nds-exp-04-bl-vessel', name: 'VESSEL', color: 'Black / red star', category: 'Tops', series: 'EXP 04', image: photo('exp-04-bl-vessel-0'), detail: photo('exp-04-bl-vessel-3'), description: '400 GSM French terry cotton. Boxy, cropped fit and a detachable red star.' },
  { id: 'nds-exp-04-wh-vessel', name: 'VESSEL', color: 'White / blue star', category: 'Tops', series: 'EXP 04', image: photo('exp-04-wh-vessel-0'), detail: photo('exp-04-wh-vessel-2'), description: '240 GSM French terry cotton. Boxy, cropped fit and a detachable blue star.' },
  { id: 'nds-exp-03-belt-pants', name: 'BELT PANTS', color: 'Cream / red hardware', category: 'Bottoms', series: 'EXP 03', image: photo('exp-03-belt-pants-0'), detail: photo('exp-03-belt-pants-2'), description: 'Cream duck canvas with a built-in belt and red hardware.' },
  { id: 'nds-exp-02-canvas-jacket-navy', name: 'CANVAS JACKET', color: 'Navy', category: 'Outerwear', series: 'EXP 02', image: photo('exp-02-canvas-jacket-navy-0'), detail: photo('exp-02-canvas-jacket-navy-1'), description: '100% duck canvas, screen-printed front, and a full lace back. Cut and sewn for a cropped, boxy fit.' },
  { id: 'nds-exp-02-canvas-lace-jacket-black', name: 'CANVAS JACKET', color: 'Black', category: 'Outerwear', series: 'EXP 02', image: photo('exp-02-canvas-lace-jacket-black-0'), detail: photo('exp-02-canvas-lace-jacket-black-1'), description: 'A cropped duck-canvas jacket with a screen-printed front and full lace back.' },
  { id: 'nds-sweats-01-v2', name: 'SWEATS 01 V2', color: 'Heather gray', category: 'Bottoms', series: 'NDS', image: photo('sweats-01-v2-1'), detail: photo('sweats-01-v2-0'), description: '400 GSM French terry with star pockets, a belt loop for keys, and a wide leg opening.' },
];
export const BRAND_CHAPTERS = [{ id: 'overview', label: 'The story' }, { id: 'garments', label: 'Garments' }, { id: 'lookbook', label: 'Lookbook' }, { id: 'process', label: 'The process' }, { id: 'next-shoot', label: 'Next chapter' }];
export const PHOTO_SLOTS = [
  { id: 'campaign-01', title: 'The world around the clothes', note: 'Next campaign · wide establishing shot' },
  { id: 'campaign-02', title: 'The complete look', note: 'Next campaign · full outfit portrait' },
  { id: 'campaign-03', title: 'A detail worth keeping', note: 'Next campaign · material or construction detail' },
  { id: 'campaign-04', title: 'Between the takes', note: 'Next campaign · a candid moment' },
];
