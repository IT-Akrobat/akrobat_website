'use client';

import { useState } from 'react';

import {
  type NewsCategory,
  type NewsItem,
  newsCategories,
} from '@/app/lib/news-data';

const tint: Record<NewsCategory, string> = {
  Promotions: 'bg-brand text-white',
  Blogs: 'bg-navy text-white',
  'Trade Shows': 'bg-[#fdf3e6] text-navy',
};

/* Picture area. Shows the photo when `image` is set; otherwise a coloured
   panel that carries the offer (promotions) or the title, so the card still
   reads well before pictures are added. */
function Cover({ n }: { n: NewsItem }) {
  if (n.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={n.image} alt="" className="size-full object-cover" />;
  }
  return (
    <div
      className={`${tint[n.category]} relative flex size-full flex-col justify-end p-6`}
      role="img"
      aria-label={`Picture to be added: ${n.title}`}
    >
      <span
        aria-hidden
        className="absolute top-4 right-4 size-5 border-t-2 border-r-2 border-current opacity-40"
      />
      <span
        aria-hidden
        className="absolute bottom-4 left-4 size-5 border-b-2 border-l-2 border-current opacity-40"
      />
      {n.offer ? (
        <span className="text-[clamp(28px,3vw,38px)] leading-none font-extrabold tracking-tight">
          {n.offer}
        </span>
      ) : (
        <span className="text-sm font-semibold opacity-70">
          Picture to be added
        </span>
      )}
    </div>
  );
}

export default function NewsFeed({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<'All' | NewsCategory>('All');
  const shown =
    active === 'All' ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter by type"
        className="flex flex-wrap gap-2"
      >
        {newsCategories.map((c) => {
          const count =
            c === 'All'
              ? items.length
              : items.filter((i) => i.category === c).length;
          const on = c === active;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(c)}
              className={`focus-visible:outline-brand rounded-full border px-5 py-2.5 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                on
                  ? 'bg-navy border-navy text-white'
                  : 'border-line text-navy hover:border-navy bg-white'
              }`}
            >
              {c}
              <span
                className={`ml-2 text-sm font-semibold ${on ? 'text-white/60' : 'text-mute'}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((n) => (
          <li key={n.href}>
            <div className="border-line flex h-full flex-col overflow-hidden rounded-[24px] border bg-white transition-shadow hover:shadow-[0_16px_36px_rgba(11,31,69,.12)]">
              <div className="aspect-[16/10] overflow-hidden">
                <Cover n={n} />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-mute text-sm font-semibold">
                  <span className="text-brand-dark">{n.category}</span>
                  {'  ·  '}
                  {n.date}
                </p>
                <h3 className="text-navy mt-2 text-xl leading-snug font-extrabold">
                  {n.title}
                </h3>
                <p className="text-mute mt-2 flex-1 text-[15px] leading-relaxed">
                  {n.summary}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
