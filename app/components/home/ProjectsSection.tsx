import Link from 'next/link';
import type { ReactNode } from 'react';

import { isGroup, projects } from '@/app/lib/nav-data';

const svg =
  'size-6 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]';

const icons: Record<string, ReactNode> = {
  Entertainment: (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3v3Z" />
      <path d="M14 6v12" strokeDasharray="2 3" />
    </svg>
  ),
  Government: (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M3 9 12 4l9 5H3ZM5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" />
    </svg>
  ),
  Factories: (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M3 20V10l6 4v-4l6 4V6h3v14H3Z" />
      <path d="M8 20v-3M13 20v-3" />
    </svg>
  ),
  'Oil Offshore': (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M4 12h16M7 12v-6h4v6M16 12V3M7 12l-2 7M17 12l2 7M3 21c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 6 0" />
    </svg>
  ),
  Schools: (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="m2 9 10-5 10 5-10 5L2 9Z" />
      <path d="M6 11.5V16c3 2.5 9 2.5 12 0v-4.5M22 9v6" />
    </svg>
  ),
  'Condominium / Hotel': (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3" />
    </svg>
  ),
  'Shopping Center / Offices': (
    <svg viewBox="0 0 24 24" className={svg} aria-hidden>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
};

const landmarks = [
  {
    title: 'In Singapore',
    items: ['Gardens by the Bay', 'Marina Bay Sands', 'Resort World Sentosa'],
  },
  {
    title: 'Worldwide',
    items: [
      'Al Maktoum International Airport, Dubai',
      'Abu Dhabi Exposition Centre',
      'Okada Hotel, Manila',
    ],
  },
];

export default function ProjectsSection() {
  const sg = projects.find((p) => isGroup(p) && p.label === 'Singapore');
  const sectors =
    sg && isGroup(sg)
      ? sg.children.filter((c) => c.href.startsWith('/projects/'))
      : [];

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-[22px] py-20 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-brand mb-3 text-sm font-bold tracking-[0.2em] uppercase">
            Projects
          </p>
          <h2 className="text-[clamp(28px,3.6vw,44px)] leading-tight font-extrabold tracking-tight">
            Trusted across Singapore’s industries
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/70">
            From theme parks and hotels to factories and offshore platforms, we
            have installed height safety systems for over 800 references.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="bg-brand hover:bg-brand-dark rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              View our projects
            </Link>
            <Link
              href="/projects/international"
              className="hover:text-navy rounded-full border-2 border-white/40 px-7 py-[12px] text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white"
            >
              International
            </Link>
          </div>
        </div>

        <div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sectors.map((s) => (
              <li key={s.href} className="sm:odd:last:col-span-2">
                <Link
                  href={s.href}
                  className="hover:border-brand group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 p-4 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span className="bg-brand/15 text-brand grid size-12 shrink-0 place-items-center rounded-xl">
                    {icons[s.label]}
                  </span>
                  <span className="flex-1 text-[17px] font-semibold">
                    {s.label}
                  </span>
                  <span
                    className="text-brand transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-2">
            {landmarks.map((l) => (
              <div key={l.title}>
                <h3 className="text-brand text-[15px] font-bold">{l.title}</h3>
                <ul className="mt-3 space-y-2 text-[15px] text-white/80">
                  {l.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
