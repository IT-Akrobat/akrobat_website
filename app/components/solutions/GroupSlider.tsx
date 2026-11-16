'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import ImageSlot from '@/app/components/products/ImageSlot';
import Arrows from './Arrows';

export type SliderGroup = {
  id: string;
  label: string;
  blurb: string;
  images: { id: string; hint: string }[];
  systems: { slug: string; label: string }[];
};

/* One slide per group: a large photo with a smaller one overlapping it,
   and the group's title, copy and system links beside them. */
export default function GroupSlider({ groups }: { groups: SliderGroup[] }) {
  const [i, setI] = useState(0);
  const touch = useRef<number | null>(null);
  const n = groups.length;
  const g = groups[i];
  const second = g.images[1] ?? g.images[0];
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section
      id="by-use"
      className="overflow-hidden bg-[#f6f8fc] py-24"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const d = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="mx-auto max-w-[1240px] px-[22px]">
        <p className="text-brand-dark text-sm font-bold tracking-[0.25em] uppercase">
          By where it sits
        </p>
        <h2 className="text-navy mt-3 text-[clamp(30px,4vw,54px)] leading-[1.05] font-extrabold tracking-tight">
          Where it goes on the building
        </h2>

        <div
          key={g.id}
          className="mt-12 grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16"
          style={{ animation: 'hww-in 0.9s var(--ease-slow) both' }}
        >
          <div className="grid grid-cols-[1.35fr_1fr] gap-4 sm:gap-5">
            {[g.images[0], second].map((im, k) => (
              <div
                key={im.id + k}
                className="group h-[320px] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-25px_rgba(11,31,69,.4)] sm:h-[460px] lg:h-[560px]"
              >
                <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
                  <ImageSlot id={im.id} hint={im.hint} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-navy text-lg font-extrabold">
                <span className="text-brand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-navy/30">
                  {' '}
                  / {String(n).padStart(2, '0')}
                </span>
              </p>
              <Arrows onPrev={() => go(-1)} onNext={() => go(1)} />
            </div>

            <h3 className="text-navy mt-8 text-[clamp(32px,3.8vw,56px)] leading-[1.02] font-extrabold tracking-tight">
              {g.label}
            </h3>
            <p className="text-mute mt-5 max-w-[460px] text-[18px] leading-relaxed">
              {g.blurb}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {g.systems.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/engineering-solutions/${s.slug}`}
                    className="border-navy/20 text-navy hover:bg-navy block rounded-full border bg-white px-5 py-2.5 text-[15px] font-bold transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
