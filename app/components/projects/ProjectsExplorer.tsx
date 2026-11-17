'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { type Sector, sectorHref } from '@/app/lib/projects-data';

/* Lifeline with one drop per sector. Click a drop and the page scrolls to the
   detail area: the old sector's pictures are pulled up, and the new sector's
   pictures are lowered on ropes from a short rail. Only one sector shows. */

const AUTO_MS = 10000; // next picture every 10 seconds
const SPREAD = 25; // % between neighbouring cards
const nodeY = (k: number) => 30 + (2 - Math.min(Math.abs(k), 3)) * 46; // V: centre is lowest
const SCALE = [1.5, 0.82, 0.62, 0.5]; // centre card is the hero
const FADE = [1, 0.85, 0.5, 0];
const mod = (n: number, m: number) => ((n % m) + m) % m;
const LEAVE_MS = 280;

const css = `
@keyframes text-in{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:none}}
@keyframes fade-up{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes pull-up{to{opacity:0;transform:translateY(-28px)}}
@keyframes progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.txt{animation:text-in .7s cubic-bezier(.22,.8,.25,1) both}
.up{animation:fade-up .9s cubic-bezier(.22,.8,.25,1) .15s both}
.vcard{transition:left .9s cubic-bezier(.22,.8,.25,1),top .9s cubic-bezier(.22,.8,.25,1),transform .9s cubic-bezier(.22,.8,.25,1),opacity .9s ease}
.leaving .up,.leaving .txt{animation:pull-up ${LEAVE_MS}ms ease-in forwards;animation-delay:0s}
@media (prefers-reduced-motion:reduce){.txt,.up{animation:none}.vcard{transition:none}.leaving .up,.leaving .txt{animation:none;opacity:0}}
`;

export default function ProjectsExplorer({ sectors }: { sectors: Sector[] }) {
  const [active, setActive] = useState(sectors[0].id); // highlighted drop
  const [shown, setShown] = useState(sectors[0].id); // sector in the detail area
  const [leaving, setLeaving] = useState(false);
  const [cur, setCur] = useState(0); // absolute picture position, keeps growing
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const detail = useRef<HTMLDivElement>(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  // advance to the next picture every 10 s; any manual move restarts the clock
  useEffect(() => {
    if (paused || leaving) return;
    const t = setTimeout(() => setCur((c) => c + 1), AUTO_MS);
    return () => clearTimeout(t);
  }, [cur, shown, paused, leaving]);

  function pick(id: string) {
    setActive(id);
    detail.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (id === shown) return;
    clearTimeout(timer.current);
    setLeaving(true);
    timer.current = setTimeout(() => {
      setShown(id);
      setCur(0);
      setLeaving(false);
    }, LEAVE_MS);
  }

  const s = sectors.find((x) => x.id === shown) ?? sectors[0];
  const N = Math.max(5, s.images?.length ?? 0);
  const pic = (i: number) => s.images?.[mod(i, N)];

  return (
    <>
      <style>{css}</style>

      {/* ---------- dark hero: title + lifeline ---------- */}
      <section
        className="bg-navy relative overflow-hidden rounded-b-[48px] text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="relative mx-auto max-w-[1240px] px-[22px] pt-28 pb-20">
          <h1 className="text-[clamp(32px,4vw,52px)] leading-none font-extrabold tracking-tight">
            Projects
          </h1>
          <p className="mt-3 mb-14 max-w-[520px] text-[17px] leading-relaxed text-white/75">
            Every system we install is anchored to a line. Pick a sector to see
            where it holds. 600+ sites in Singapore and overseas.
          </p>
          {/* ---------- lifeline with drops ---------- */}
          <nav aria-label="Project sectors" className="overflow-x-auto">
            <div className="relative min-w-[1040px] pt-2 pb-4">
              <span
                aria-hidden
                className="bg-brand absolute inset-x-0 top-2 h-[3px]"
              />
              <ul className="relative flex gap-4">
                {sectors.map((x, i) => {
                  const on = x.id === active;
                  return (
                    <li key={x.id} className="flex-1">
                      <button
                        onClick={() => pick(x.id)}
                        aria-pressed={on}
                        aria-controls="sector-detail"
                        className="group focus-visible:outline-brand flex w-full cursor-pointer flex-col items-center focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <span
                          aria-hidden
                          className={`bg-navy -mt-[3px] size-4 rounded-full border-[3px] transition-colors ${on ? 'border-brand' : 'group-hover:border-brand border-white'}`}
                        />
                        <span
                          aria-hidden
                          className={`w-0.5 transition-colors ${on ? 'bg-brand' : 'group-hover:bg-brand bg-white'}`}
                          style={{ height: 28 + i * 24 }}
                        />
                        <span
                          className={`block aspect-[3/4] w-full max-w-[132px] overflow-hidden rounded-[10px] border transition-colors ${on ? 'border-brand border-2' : 'group-hover:border-brand border-white/40'}`}
                        >
                          {x.images?.[0] || x.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={x.images?.[0] ?? x.image}
                              alt=""
                              className="size-full object-cover"
                            />
                          ) : (
                            <span className="slot-dark block size-full" />
                          )}
                        </span>
                        <span
                          className={`mt-3 text-center text-[15px] leading-snug font-semibold ${on ? 'text-brand font-extrabold' : 'text-white'}`}
                        >
                          {x.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      {/* ---------- light detail: the picture stage ---------- */}
      <section
        className="relative pt-20 pb-24"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 45%,rgba(247,134,30,.14),transparent 70%),#f6f8fc',
        }}
      >
        <div className="mx-auto max-w-[1240px] px-[22px]">
          {/* ---------- selected sector ---------- */}
          <div
            id="sector-detail"
            ref={detail}
            aria-live="polite"
            className="scroll-mt-24"
          >
            <div
              key={s.id}
              className={`grid gap-12 lg:grid-cols-[0.7fr_1.5fr] ${leaving ? 'leaving' : ''}`}
            >
              <div className="txt">
                <p className="text-brand text-sm font-bold">{s.region}</p>
                <h2 className="text-navy mt-1 text-[clamp(30px,3.6vw,48px)] leading-tight font-extrabold tracking-tight">
                  {s.label}
                </h2>
                <p className="text-mute mt-3 max-w-[380px] text-[17px] leading-relaxed">
                  {s.blurb}
                </p>
                {s.projects.length > 0 && (
                  <ul className="text-navy mt-5 space-y-1.5 font-semibold">
                    {s.projects.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
                <Link
                  href={sectorHref(s)}
                  className="bg-navy hover:bg-brand mt-7 inline-block rounded-full px-6 py-3 text-[15px] font-bold text-white transition-colors"
                >
                  See {s.label} projects
                </Link>
              </div>

              {/* V-shaped rope: the centre picture hangs lowest, neighbours rise on both sides */}
              <div
                className="up"
                role="group"
                aria-roledescription="carousel"
                aria-label={`${s.label} pictures`}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
              >
                <div className="relative h-[560px] overflow-hidden sm:h-[680px]">
                  <svg
                    aria-hidden
                    viewBox="0 0 100 680"
                    preserveAspectRatio="none"
                    className="absolute inset-0 size-full"
                  >
                    <polyline
                      points={[-3, -2, -1, 0, 1, 2, 3]
                        .map((k) => `${50 + SPREAD * k},${nodeY(k)}`)
                        .join(' ')}
                      fill="none"
                      stroke="var(--color-brand)"
                      strokeWidth={3}
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  {[-3, -2, -1, 0, 1, 2, 3].map((k) => {
                    const idx = cur + k;
                    const src = pic(idx);
                    const a = Math.abs(k);
                    return (
                      <div
                        key={idx}
                        className="vcard absolute"
                        style={{
                          left: `${50 + SPREAD * k}%`,
                          top: nodeY(k),
                          width: 'clamp(140px,28%,240px)',
                          transform: `translateX(-50%) scale(${SCALE[a]})`,
                          transformOrigin: 'top center',
                          opacity: FADE[a],
                          zIndex: 10 - a,
                          pointerEvents: a === 3 ? 'none' : 'auto',
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <span
                            aria-hidden
                            className="border-brand -mt-[7px] size-3.5 rounded-full border-[3px] bg-white"
                          />
                          <span
                            aria-hidden
                            className="bg-brand block h-[18px] w-0.5"
                          />
                          <button
                            onClick={() => setCur(idx)}
                            aria-label={
                              k === 0
                                ? `Picture ${mod(idx, N) + 1} of ${N}, showing`
                                : `Show picture ${mod(idx, N) + 1} of ${N}`
                            }
                            aria-current={k === 0 ? 'true' : undefined}
                            tabIndex={a > 2 ? -1 : 0}
                            className={`focus-visible:outline-brand block w-full cursor-pointer overflow-hidden rounded-[14px] border shadow-[0_24px_50px_rgba(11,31,69,.28)] focus-visible:outline-2 focus-visible:outline-offset-4 ${k === 0 ? 'border-brand border-[3px]' : 'border-navy/20'}`}
                          >
                            {src ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={src}
                                alt={k === 0 ? `${s.label} project` : ''}
                                className="aspect-[4/5] w-full object-cover"
                              />
                            ) : (
                              <span className="slot-dark grid aspect-[4/5] w-full place-items-center px-3 text-center text-sm font-semibold text-white/70">
                                Picture to be added
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* controls: prev, dots (with 10 s progress), next */}
                <div className="mt-2 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCur((c) => c - 1)}
                    aria-label="Previous picture"
                    className="focus-visible:outline-brand hover:border-brand hover:text-brand text-navy border-navy/30 grid size-11 place-items-center rounded-full border bg-white text-xl transition-colors focus-visible:outline-2"
                  >
                    ‹
                  </button>
                  <ul className="flex gap-2" aria-hidden>
                    {Array.from({ length: N }, (_, j) => {
                      const on = j === mod(cur, N);
                      return (
                        <li
                          key={j}
                          className="bg-navy/15 relative h-1.5 w-8 overflow-hidden rounded-full"
                        >
                          {on && (
                            <span
                              key={cur}
                              className="bg-brand absolute inset-0 origin-left"
                              style={{
                                animation: `progress ${AUTO_MS}ms linear forwards`,
                                animationPlayState:
                                  paused || leaving ? 'paused' : 'running',
                              }}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => setCur((c) => c + 1)}
                    aria-label="Next picture"
                    className="focus-visible:outline-brand hover:border-brand hover:text-brand text-navy border-navy/30 grid size-11 place-items-center rounded-full border bg-white text-xl transition-colors focus-visible:outline-2"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
