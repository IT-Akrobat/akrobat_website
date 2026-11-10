'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ImageSlot from './ImageSlot';

export type ShowcaseGroup = {
  href: string;
  label: string;
  code: string;
  kicker: string;
  summary: string;
  children: { label: string; href: string }[];
};

/* Left: one sticky picture that swaps as you scroll.
   Right: the ranges scroll past; the one in the middle of the screen is "on". */
export default function ProductsShowcase({
  groups,
}: {
  groups: ShowcaseGroup[];
}) {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number(e.target.getAttribute('data-i')));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    blocks.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto grid max-w-[1240px] gap-x-16 px-[22px] md:grid-cols-[0.9fr_1.1fr]">
      {/* sticky picture stack (desktop) */}
      <div className="hidden md:block">
        <div className="sticky top-28 h-[calc(100svh-8rem)] py-6">
          <div className="relative size-full">
            {groups.map((g, i) => (
              <div
                key={g.href}
                aria-hidden={i !== active}
                className="absolute inset-0 transition-[opacity,transform,clip-path] duration-[900ms] ease-[cubic-bezier(0.22,0.8,0.25,1)]"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform:
                    i === active
                      ? 'none'
                      : `translateY(${i < active ? '-40px' : '40px'}) scale(.97)`,
                  clipPath:
                    i === active
                      ? 'polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)'
                      : 'polygon(0 0,100% 0,100% 0,92% 0,0 0)',
                }}
              >
                <ImageSlot
                  id={`${g.code}-COVER`}
                  hint={`Cover photo for ${g.label}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scrolling ranges */}
      <div>
        {groups.map((g, i) => (
          <section
            key={g.href}
            data-i={i}
            ref={(el) => {
              blocks.current[i] = el;
            }}
            className={`flex min-h-[80svh] flex-col justify-center py-14 transition-opacity duration-700 md:py-20 ${
              i === active ? 'opacity-100' : 'md:opacity-35'
            }`}
          >
            {/* picture inline on mobile */}
            <div
              className="mb-8 aspect-[4/3] md:hidden"
              style={{
                clipPath: 'polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)',
              }}
            >
              <ImageSlot
                id={`${g.code}-COVER`}
                hint={`Cover photo for ${g.label}`}
              />
            </div>

            <p className="text-brand-dark flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase">
              <span className="bg-brand h-[3px] w-9" />
              {g.code} · {g.kicker}
            </p>
            <h2 className="text-navy mt-4 text-[clamp(32px,4.2vw,58px)] leading-[1.02] font-extrabold tracking-tight">
              {g.label}
            </h2>
            <p className="text-mute mt-5 max-w-[480px] text-[16.5px] leading-relaxed">
              {g.summary}
            </p>

            <ul className="mt-8">
              {g.children.map((c, n) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group border-line hover:border-brand text-navy flex items-center gap-4 border-b py-3.5 text-[16px] font-semibold transition-colors"
                  >
                    <span className="text-brand-dark w-7 text-xs font-bold">
                      {String(n + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 transition-transform duration-500 group-hover:translate-x-2">
                      {c.label}
                    </span>
                    <span className="text-brand opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={g.href}
              className="bg-navy hover:bg-brand mt-8 inline-flex w-fit items-center gap-3 rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors duration-300"
            >
              Explore {g.label} <span aria-hidden>→</span>
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
