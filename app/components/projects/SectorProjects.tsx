'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { company } from '@/app/lib/nav-data';
import type { Sector } from '@/app/lib/projects-data';

const gridBg = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

/* Bento sizes. A block of 4 photos fills a 4x2 area: one big, two small, one
   wide. Leftover photos fill their own row so the grid never has holes. */
function tileClass(i: number, n: number): string {
  if (n === 1) return 'col-span-2 lg:col-span-4 row-span-2';
  if (n === 2) return 'col-span-2 row-span-2';
  if (n === 3) return i === 0 ? 'col-span-2 row-span-2' : 'row-span-2';
  const full = Math.floor(n / 4) * 4;
  if (i < full) return ['col-span-2 row-span-2', '', '', 'col-span-2'][i % 4];
  const r = n - full;
  if (r === 1) return 'col-span-2 lg:col-span-4';
  if (r === 2) return 'col-span-2';
  return i === full ? 'col-span-2' : '';
}

const grid =
  'grid grid-flow-dense grid-cols-2 auto-rows-[140px] gap-3 sm:auto-rows-[180px] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[200px]';

function Camera() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-9 text-white/40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

/* Project photos for one sector. Shown inline, under the picture stage on
   /projects, when "See {sector} projects" is clicked. */
export default function SectorProjects({
  sector,
  onClose,
}: {
  sector: Sector;
  onClose: () => void;
}) {
  const sites = sector.sites ?? [];
  const others = sector.others ?? [];
  const hasContent = sites.length > 0 || others.length > 0;
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <section
      id="sector-projects"
      aria-label={`${sector.label} projects`}
      className="bg-navy relative scroll-mt-28 overflow-hidden rounded-t-[48px] text-white"
      style={{ ...gridBg, animation: 'hww-in .7s var(--ease-slow) both' }}
    >
      <div className="relative mx-auto max-w-[1240px] px-[22px] py-16 lg:py-24">
        {/* heading + facts */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-brand text-sm font-bold">{sector.region}</p>
            <h2 className="mt-1 text-[clamp(30px,4.4vw,60px)] leading-none font-extrabold tracking-tight">
              {sector.label} projects
            </h2>
            <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-white/75">
              {sector.blurb}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <dl className="flex gap-3">
              {[
                ['600+', 'sites'],
                ['2005', 'founded'],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-white/15 bg-white/[.06] px-5 py-3 text-center backdrop-blur-sm"
                >
                  <dd className="text-brand text-2xl leading-none font-extrabold">
                    {v}
                  </dd>
                  <dt className="mt-1 text-xs font-semibold text-white/65">
                    {l}
                  </dt>
                </div>
              ))}
            </dl>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close projects"
              className="hover:bg-brand grid size-12 place-items-center rounded-full bg-white/15 text-2xl transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* named sites: bento photo grid per site */}
        {sites.map((site, si) => (
          <div key={site.name} className="mt-14">
            <div className="flex items-baseline gap-4">
              <span className="text-brand text-sm font-bold tracking-[0.2em]">
                {String(si + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-extrabold">{site.name}</h3>
              <span aria-hidden className="h-px flex-1 bg-white/15" />
            </div>
            <ul className={`mt-5 ${grid}`}>
              {site.images.map((src, i) => (
                <li
                  key={`${src}-${i}`}
                  className={tileClass(i, site.images.length)}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setZoom({ src, alt: `${site.name}, photo ${i + 1}` })
                    }
                    aria-label={`Enlarge ${site.name} photo ${i + 1}`}
                    className="group focus-visible:outline-brand relative block size-full overflow-hidden rounded-[20px] bg-[#14306b] shadow-[0_14px_30px_rgba(0,0,0,.3)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${site.name}, photo ${i + 1}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="from-navy/80 pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-12 pb-3 text-left text-sm font-bold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {site.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* sites listed without photos */}
        {others.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-extrabold">More sites</h3>
            <p className="mt-1 text-[15px] text-white/65">
              Systems we have designed and installed.
            </p>
            <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li
                  key={o.name}
                  className="flex flex-col rounded-[24px] border border-white/15 bg-white/[.06] p-6 backdrop-blur-sm"
                >
                  <p className="text-lg leading-snug font-extrabold">
                    {o.name}
                  </p>
                  {o.detail && (
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/65">
                      {o.detail}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {o.systems.map((sys) => (
                      <li
                        key={sys}
                        className="border-brand text-brand rounded-full border px-3 py-1 text-[13px] font-bold"
                      >
                        {sys}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* no photos added for this sector yet */}
        {!hasContent && (
          <ul className={`mt-12 ${grid}`}>
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                role="img"
                aria-label="Project photo to be added"
                className={`slot-dark grid place-items-center rounded-[20px] ${tileClass(i, 4)}`}
              >
                <span className="flex flex-col items-center gap-2 text-sm font-semibold text-white/60">
                  <Camera />
                  Photo to be added
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="bg-brand mt-16 flex flex-col items-start justify-between gap-6 rounded-[32px] p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-[clamp(22px,2.6vw,32px)] leading-tight font-extrabold">
              Working on a similar {sector.label.toLowerCase()} site?
            </p>
            <p className="mt-2 text-[16px] text-white/90">
              Talk to our height safety specialists: {company.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="hover:bg-navy rounded-full bg-white px-7 py-3.5 text-[15px] font-bold text-[#0b1f45] transition-colors hover:text-white"
            >
              Request a quote
            </Link>
            <a
              href={company.phoneHref}
              className="rounded-full border-2 border-white px-7 py-[12px] text-[15px] font-bold transition-colors hover:bg-white hover:text-[#0b1f45]"
            >
              Call us
            </a>
          </div>
        </div>
      </div>

      {/* enlarged photo */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          className="bg-navy/95 fixed inset-0 z-[100] grid place-items-center p-4 backdrop-blur-sm"
          onClick={() => setZoom(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={zoom.src}
            alt={zoom.alt}
            referrerPolicy="no-referrer"
            className="max-h-[88vh] max-w-full rounded-2xl object-contain shadow-2xl"
          />
          <button
            type="button"
            aria-label="Close photo"
            className="hover:bg-brand absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/15 text-2xl"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
