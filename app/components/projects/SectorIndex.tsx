'use client';

import { useState } from 'react';

import type { Sector } from '@/app/lib/projects-data';

/* Picture frame for the selected sector. Placeholder until `image` is set. */
function Frame({ s }: { s: Sector }) {
  return (
    <div className="bg-navy relative aspect-[4/3] overflow-hidden rounded-[28px] md:aspect-[4/5]">
      {s.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={s.image} alt="" className="size-full object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Picture of ${s.label} projects to be added`}
          className="absolute inset-3 rounded-[20px] border-2 border-dashed border-white/25"
        />
      )}
      <div className="from-navy/90 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-7 pt-24 text-white">
        <p className="text-brand text-sm font-bold">{s.region}</p>
        <p className="mt-1 text-2xl leading-tight font-extrabold">{s.label}</p>
        <p className="mt-2 max-w-[340px] text-[15px] text-white/75">
          {s.blurb}
        </p>
        {s.projects.length > 0 && (
          <ul className="mt-4 space-y-1 text-[15px] font-semibold">
            {s.projects.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SectorIndex({ sectors }: { sectors: Sector[] }) {
  const [id, setId] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === id) ?? sectors[0];

  return (
    <div className="grid gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
      <ul className="border-navy border-t-2">
        {sectors.map((s) => {
          const on = s.id === id;
          return (
            <li key={s.id} className="border-line border-b">
              <button
                onClick={() => setId(s.id)}
                onMouseEnter={() => setId(s.id)}
                onFocus={() => setId(s.id)}
                aria-expanded={on}
                className={`focus-visible:outline-brand flex w-full items-baseline justify-between gap-4 py-5 text-left transition-colors focus-visible:outline-2 md:py-6 ${
                  on ? 'text-brand-dark' : 'text-navy hover:text-brand-dark'
                }`}
              >
                <span className="text-[clamp(28px,4.4vw,60px)] leading-[1.02] font-extrabold tracking-tight">
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className={`text-2xl transition-transform ${on ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
              {/* mobile: picture opens under the row */}
              {on && (
                <div className="pb-6 md:hidden">
                  <Frame s={s} />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* desktop: sticky picture */}
      <div className="hidden md:block">
        <div className="sticky top-28">
          <Frame s={current} />
        </div>
      </div>
    </div>
  );
}
