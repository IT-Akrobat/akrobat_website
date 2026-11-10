'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { type SrlGroup, type SrlModel } from '@/app/lib/srl-data';

const STEP = 320; // card width 300 + gap 20

export default function SrlRail({
  groups,
  hasImage,
  imageBase = '/products/srl',
  eyebrow = 'EN 360:2002',
  heading = ['Line that', 'follows you.'],
  initialKey,
  quoteLabel = 'Self-Retracting Lifeline',
}: {
  groups: SrlGroup[];
  hasImage: Record<string, boolean>;
  imageBase?: string;
  eyebrow?: string;
  heading?: [string, string];
  initialKey?: string;
  quoteLabel?: string;
}) {
  const [key, setKey] = useState(
    groups.some((g) => g.key === initialKey) ? initialKey! : groups[0].key,
  );
  const [open, setOpen] = useState<SrlModel | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const group = groups.find((g) => g.key === key) ?? groups[0];
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  const img = (id: string) => `${imageBase}/${id}.jpg`;

  const pick = (k: SrlGroup['key']) => {
    setKey(k);
    rail.current?.scrollTo({ left: 0 });
  };
  const slide = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * STEP, behavior: 'smooth' });

  /* details popup: Esc closes, page behind stops scrolling */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section id="models" className="bg-navy scroll-mt-28 overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-[22px] py-20">
        <div className="grid gap-12 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* ---------- left: title + vertical tabs ---------- */}
          <div>
            <p className="text-brand text-xs font-extrabold tracking-[0.22em] uppercase">
              {eyebrow} · {total} {total === 1 ? 'model' : 'models'}
            </p>
            <h2 className="mt-3 text-[clamp(34px,4.4vw,52px)] leading-[1.02] font-extrabold tracking-tight text-white">
              {heading[0]} <span className="text-brand">{heading[1]}</span>
            </h2>

            <div role="tablist" className="mt-8 border-t border-white/15">
              {groups.map((g) => {
                const on = g.key === key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => pick(g.key)}
                    className={`flex w-full items-center justify-between border-b border-white/15 py-4 text-left text-lg font-bold transition-colors ${
                      on ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`h-[3px] rounded-full transition-all ${
                          on ? 'bg-brand w-7' : 'w-0 bg-transparent'
                        }`}
                      />
                      {g.label}
                    </span>
                    <span className={on ? 'text-brand' : 'text-white/40'}>
                      {pad(g.items.length)}
                    </span>
                  </button>
                );
              })}
            </div>
            {group.note && (
              <p className="mt-5 text-sm leading-relaxed text-white/60">
                {group.note}
              </p>
            )}
          </div>

          {/* ---------- right: rail + controls underneath ---------- */}
          <div className="min-w-0">
            <div
              ref={rail}
              className="flex snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
            >
              {group.items.map((m) => {
                const numeric = /^[\d.]+ \S+$/.test(m.length);
                const isAddon = m.length === 'Add-on';
                const [num, unit] = m.length.split(' ');
                const outline = numeric ? num : isAddon ? '+' : m.length[0];
                return (
                  <article
                    key={m.id}
                    className="bg-navy-2 relative flex h-[480px] w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] p-6"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-6 left-4 text-[176px] leading-none font-extrabold tracking-tighter text-transparent select-none"
                      style={{ WebkitTextStroke: '2px rgba(255,255,255,.28)' }}
                    >
                      {outline}
                    </span>

                    <div className="absolute top-[86px] right-6 left-[56px] h-[160px] overflow-hidden rounded-2xl bg-white">
                      {hasImage[m.id] ? (
                        <Image
                          src={img(m.id)}
                          alt={m.title}
                          fill
                          sizes="260px"
                          className="object-contain p-3"
                        />
                      ) : (
                        <div className="slot absolute inset-0 flex flex-col items-center justify-center gap-1 p-3 text-center">
                          <span className="text-navy-2/70 font-mono text-sm font-bold">
                            {m.model}
                          </span>
                          <span className="text-navy-2/60 text-[11px]">
                            add <code>public{img(m.id)}</code>
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="relative mt-auto">
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-brand leading-none font-extrabold ${
                            numeric ? 'text-[44px]' : 'text-[34px]'
                          }`}
                        >
                          {numeric ? num : m.length}
                        </span>
                        {numeric && (
                          <span className="text-xl font-extrabold text-white">
                            {unit}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-[22px] leading-tight font-extrabold text-white">
                        {m.model}
                      </h3>
                      <ul className="mt-2 space-y-0.5 text-sm leading-snug text-[#c3cfeb]">
                        {m.specs
                          .slice(numeric ? 1 : 0, numeric ? 4 : 3)
                          .map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => setOpen(m)}
                        aria-haspopup="dialog"
                        className="bg-brand text-navy mt-4 flex w-full items-center justify-between rounded-full px-5 py-3.5 text-[15px] font-extrabold transition-[filter] hover:brightness-110"
                      >
                        <span>View details</span>
                        <span aria-hidden>→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* controls: arrows */}
            <div className="mt-6 flex items-center justify-end gap-5">
              <div className="flex gap-2.5">
                {(
                  [
                    ['←', 'Previous models', -1],
                    ['→', 'Next models', 1],
                  ] as const
                ).map(([sym, label, dir]) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    onClick={() => slide(dir)}
                    className="hover:bg-brand hover:text-navy hover:border-brand size-12 rounded-full border border-white/35 text-xl text-white transition-colors"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- details popup ---------- */}
      {open && (
        <div
          className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <button
            type="button"
            aria-label="Close details"
            onClick={() => setOpen(null)}
            className="bg-navy/80 absolute inset-0 backdrop-blur-sm"
          />
          <div
            className="bg-navy-2 relative grid max-h-[92svh] w-full max-w-[900px] overflow-y-auto rounded-t-[28px] text-white shadow-[0_30px_80px_rgba(0,0,0,.45)] sm:rounded-[28px] md:grid-cols-[0.9fr_1.1fr]"
            style={{ animation: 'hww-in .45s var(--ease-slow) both' }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="hover:bg-brand hover:text-navy absolute top-4 right-4 z-10 size-10 rounded-full border border-white/35 text-lg transition-colors"
            >
              ✕
            </button>

            <div className="relative min-h-[240px] bg-white md:min-h-full">
              {hasImage[open.id] ? (
                <Image
                  src={img(open.id)}
                  alt={open.title}
                  fill
                  sizes="(min-width: 768px) 400px, 100vw"
                  className="object-contain p-6"
                />
              ) : (
                <div className="slot absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center">
                  <span className="text-navy-2/70 font-mono text-base font-bold">
                    {open.model}
                  </span>
                  <span className="text-navy-2/60 text-xs">
                    add <code>public{img(open.id)}</code>
                  </span>
                </div>
              )}
            </div>

            <div className="p-7 sm:p-9">
              <p className="text-brand text-xs font-extrabold tracking-[0.22em] uppercase">
                {eyebrow} · {group.label}
              </p>
              <h3 className="mt-3 pr-10 text-[clamp(26px,3vw,36px)] leading-tight font-extrabold">
                {open.model}
              </h3>
              <p className="mt-1 text-[#c3cfeb]">{open.title}</p>

              <p className="text-brand mt-5 text-5xl leading-none font-extrabold">
                {open.length}
              </p>

              <h4 className="mt-7 text-xs font-bold tracking-[0.18em] text-white/60 uppercase">
                Specifications
              </h4>
              <ul className="mt-3 border-t border-white/15">
                {open.specs.map((s) => (
                  <li
                    key={s}
                    className="flex gap-3 border-b border-white/15 py-3 text-[15px] leading-snug"
                  >
                    <span className="bg-brand mt-[7px] size-2 shrink-0 rounded-full" />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/contact-us#enquiry"
                  className="bg-brand text-navy rounded-full px-6 py-3.5 text-[15px] font-extrabold transition-[filter] hover:brightness-110"
                >
                  Ask for a quote →
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(null)}
                  className="hover:text-navy rounded-full border border-white/35 px-6 py-3.5 text-[15px] font-bold transition-colors hover:bg-white"
                >
                  Close
                </button>
              </div>
              <p className="mt-4 text-xs text-white/45">
                {quoteLabel} · tell us your site and we’ll confirm the right
                model.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
