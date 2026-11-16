'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ImageSlot from '@/app/components/products/ImageSlot';
import Arrows from './Arrows';

export type CarouselItem = {
  slug: string;
  label: string;
  short: string;
  standard?: string;
  cover: { id: string; hint: string };
};

/* The current card is wide and carries the photo; its neighbours peek in
   from both sides. Arrows, swipe and the keyboard all move it. */
export default function SolutionCarousel({ items }: { items: CarouselItem[] }) {
  const [i, setI] = useState(0);
  const [w, setW] = useState(1200);
  const box = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const n = items.length;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const go = (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d)));

  const mobile = w < 700;
  const cardW = mobile ? w * 0.84 : Math.min(w * 0.7, 1100);
  const gap = mobile ? 14 : 24;
  /* the first card sits on the page edge and the last one on the far edge,
     so there is never an empty gap beside the strip */
  const edge = mobile ? w * 0.05 : Math.max(22, (w - 1240) / 2 + 22);
  const minX = Math.min(edge, w - edge - (n * cardW + (n - 1) * gap));
  const x = Math.max(minX, edge - i * (cardW + gap));

  return (
    <section id="solutions" className="bg-white py-20">
      <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-[22px]">
        <div>
          <p className="text-brand-dark text-sm font-bold tracking-[0.25em] uppercase">
            Our systems
          </p>
          <h2 className="text-navy mt-3 text-[clamp(30px,4vw,54px)] leading-[1.05] font-extrabold tracking-tight">
            Pick a solution to explore
          </h2>
        </div>
        <Arrows onPrev={() => go(-1)} onNext={() => go(1)} />
      </div>

      <div
        ref={box}
        className="mt-10 overflow-hidden py-4 outline-none"
        tabIndex={0}
        aria-roledescription="carousel"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') go(-1);
          if (e.key === 'ArrowRight') go(1);
        }}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const d = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        <ul
          className="flex transition-transform duration-[900ms] ease-[var(--ease-slow)]"
          style={{ gap, transform: `translateX(${x}px)` }}
        >
          {items.map((s, k) => {
            const on = k === i;
            return (
              <li
                key={s.slug}
                aria-hidden={!on}
                className={`group relative h-[480px] flex-none overflow-hidden rounded-[28px] transition-all duration-700 md:h-[600px] ${
                  on
                    ? 'bg-navy shadow-[0_30px_60px_-20px_rgba(11,31,69,.45)]'
                    : 'bg-[#fdf3e6]'
                }`}
                style={{ width: cardW }}
              >
                {on ? (
                  <>
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                      <ImageSlot id={s.cover.id} hint={s.cover.hint} dark />
                    </div>
                    <div className="from-navy/90 via-navy/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                  </>
                ) : (
                  <button
                    type="button"
                    aria-label={`Show ${s.label}`}
                    onClick={() => setI(k)}
                    className="absolute inset-0 z-10 cursor-pointer"
                  />
                )}

                {on && (
                  <span className="text-navy absolute top-6 left-6 rounded-full bg-white/95 px-4 py-1.5 text-sm font-extrabold md:top-8 md:left-8">
                    {String(k + 1).padStart(2, '0')} /{' '}
                    {String(n).padStart(2, '0')}
                  </span>
                )}

                <div className="absolute bottom-0 left-0 p-7 md:p-10">
                  <h3
                    className={`max-w-[560px] text-[clamp(28px,3.6vw,52px)] leading-[1] font-extrabold tracking-tight ${
                      on ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {s.label}
                  </h3>
                  {on && (
                    <>
                      {s.standard && (
                        <p className="text-brand mt-3 text-[15px] font-bold">
                          {s.standard}
                        </p>
                      )}
                      <p className="mt-3 max-w-[480px] text-[17px] leading-relaxed text-white/85">
                        {s.short}
                      </p>
                      <Link
                        href={`/engineering-solutions/${s.slug}`}
                        className="bg-brand hover:bg-brand-dark mt-6 inline-block rounded-full px-8 py-3.5 font-bold text-white transition-colors"
                      >
                        Explore →
                      </Link>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6 flex justify-center gap-2" aria-hidden>
        {items.map((s, k) => (
          <span
            key={s.slug}
            className={`h-2 rounded-full transition-all duration-500 ${
              k === i ? 'bg-brand w-8' : 'bg-navy/20 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
