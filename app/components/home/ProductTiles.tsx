// import Link from 'next/link';
// import type { ReactNode } from 'react';

// import { products } from '@/app/lib/nav-data';

// /* Illustrations, one per product range. Solid navy shapes with steel-grey
//    hardware and one orange accent, drawn on a 160 x 120 grid so they read
//    as one family. */
// const navy = '#0b1f45';
// const navy2 = '#14306b';
// const steel = '#c9d1de';
// const orange = '#f7861e';

// const Stitch = ({ d }: { d: string }) => (
//   <path
//     d={d}
//     stroke="#fff"
//     strokeWidth="1.6"
//     strokeDasharray="3 3"
//     opacity=".7"
//     fill="none"
//   />
// );

// const art: Record<string, ReactNode> = {
//   /* Full-body harness, front view */
//   '/products/fall-arrest-equipment': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <circle
//         cx="80"
//         cy="12"
//         r="8"
//         fill="none"
//         stroke={orange}
//         strokeWidth="5"
//       />
//       <path
//         d="M58 6 76 17M102 6 84 17"
//         stroke={navy}
//         strokeWidth="5"
//         fill="none"
//       />
//       <path d="M50 8h14l15 46H65Z" fill={navy} />
//       <path d="M110 8H96L81 54H95Z" fill={navy} />
//       <Stitch d="M57 10 71 52M103 10 89 52" />
//       <path
//         d="M65 54 59 80M95 54l6 26"
//         stroke={navy2}
//         strokeWidth="9"
//         fill="none"
//       />
//       <path
//         d="M62 56 98 80M98 56 62 80"
//         stroke={navy}
//         strokeWidth="6"
//         fill="none"
//       />
//       <rect x="54" y="38" width="52" height="9" rx="3" fill={navy2} />
//       <rect
//         x="71"
//         y="34"
//         width="18"
//         height="16"
//         rx="4"
//         fill={orange}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <rect x="50" y="78" width="60" height="11" rx="3" fill={navy2} />
//       <rect
//         x="73"
//         y="76"
//         width="14"
//         height="15"
//         rx="3"
//         fill={steel}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <ellipse
//         cx="60"
//         cy="104"
//         rx="15"
//         ry="12"
//         fill="none"
//         stroke={navy}
//         strokeWidth="9"
//       />
//       <ellipse
//         cx="100"
//         cy="104"
//         rx="15"
//         ry="12"
//         fill="none"
//         stroke={navy}
//         strokeWidth="9"
//       />
//       <rect x="51" y="88" width="18" height="10" rx="3" fill={navy2} />
//       <rect x="91" y="88" width="18" height="10" rx="3" fill={navy2} />
//     </g>
//   ),

//   /* Wheeled counterweight anchor with boom and rope */
//   '/products/mobile-fall-protection': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <rect x="22" y="92" width="92" height="10" rx="3" fill={navy} />
//       {[26, 52].map((x) => (
//         <g key={x}>
//           <rect
//             x={x}
//             y="66"
//             width="24"
//             height="26"
//             rx="3"
//             fill={steel}
//             stroke={navy}
//             strokeWidth="3"
//           />
//           <path
//             d={`M${x + 4} 76h16M${x + 4} 84h16`}
//             stroke={navy}
//             strokeWidth="2"
//           />
//         </g>
//       ))}
//       <rect x="86" y="22" width="11" height="70" rx="2" fill={navy} />
//       <path d="M91 27H138" stroke={navy} strokeWidth="9" />
//       <path d="M91 27 78 44" stroke={navy2} strokeWidth="5" />
//       <circle
//         cx="138"
//         cy="40"
//         r="9"
//         fill="#fff"
//         stroke={orange}
//         strokeWidth="5"
//       />
//       <path d="M138 49V86" stroke={orange} strokeWidth="3.5" />
//       <rect x="130" y="86" width="16" height="9" rx="3" fill={orange} />
//       <circle cx="40" cy="108" r="9" fill={navy} />
//       <circle cx="40" cy="108" r="3" fill={steel} />
//       <circle cx="96" cy="108" r="9" fill={navy} />
//       <circle cx="96" cy="108" r="3" fill={steel} />
//     </g>
//   ),

//   /* Worker clipped to a fixed anchor beam */
//   '/products/permanent-anchorage-system': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <rect
//         x="18"
//         y="10"
//         width="124"
//         height="12"
//         rx="2"
//         fill={steel}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <path
//         d="M30 16h100"
//         stroke={navy}
//         strokeWidth="2"
//         strokeDasharray="6 5"
//       />
//       <rect
//         x="94"
//         y="22"
//         width="18"
//         height="10"
//         rx="2"
//         fill={orange}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <circle
//         cx="103"
//         cy="42"
//         r="8"
//         fill="none"
//         stroke={orange}
//         strokeWidth="5"
//       />
//       <path
//         d="M103 50v14q0 20-18 24"
//         fill="none"
//         stroke={orange}
//         strokeWidth="4"
//       />
//       <path d="M52 94 46 104M108 94l6 10" stroke="none" />
//       <rect x="54" y="68" width="40" height="34" rx="12" fill={navy} />
//       <path
//         d="M62 72 86 98M86 72 62 98"
//         stroke="#fff"
//         strokeWidth="3"
//         opacity=".8"
//       />
//       <rect x="66" y="82" width="16" height="8" rx="2" fill={orange} />
//       <path d="M58 76 44 96" stroke={navy} strokeWidth="11" />
//       <path d="M90 76 98 52" stroke={navy} strokeWidth="11" />
//       <circle cx="74" cy="52" r="12" fill={navy} />
//       <path d="M61 52a13 13 0 0 1 26 0Z" fill={orange} />
//       <rect x="58" y="49" width="32" height="4" rx="2" fill={orange} />
//       <rect x="58" y="100" width="12" height="16" rx="4" fill={navy2} />
//       <rect x="78" y="100" width="12" height="16" rx="4" fill={navy2} />
//     </g>
//   ),

//   /* Roof clamp on a standing-seam roof */
//   '/products/clamps': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <path
//         d="M8 108 42 70H152L118 108Z"
//         fill={steel}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <path
//         d="M30 108 64 70M56 108 90 70M82 108 116 70M108 108 142 70"
//         stroke={navy}
//         strokeWidth="2.5"
//         opacity=".55"
//       />
//       <rect x="62" y="74" width="48" height="26" rx="4" fill={navy} />
//       <rect x="100" y="64" width="14" height="40" rx="3" fill={navy2} />
//       <rect x="68" y="80" width="20" height="14" rx="2" fill={steel} />
//       <rect
//         x="82"
//         y="32"
//         width="9"
//         height="42"
//         fill={steel}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <rect x="76" y="22" width="21" height="12" rx="3" fill={navy} />
//       <circle
//         cx="86"
//         cy="12"
//         r="9"
//         fill="none"
//         stroke={orange}
//         strokeWidth="5"
//       />
//     </g>
//   ),

//   /* Safety tripod with winch and rope */
//   '/products/rescue-winch': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <path
//         d="M72 28 38 108M88 28l34 80"
//         stroke={navy}
//         strokeWidth="9"
//         fill="none"
//       />
//       <path d="M80 28v74" stroke={navy2} strokeWidth="6" />
//       <path
//         d="M50 78H110"
//         stroke={navy2}
//         strokeWidth="3"
//         strokeDasharray="1 5"
//       />
//       <rect x="28" y="106" width="22" height="7" rx="3" fill={navy} />
//       <rect x="110" y="106" width="22" height="7" rx="3" fill={navy} />
//       <rect x="68" y="102" width="24" height="7" rx="3" fill={navy} />
//       <rect x="60" y="8" width="40" height="22" rx="5" fill={navy} />
//       <circle
//         cx="80"
//         cy="19"
//         r="6"
//         fill={steel}
//         stroke={orange}
//         strokeWidth="3"
//       />
//       <rect
//         x="44"
//         y="52"
//         width="26"
//         height="20"
//         rx="4"
//         fill={orange}
//         stroke={navy}
//         strokeWidth="3"
//       />
//       <path d="M44 62H34V50" stroke={navy} strokeWidth="4" fill="none" />
//       <path d="M80 28V84" stroke={orange} strokeWidth="3.5" />
//       <circle
//         cx="80"
//         cy="91"
//         r="7"
//         fill="none"
//         stroke={orange}
//         strokeWidth="4"
//       />
//     </g>
//   ),

//   /* Add-on kit: equipment bag, rope coil, carabiner */
//   '/products/other-equipment': (
//     <g strokeLinejoin="round" strokeLinecap="round">
//       <path
//         d="M44 48q0-26 24-26t24 26"
//         fill="none"
//         stroke={navy}
//         strokeWidth="7"
//       />
//       <rect x="22" y="46" width="94" height="58" rx="14" fill={navy} />
//       <path
//         d="M22 66h94"
//         stroke="#fff"
//         strokeWidth="2"
//         strokeDasharray="4 4"
//         opacity=".7"
//       />
//       <rect x="48" y="76" width="42" height="20" rx="5" fill={orange} />
//       <path d="M62 86h14" stroke={navy} strokeWidth="3" />
//       <path
//         d="M120 56h10a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V70"
//         fill="none"
//         stroke={steel}
//         strokeWidth="8"
//       />
//       <path
//         d="M120 56h10a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V70"
//         fill="none"
//         stroke={navy}
//         strokeWidth="2.5"
//       />
//     </g>
//   ),
// };

// export default function ProductTiles() {
//   return (
//     <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//       {products.map((g) => (
//         <li key={g.href}>
//           <Link
//             href={g.href}
//             className="border-line hover:border-brand group focus-visible:outline-navy flex h-full flex-col overflow-hidden rounded-3xl border bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,31,69,.12)] focus-visible:outline-2 focus-visible:outline-offset-2"
//           >
//             <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#fdf3e6]">
//               <span
//                 className="absolute mt-5 size-48 rounded-full bg-[#ffe6c4] transition-transform duration-500 group-hover:scale-110"
//                 aria-hidden
//               />
//               <svg
//                 viewBox="0 0 160 120"
//                 className="relative mt-5 h-36 w-auto drop-shadow-[0_8px_10px_rgba(11,31,69,.18)] transition-transform duration-300 group-hover:-translate-y-1"
//                 aria-hidden
//               >
//                 {art[g.href]}
//               </svg>
//               <span className="text-navy absolute top-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-bold shadow-sm">
//                 {g.children.length} products
//               </span>
//             </div>
//             <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
//               <h3 className="text-navy text-xl font-bold">{g.label}</h3>
//               <ul className="text-mute mt-3 space-y-1 text-[15px]">
//                 {g.children.slice(0, 3).map((c) => (
//                   <li key={c.href} className="truncate">
//                     {c.label}
//                   </li>
//                 ))}
//               </ul>
//               <span className="text-brand-dark mt-auto pt-5 text-sm font-bold">
//                 View range →
//               </span>
//             </div>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   );
// }
'use client';

import Link from 'next/link';
import { useState, type ReactNode } from 'react';

import { products } from '@/app/lib/nav-data';

/* Illustrations, one per product range. Solid navy shapes with steel-grey
   hardware and one orange accent, drawn on a 160 x 120 grid so they read
   as one family. */
const navy = '#0b1f45';
const navy2 = '#14306b';
const steel = '#c9d1de';
const orange = '#f7861e';

const Stitch = ({ d }: { d: string }) => (
  <path
    d={d}
    stroke="#fff"
    strokeWidth="1.6"
    strokeDasharray="3 3"
    opacity=".7"
    fill="none"
  />
);

const art: Record<string, ReactNode> = {
  /* Full-body harness, front view */
  '/products/fall-arrest-equipment': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle
        cx="80"
        cy="12"
        r="8"
        fill="none"
        stroke={orange}
        strokeWidth="5"
      />
      <path
        d="M58 6 76 17M102 6 84 17"
        stroke={navy}
        strokeWidth="5"
        fill="none"
      />
      <path d="M50 8h14l15 46H65Z" fill={navy} />
      <path d="M110 8H96L81 54H95Z" fill={navy} />
      <Stitch d="M57 10 71 52M103 10 89 52" />
      <path
        d="M65 54 59 80M95 54l6 26"
        stroke={navy2}
        strokeWidth="9"
        fill="none"
      />
      <path
        d="M62 56 98 80M98 56 62 80"
        stroke={navy}
        strokeWidth="6"
        fill="none"
      />
      <rect x="54" y="38" width="52" height="9" rx="3" fill={navy2} />
      <rect
        x="71"
        y="34"
        width="18"
        height="16"
        rx="4"
        fill={orange}
        stroke={navy}
        strokeWidth="3"
      />
      <rect x="50" y="78" width="60" height="11" rx="3" fill={navy2} />
      <rect
        x="73"
        y="76"
        width="14"
        height="15"
        rx="3"
        fill={steel}
        stroke={navy}
        strokeWidth="3"
      />
      <ellipse
        cx="60"
        cy="104"
        rx="15"
        ry="12"
        fill="none"
        stroke={navy}
        strokeWidth="9"
      />
      <ellipse
        cx="100"
        cy="104"
        rx="15"
        ry="12"
        fill="none"
        stroke={navy}
        strokeWidth="9"
      />
      <rect x="51" y="88" width="18" height="10" rx="3" fill={navy2} />
      <rect x="91" y="88" width="18" height="10" rx="3" fill={navy2} />
    </g>
  ),

  /* Wheeled counterweight anchor with boom and rope */
  '/products/mobile-fall-protection': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x="22" y="92" width="92" height="10" rx="3" fill={navy} />
      {[26, 52].map((x) => (
        <g key={x}>
          <rect
            x={x}
            y="66"
            width="24"
            height="26"
            rx="3"
            fill={steel}
            stroke={navy}
            strokeWidth="3"
          />
          <path
            d={`M${x + 4} 76h16M${x + 4} 84h16`}
            stroke={navy}
            strokeWidth="2"
          />
        </g>
      ))}
      <rect x="86" y="22" width="11" height="70" rx="2" fill={navy} />
      <path d="M91 27H138" stroke={navy} strokeWidth="9" />
      <path d="M91 27 78 44" stroke={navy2} strokeWidth="5" />
      <circle
        cx="138"
        cy="40"
        r="9"
        fill="#fff"
        stroke={orange}
        strokeWidth="5"
      />
      <path d="M138 49V86" stroke={orange} strokeWidth="3.5" />
      <rect x="130" y="86" width="16" height="9" rx="3" fill={orange} />
      <circle cx="40" cy="108" r="9" fill={navy} />
      <circle cx="40" cy="108" r="3" fill={steel} />
      <circle cx="96" cy="108" r="9" fill={navy} />
      <circle cx="96" cy="108" r="3" fill={steel} />
    </g>
  ),

  /* Worker clipped to a fixed anchor beam */
  '/products/permanent-anchorage-system': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect
        x="18"
        y="10"
        width="124"
        height="12"
        rx="2"
        fill={steel}
        stroke={navy}
        strokeWidth="3"
      />
      <path
        d="M30 16h100"
        stroke={navy}
        strokeWidth="2"
        strokeDasharray="6 5"
      />
      <rect
        x="94"
        y="22"
        width="18"
        height="10"
        rx="2"
        fill={orange}
        stroke={navy}
        strokeWidth="3"
      />
      <circle
        cx="103"
        cy="42"
        r="8"
        fill="none"
        stroke={orange}
        strokeWidth="5"
      />
      <path
        d="M103 50v14q0 20-18 24"
        fill="none"
        stroke={orange}
        strokeWidth="4"
      />
      <path d="M52 94 46 104M108 94l6 10" stroke="none" />
      <rect x="54" y="68" width="40" height="34" rx="12" fill={navy} />
      <path
        d="M62 72 86 98M86 72 62 98"
        stroke="#fff"
        strokeWidth="3"
        opacity=".8"
      />
      <rect x="66" y="82" width="16" height="8" rx="2" fill={orange} />
      <path d="M58 76 44 96" stroke={navy} strokeWidth="11" />
      <path d="M90 76 98 52" stroke={navy} strokeWidth="11" />
      <circle cx="74" cy="52" r="12" fill={navy} />
      <path d="M61 52a13 13 0 0 1 26 0Z" fill={orange} />
      <rect x="58" y="49" width="32" height="4" rx="2" fill={orange} />
      <rect x="58" y="100" width="12" height="16" rx="4" fill={navy2} />
      <rect x="78" y="100" width="12" height="16" rx="4" fill={navy2} />
    </g>
  ),

  /* Roof clamp on a standing-seam roof */
  '/products/clamps': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M8 108 42 70H152L118 108Z"
        fill={steel}
        stroke={navy}
        strokeWidth="3"
      />
      <path
        d="M30 108 64 70M56 108 90 70M82 108 116 70M108 108 142 70"
        stroke={navy}
        strokeWidth="2.5"
        opacity=".55"
      />
      <rect x="62" y="74" width="48" height="26" rx="4" fill={navy} />
      <rect x="100" y="64" width="14" height="40" rx="3" fill={navy2} />
      <rect x="68" y="80" width="20" height="14" rx="2" fill={steel} />
      <rect
        x="82"
        y="32"
        width="9"
        height="42"
        fill={steel}
        stroke={navy}
        strokeWidth="3"
      />
      <rect x="76" y="22" width="21" height="12" rx="3" fill={navy} />
      <circle
        cx="86"
        cy="12"
        r="9"
        fill="none"
        stroke={orange}
        strokeWidth="5"
      />
    </g>
  ),

  /* Safety tripod with winch and rope */
  '/products/rescue-winch': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M72 28 38 108M88 28l34 80"
        stroke={navy}
        strokeWidth="9"
        fill="none"
      />
      <path d="M80 28v74" stroke={navy2} strokeWidth="6" />
      <path
        d="M50 78H110"
        stroke={navy2}
        strokeWidth="3"
        strokeDasharray="1 5"
      />
      <rect x="28" y="106" width="22" height="7" rx="3" fill={navy} />
      <rect x="110" y="106" width="22" height="7" rx="3" fill={navy} />
      <rect x="68" y="102" width="24" height="7" rx="3" fill={navy} />
      <rect x="60" y="8" width="40" height="22" rx="5" fill={navy} />
      <circle
        cx="80"
        cy="19"
        r="6"
        fill={steel}
        stroke={orange}
        strokeWidth="3"
      />
      <rect
        x="44"
        y="52"
        width="26"
        height="20"
        rx="4"
        fill={orange}
        stroke={navy}
        strokeWidth="3"
      />
      <path d="M44 62H34V50" stroke={navy} strokeWidth="4" fill="none" />
      <path d="M80 28V84" stroke={orange} strokeWidth="3.5" />
      <circle
        cx="80"
        cy="91"
        r="7"
        fill="none"
        stroke={orange}
        strokeWidth="4"
      />
    </g>
  ),

  /* Add-on kit: equipment bag, rope coil, carabiner */
  '/products/other-equipment': (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M44 48q0-26 24-26t24 26"
        fill="none"
        stroke={navy}
        strokeWidth="7"
      />
      <rect x="22" y="46" width="94" height="58" rx="14" fill={navy} />
      <path
        d="M22 66h94"
        stroke="#fff"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity=".7"
      />
      <rect x="48" y="76" width="42" height="20" rx="5" fill={orange} />
      <path d="M62 86h14" stroke={navy} strokeWidth="3" />
      <path
        d="M120 56h10a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V70"
        fill="none"
        stroke={steel}
        strokeWidth="8"
      />
      <path
        d="M120 56h10a8 8 0 0 1 8 8v34a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8V70"
        fill="none"
        stroke={navy}
        strokeWidth="2.5"
      />
    </g>
  ),
};

/* Products showcase: a numbered list of ranges on the left,
   and a large detail panel on the right that changes when you hover or tap
   a range. On phones the list becomes a scrollable row of tabs. */
export default function ProductTiles() {
  const [active, setActive] = useState(0);
  const g = products[active];

  return (
    <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,4.6fr)_minmax(0,7.4fr)] lg:gap-8">
      <ul
        role="tablist"
        aria-label="Product ranges"
        className="-mx-[22px] flex gap-2 overflow-x-auto px-[22px] pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {products.map((p, n) => {
          const on = n === active;
          return (
            <li key={p.href} className="shrink-0 lg:shrink">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(n)}
                onMouseEnter={() => setActive(n)}
                onFocus={() => setActive(n)}
                className={`group flex w-full items-center gap-4 rounded-full border px-5 py-3 text-left whitespace-nowrap transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-[#e3e7ee] lg:bg-transparent lg:px-2 lg:py-5 lg:whitespace-normal ${
                  on
                    ? 'border-brand bg-brand text-white'
                    : 'text-navy/70 hover:text-navy border-[#d9dfeb]'
                }`}
              >
                <span
                  className={`hidden w-8 text-sm font-bold lg:block ${on ? 'text-brand-dark' : 'text-navy/30'}`}
                >
                  {String(n + 1).padStart(2, '0')}
                </span>
                <span
                  className={`flex-1 text-[15px] font-bold transition-transform lg:text-[clamp(18px,1.8vw,24px)] ${on ? 'lg:text-navy lg:translate-x-1' : 'lg:text-navy/70'}`}
                >
                  {p.label}
                </span>
                <span
                  aria-hidden
                  className={`hidden text-xl transition lg:block ${on ? 'text-brand-dark translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
                >
                  →
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        key={g.href}
        role="tabpanel"
        className="pt-in grid items-center gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#14306b] to-[#0e2757] p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:p-10"
      >
        <div className="relative flex aspect-square max-h-[340px] items-center justify-center justify-self-center md:w-full">
          <span
            aria-hidden
            className="pt-pop absolute inset-[6%] rounded-full bg-[#ffe6c4]"
          />
          <svg
            viewBox="0 0 160 120"
            className="pt-art relative w-[88%] drop-shadow-[0_14px_16px_rgba(11,31,69,.3)]"
            aria-hidden
          >
            {art[g.href]}
          </svg>
        </div>

        <div className="text-white">
          <p className="text-brand text-xs font-bold tracking-[0.2em] uppercase">
            {g.children.length} products
          </p>
          <h3 className="mt-2 text-[clamp(24px,2.6vw,34px)] leading-tight font-extrabold">
            {g.label}
          </h3>
          <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {g.children.slice(0, 6).map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="hover:text-brand flex items-center justify-between gap-3 py-3 text-[15px] text-white/85 transition-colors"
                >
                  <span>{c.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={g.href}
            className="bg-brand hover:bg-brand-dark mt-6 inline-block rounded-full px-7 py-3 text-[15px] font-bold text-white transition-colors"
          >
            View full range
          </Link>
        </div>
      </div>
    </div>
  );
}
