'use client';

import { useEffect, useState } from 'react';

const INTERVAL = 3600;

const steps = [
  {
    title: 'Consult',
    text: 'We assess your site and work-at-height risks, then recommend the right system.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: 'Design & supply',
    text: 'Engineered layouts and equipment selected for your roof, plant or building.',
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
  },
  {
    title: 'Install',
    text: 'Anchorage, lifelines, guardrails and more, installed by our team.',
    icon: (
      <>
        <circle cx="12" cy="5" r="3" />
        <path d="M12 22V8M5 12H2a10 10 0 0 0 20 0h-3" />
      </>
    ),
  },
  {
    title: 'Inspect & re-certify',
    text: 'Periodic inspection, maintenance and re-certification to keep systems compliant.',
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const svg =
  'fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';
const ease = 'cubic-bezier(0.22, 0.8, 0.25, 1)';

/* A ring that never stops turning: every few seconds it rotates 90° to the
   next step and keeps going, so step 4 flows straight back into step 1. */
export default function HowWeWork() {
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = tick % steps.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setTick((v) => v + 1), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  // jump forward to a chosen step (never spins backwards)
  const go = (i: number) =>
    setTick(
      (t) => t + ((i - (t % steps.length) + steps.length) % steps.length),
    );

  const turn = `transform 1.3s ${ease}`;

  return (
    <div
      role="group"
      aria-label="Our process, repeating in a cycle"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="mt-14 flex flex-col items-center gap-14 md:flex-row md:justify-between md:gap-10"
    >
      {/* The ring */}
      <div className="hww" data-paused={paused}>
        {/* slow dashed orbit + fast comet: always in motion */}
        <span
          aria-hidden
          className="hww-spin-slow border-navy/25 absolute rounded-full border-2 border-dashed"
          style={{
            inset: 'calc(50% - var(--r))',
          }}
        />
        <span
          aria-hidden
          className="hww-spin-fast absolute rounded-full"
          style={{ inset: 'calc(50% - var(--r))' }}
        >
          <span className="bg-brand absolute -top-[5px] left-1/2 size-2.5 -translate-x-1/2 rounded-full shadow-[0_0_14px_3px_rgba(247,134,30,.7)]" />
        </span>

        {/* pointer to the active step */}
        <span
          aria-hidden
          className="border-t-brand absolute left-1/2 size-0 -translate-x-1/2 border-x-[9px] border-t-[12px] border-x-transparent"
          style={{ top: 'calc(50% - var(--r) - var(--n) / 2 - 22px)' }}
        />

        {/* the rotating wheel carrying the four steps */}
        <div
          className="absolute inset-0"
          style={{ transform: `rotate(${-tick * 90}deg)`, transition: turn }}
        >
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <div
                key={s.title}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 'var(--n)',
                  height: 'var(--n)',
                  margin: 'calc(var(--n) / -2)',
                  transform: `rotate(${i * 90}deg) translateY(calc(var(--r) * -1))`,
                }}
              >
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Step ${i + 1}: ${s.title}`}
                  aria-current={on ? 'step' : undefined}
                  className={`relative grid size-full cursor-pointer place-items-center rounded-full border-2 transition-[background-color,color,border-color,scale] duration-700 ${
                    on
                      ? 'hww-pulse border-brand bg-brand scale-110 text-white'
                      : 'border-line text-navy-2 bg-white shadow-[0_10px_24px_rgba(11,31,69,.12)]'
                  }`}
                  style={{
                    transform: `rotate(${(tick - i) * 90}deg)`,
                    transition: `${turn}, background-color .7s, color .7s, border-color .7s, scale .7s`,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={`size-8 ${svg}`}
                    aria-hidden
                  >
                    {s.icon}
                  </svg>
                  <span
                    className={`absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full text-[13px] font-extrabold ${
                      on ? 'text-brand bg-white' : 'bg-navy-2 text-white'
                    }`}
                  >
                    {i + 1}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* centre: text of the current step */}
        <div
          className="absolute top-1/2 left-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2 text-center"
          aria-live="off"
        >
          <div key={active} className="hww-in">
            <p className="text-brand-dark text-[11px] font-bold tracking-[0.22em] uppercase">
              Step 0{active + 1}
            </p>
            <h3 className="text-navy mt-1.5 text-[clamp(17px,2.2vw,23px)] leading-tight font-extrabold">
              {steps[active].title}
            </h3>
            <p className="text-mute mt-2 text-[clamp(12px,1.35vw,14px)] leading-snug">
              {steps[active].text}
            </p>
            <span className="bg-navy/10 mx-auto mt-4 block h-[3px] w-20 overflow-hidden rounded-full">
              <span
                className="hww-fill bg-brand block h-full origin-left"
                style={{ animationDuration: `${INTERVAL}ms` }}
              />
            </span>
          </div>
        </div>
      </div>

      {/* The same steps as a quick index */}
      <ol className="w-full max-w-[380px] md:max-w-[340px]">
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(i)}
                className={`group flex w-full cursor-pointer items-center gap-5 border-b py-5 text-left transition-colors duration-500 ${
                  on
                    ? 'border-brand text-navy'
                    : 'border-line text-navy/40 hover:text-navy/70'
                }`}
              >
                <span
                  className={`w-12 text-[34px] leading-none font-extrabold transition-colors duration-500 ${
                    on ? 'text-brand' : ''
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="text-lg font-bold">{s.title}</span>
              </button>
            </li>
          );
        })}
        <li className="text-mute flex items-center gap-3 pt-5 text-sm font-semibold">
          <svg
            viewBox="0 0 24 24"
            className={`hww-spin-fast size-5 ${svg}`}
            aria-hidden
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M8 16H3v5" />
          </svg>
          Never ends. After step 4, it starts again.
        </li>
      </ol>
    </div>
  );
}
