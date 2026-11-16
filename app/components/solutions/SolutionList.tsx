'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import ImageSlot from '@/app/components/products/ImageSlot';

export type ListItem = {
  slug: string;
  label: string;
  short: string;
  standard?: string;
  facts: [string, string][];
  topics: string[];
  cover: { id: string; hint: string };
};
export type ListGroup = {
  id: string;
  label: string;
  blurb: string;
  items: ListItem[];
};

/* The list is drawn as a lifeline: a rail runs down the left edge and every
   system is a bracket on it. The bracket in view turns orange, like a
   glider passing the anchors. The sticky bar jumps between the groups. */
export default function SolutionList({ groups }: { groups: ListGroup[] }) {
  const [activeGroup, setActiveGroup] = useState(groups[0].id);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const make = (attr: string, set: (v: string) => void, margin: string) => {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) set((e.target as HTMLElement).dataset[attr]!);
          }
        },
        { rootMargin: margin },
      );
      el.querySelectorAll<HTMLElement>(`[data-${attr}]`).forEach((n) =>
        io.observe(n),
      );
      return io;
    };
    const a = make('group', setActiveGroup, '-30% 0px -60% 0px');
    const b = make('item', setActiveItem, '-42% 0px -42% 0px');
    return () => {
      a.disconnect();
      b.disconnect();
    };
  }, []);

  return (
    <div ref={root}>
      <nav
        aria-label="Solution groups"
        className="border-line sticky top-[84px] z-30 border-y bg-white/92 backdrop-blur"
      >
        <ul className="mx-auto flex max-w-[1240px] [scrollbar-width:none] gap-1 overflow-x-auto px-[18px] py-2.5">
          {groups.map((g) => (
            <li key={g.id} className="flex-none">
              <a
                href={`#${g.id}`}
                aria-current={activeGroup === g.id ? 'true' : undefined}
                className="text-navy/70 hover:text-navy aria-[current=true]:bg-navy block rounded-full px-4 py-2 text-[14px] font-bold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] aria-[current=true]:text-white"
              >
                {g.label}
                <span className="ml-2 text-[12px] font-semibold opacity-60">
                  {g.items.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-[1240px] px-[22px] pb-10">
        {groups.map((g) => (
          <section
            key={g.id}
            id={g.id}
            data-group={g.id}
            className="scroll-mt-40 pt-20"
          >
            <div className="pl-[44px] md:pl-[72px]">
              <h2 className="text-navy text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
                {g.label}
              </h2>
              <p className="text-mute mt-2 max-w-[520px] text-[17px]">
                {g.blurb}
              </p>
            </div>

            <ol className="relative mt-10">
              {/* the rail */}
              <span
                aria-hidden
                className="bg-navy/15 absolute top-0 bottom-0 left-[11px] w-[2px] md:left-[23px]"
              />
              {g.items.map((s) => {
                const on = activeItem === s.slug;
                return (
                  <li
                    key={s.slug}
                    data-item={s.slug}
                    className="relative pb-14 pl-[44px] last:pb-0 md:pl-[72px]"
                  >
                    {/* the bracket */}
                    <span
                      aria-hidden
                      data-on={on}
                      className="border-navy bg-surf data-[on=true]:border-brand data-[on=true]:bg-brand absolute top-2 left-[3px] size-[18px] rounded-[4px] border-2 transition-all duration-500 data-[on=true]:shadow-[0_0_0_6px_rgba(247,134,30,.22)] md:left-[15px]"
                    />
                    <Link
                      href={`/engineering-solutions/${s.slug}`}
                      className="group grid gap-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--color-brand)] lg:grid-cols-[5fr_6fr] lg:gap-10"
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-[22px] lg:aspect-[5/4]">
                        <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                          <ImageSlot id={s.cover.id} hint={s.cover.hint} />
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-navy text-[clamp(24px,2.6vw,34px)] leading-tight font-extrabold tracking-tight">
                          {s.label}
                        </h3>
                        {s.standard && (
                          <p className="text-brand-dark mt-2 text-[15px] font-bold">
                            {s.standard}
                          </p>
                        )}
                        <p className="text-mute mt-3 max-w-[520px] text-[17px] leading-relaxed">
                          {s.short}
                        </p>

                        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                          {s.facts.map(([k, v]) => (
                            <div key={k}>
                              <dt className="text-mute text-[13px] font-semibold">
                                {k}
                              </dt>
                              <dd className="text-navy text-[16px] font-extrabold">
                                {v}
                              </dd>
                            </div>
                          ))}
                        </dl>

                        {s.topics.length > 0 && (
                          <p className="text-navy-2 border-line mt-5 border-t pt-4 text-[14.5px] leading-relaxed">
                            <span className="text-mute font-semibold">
                              Covers:{' '}
                            </span>
                            {s.topics.join(', ')}
                          </p>
                        )}

                        <span className="text-brand-dark mt-5 text-[15px] font-bold group-hover:underline">
                          View solution →
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
