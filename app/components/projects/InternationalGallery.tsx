'use client';

import { useState } from 'react';

type Site = { name: string; images: string[] };

function Panel({
  site,
  index,
  photoIdx,
  setPhotoIdx,
  tall,
}: {
  site: Site;
  index: number;
  photoIdx: number;
  setPhotoIdx: (i: number) => void;
  tall?: boolean;
}) {
  const idx = Math.min(photoIdx, site.images.length - 1);
  const n = site.images.length;
  return (
    <div>
      <div
        className={`bg-navy relative overflow-hidden rounded-[28px] shadow-[0_22px_50px_rgba(11,31,69,.22)] ${
          tall ? 'h-[min(74vh,680px)]' : 'aspect-[4/3]'
        }`}
      >
        {/* all photos stacked, crossfade between them */}
        {site.images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${site.name} photo ${i + 1}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
              i === idx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* caption */}
        <div className="from-navy/85 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-6 pt-24 pb-6 text-white">
          <p className="text-brand text-sm font-bold tracking-[0.2em]">
            {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-1 text-3xl leading-none font-extrabold">
            {site.name}
          </p>
        </div>

        {/* controls */}
        {n > 1 && (
          <div className="absolute right-5 bottom-5 flex items-center gap-3 text-white">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                aria-label={d < 0 ? 'Previous photo' : 'Next photo'}
                onClick={() => setPhotoIdx((idx + d + n) % n)}
                className="hover:bg-brand grid size-11 place-items-center rounded-full bg-white/20 text-xl backdrop-blur-sm transition-colors"
              >
                {d < 0 ? '‹' : '›'}
              </button>
            ))}
          </div>
        )}
      </div>

      {n > 1 && (
        <ul className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
          {site.images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setPhotoIdx(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === idx}
                className={`block h-14 w-20 overflow-hidden rounded-xl border-2 transition ${
                  i === idx
                    ? 'border-brand'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="size-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function InternationalGallery({ sites }: { sites: Site[] }) {
  const [active, setActive] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setPhotoIdx(0);
  };

  return (
    <section id="gallery" className="bg-bg scroll-mt-24">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-[22px] py-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-10 lg:py-16">
        {/* country index */}
        <ul className="flex flex-col gap-2">
          {sites.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.name}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  aria-expanded={on}
                  className={`group focus-visible:outline-brand flex w-full items-center gap-4 rounded-2xl border-l-4 px-4 py-3.5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    on
                      ? 'border-brand bg-white shadow-[0_10px_24px_rgba(11,31,69,.10)]'
                      : 'hover:bg-navy/5 border-transparent'
                  }`}
                >
                  <span
                    className={`w-7 text-xs font-bold tracking-[0.15em] ${
                      on ? 'text-brand' : 'text-mute'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`flex-1 text-[clamp(20px,2vw,26px)] leading-tight font-extrabold tracking-tight ${
                      on ? 'text-navy' : 'text-navy/55'
                    }`}
                  >
                    {s.name}
                  </span>
                </button>

                {/* mobile: photos expand inline */}
                {on && (
                  <div className="px-1 pt-3 pb-4 lg:hidden">
                    <Panel
                      site={s}
                      index={i}
                      photoIdx={photoIdx}
                      setPhotoIdx={setPhotoIdx}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* desktop: big sticky preview */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Panel
              tall
              site={sites[active]}
              index={active}
              photoIdx={photoIdx}
              setPhotoIdx={setPhotoIdx}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
