import type { Metadata } from 'next';
import Link from 'next/link';

import ImageSlot from '@/app/components/products/ImageSlot';
import InView from '@/app/components/products/InView';
import GroupSlider, {
  type SliderGroup,
} from '@/app/components/solutions/GroupSlider';
import SolutionCarousel from '@/app/components/solutions/SolutionCarousel';
import { company } from '@/app/lib/nav-data';
import { findSolution, groups, solutions } from '@/app/lib/solutions-data';

export const metadata: Metadata = {
  title: 'Engineering Solutions',
  description:
    'Lifelines, rails, anchors, nets, walkways, guardrails, ladders, BMUs, rope access and inspection. Designed, installed and certified by Akrobat.',
};

const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });

/* Both sliders are built from solutions-data.ts, so a new solution added
   there shows up here. Order follows the groups. */
const ordered = groups.flatMap((g) =>
  g.slugs.flatMap((slug) => {
    const s = findSolution(slug);
    return s ? [s] : [];
  }),
);

const carouselItems = ordered.map((s) => ({
  slug: s.slug,
  label: s.label,
  short: s.short,
  standard: s.standard,
  cover: s.cover,
}));

const sliderGroups: SliderGroup[] = groups.map((g) => {
  const list = g.slugs.flatMap((slug) => {
    const s = findSolution(slug);
    return s ? [s] : [];
  });
  const imgs = list.flatMap((s) => [
    s.cover,
    ...s.sections.flatMap((x) => (x.image ? [x.image] : [])),
  ]);
  return {
    id: g.id,
    label: g.label,
    blurb: g.blurb,
    images: imgs.slice(0, 2).length ? imgs.slice(0, 2) : [list[0].cover],
    systems: list.map((s) => ({ slug: s.slug, label: s.label })),
  };
});

const needs: [string, [string, string][]][] = [
  [
    'Workers move along a roof',
    [
      ['Lifeline Flexible', 'flexible-lifeline'],
      ['Lifeline Rigid (Securail)', 'lifeline-rigid-securail-en-795-d'],
    ],
  ],
  [
    'The roof is slippery, fragile or easily damaged',
    [['Anti Slip Walkway System', 'walkway-guardrail-handrail']],
  ],
  [
    'There is an open edge, parapet or skylight',
    [
      ['Guardrail (Handrail)', 'safety-guardrail-systems'],
      ['Safety Net', 'safety-net'],
    ],
  ],
  [
    'People climb up to the roof or a platform',
    [['Safety Cage Ladders', 'height-access-solutions']],
  ],
  [
    'You need a single attachment point',
    [['Roof Safety Anchor Points', 'anchors-points-en-795']],
  ],
  [
    'The façade needs cleaning, repair or inspection',
    [
      ['Building Maintenance Unit', 'building-maintenance-unit'],
      ['Rope Access', 'rope-access-works'],
    ],
  ],
  [
    'Your system is installed and needs its yearly check',
    [['Inspection & Re-Certification', 'inspection-recert']],
  ],
  [
    'You are not sure where to start',
    [['Safety Consulting', 'safety-consulting']],
  ],
];

const steps = [
  [
    'Design',
    'We survey the site, review the risks and engineer a system for your structure.',
  ],
  ['Install', 'Our own height safety team fits and tests it.'],
  [
    'Inspect',
    'Yearly inspection and re-certification keep it compliant, with after-sales service.',
  ],
];

const accreditations = [
  ['/pdf/bizsafe.jpg', 'bizSAFE Star'],
  ['/pdf/iso9001.jpg', 'ISO 9001'],
  ['/pdf/iso45001.jpg', 'ISO 45001'],
  ['/pdf/smf.jpg', 'Singapore Manufacturing Federation'],
];

export default function EngineeringSolutions() {
  return (
    <main className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fdf3e6] to-[#f6f8fc]">
        <div className="bg-brand/10 pointer-events-none absolute -top-32 -right-32 size-[520px] rounded-full blur-3xl" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-[22px] pt-36 pb-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-40">
          {/* text */}
          <div>
            <p
              className="text-brand-dark text-sm font-bold tracking-[0.25em] uppercase"
              style={{ animation: 'hww-in .8s var(--ease-slow) both' }}
            >
              Engineering solutions
            </p>
            <h1 className="text-navy mt-4 text-[clamp(40px,5.6vw,80px)] leading-[1] font-extrabold tracking-tight">
              <span className="mask" style={delay(0.1)}>
                <span>Keeping people</span>
              </span>
              <br />
              <span className="mask" style={delay(0.25)}>
                <span>
                  safe at <span className="text-brand">height.</span>
                </span>
              </span>
            </h1>
            <p
              className="text-mute mt-6 max-w-[470px] text-[18px] leading-relaxed"
              style={{ animation: 'hww-in 1s var(--ease-slow) .6s both' }}
            >
              From the first site visit to the yearly inspection, our own team
              designs, installs and certifies each system.
            </p>

            <dl
              className="mt-9 grid max-w-[480px] grid-cols-3 gap-3"
              style={{ animation: 'hww-in 1s var(--ease-slow) .8s both' }}
            >
              {[
                [String(solutions.length), 'systems'],
                ['2005', 'founded in Singapore'],
                ['800+', 'references'],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="border-navy/10 rounded-2xl border bg-white/80 px-4 py-4 shadow-[0_10px_30px_-18px_rgba(11,31,69,.4)]"
                >
                  <dt className="text-navy text-[28px] leading-none font-extrabold">
                    {n}
                  </dt>
                  <dd className="text-mute mt-1.5 text-[13px] leading-tight">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3"
              style={{ animation: 'hww-in 1s var(--ease-slow) 1s both' }}
            >
              <a
                href="#solutions"
                className="bg-brand hover:bg-brand-dark rounded-full px-7 py-3.5 font-bold text-white transition-colors"
              >
                Browse the systems ↓
              </a>
              <Link
                href="/contact-us#enquiry"
                className="text-navy border-brand border-b-2 pb-0.5 font-bold"
              >
                Talk to an engineer
              </Link>
            </div>
          </div>

          {/* photo collage */}
          <div
            className="relative grid h-[420px] grid-cols-[1.1fr_1fr] grid-rows-2 gap-4 sm:h-[560px]"
            style={{ animation: 'hww-in 1.2s var(--ease-slow) .3s both' }}
          >
            {[
              ['row-span-2', ordered[0]],
              ['', ordered[1]],
              ['', ordered[2]],
            ].map(([cls, s], k) => {
              const sol = s as (typeof ordered)[number];
              return (
                <div
                  key={sol.slug}
                  className={`group relative overflow-hidden rounded-[28px] shadow-[0_30px_60px_-25px_rgba(11,31,69,.45)] ${cls} ${
                    k === 1 ? 'mt-8' : ''
                  } ${k === 2 ? '-mt-4 mb-4' : ''}`}
                >
                  <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.07]">
                    <ImageSlot id={sol.cover.id} hint={sol.cover.hint} />
                  </div>
                  <Link
                    href={`/engineering-solutions/${sol.slug}`}
                    className="absolute inset-0"
                    aria-label={sol.label}
                  />
                  <span className="text-navy pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-bold">
                    {sol.label}
                  </span>
                </div>
              );
            })}

            {ordered[0].standard && (
              <span className="bg-navy absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-2xl px-4 py-3 text-[13px] leading-tight font-bold text-white shadow-xl max-lg:hidden">
                <span className="text-brand block text-[11px] tracking-widest uppercase">
                  Certified to
                </span>
                {ordered[0].standard}
              </span>
            )}
          </div>
        </div>

        {/* quick links to every system */}
        <div className="relative mx-auto max-w-[1240px] px-[22px] pb-14">
          <ul className="flex flex-wrap gap-2.5">
            {ordered.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/engineering-solutions/${s.slug}`}
                  className="border-navy/15 text-navy hover:bg-navy rounded-full border bg-white px-4 py-2 text-[14px] font-semibold transition-colors hover:text-white"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Product-solutions strip ---------- */}
      <SolutionCarousel items={carouselItems} />

      {/* ---------- Two-photo slider, by group ---------- */}
      <GroupSlider groups={sliderGroups} />

      {/* ---------- Find your system ---------- */}
      <section className="bg-white">
        <InView className="mx-auto grid max-w-[1240px] gap-10 px-[22px] py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="rv">
            <h2 className="text-navy text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
              Which system does your site need?
            </h2>
            <p className="text-mute mt-3 max-w-[420px] text-[17px] leading-relaxed">
              Start with the situation. Most sites combine two or three systems,
              and our team can confirm the right mix after a visit.
            </p>
          </div>
          <dl
            className="rv border-line divide-line divide-y border-y"
            style={delay(0.12)}
          >
            {needs.map(([situation, links]) => (
              <div
                key={situation}
                className="grid gap-2 py-4 sm:grid-cols-[1.2fr_1fr] sm:gap-6"
              >
                <dt className="text-navy text-[16px] font-bold">{situation}</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1">
                  {links.map(([label, slug]) => (
                    <Link
                      key={slug}
                      href={`/engineering-solutions/${slug}`}
                      className="text-brand-dark text-[15px] font-bold underline-offset-4 hover:underline"
                    >
                      {label}
                    </Link>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </InView>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="bg-navy text-white">
        <InView className="mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="rv max-w-[560px] text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
            One team from first visit to yearly check
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <li
                key={t}
                className="rv border-brand border-t-2 pt-5"
                style={delay(0.1 + i * 0.12)}
              >
                <p className="text-brand text-sm font-bold">Step {i + 1}</p>
                <h3 className="mt-1 text-2xl font-extrabold">{t}</h3>
                <p className="mt-2 max-w-[340px] text-white/75">{d}</p>
              </li>
            ))}
          </ol>
        </InView>
      </section>

      {/* ---------- Accreditations ---------- */}
      {/* <section className="bg-white">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-[22px] py-14 md:flex-row md:items-center md:justify-between">
          <p className="text-navy max-w-[300px] text-xl leading-snug font-extrabold">
            Certified for quality and safety management
          </p>
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {accreditations.map(([src, alt]) => (
              <li key={src}>
                <Image
                  src={src}
                  alt={alt}
                  width={160}
                  height={80}
                  className="h-16 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      </section> */}

      {/* ---------- CTA ---------- */}
      <section className="bg-[#fdf3e6]">
        <InView className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-[22px] py-20 md:flex-row md:items-end">
          <div className="rv max-w-[640px]">
            <h2 className="text-navy text-[clamp(30px,4.6vw,60px)] leading-[1.02] font-extrabold tracking-tight">
              Need a special solution for your site?
            </h2>
            <p className="text-mute mt-3 text-[17px]">
              Call {company.phone} or email {company.email}.
            </p>
          </div>
          <Link
            href="/contact-us#enquiry"
            className="rv bg-brand hover:bg-brand-dark rounded-full px-8 py-4 text-base font-bold text-white transition-colors"
            style={delay(0.2)}
          >
            Talk to an engineer →
          </Link>
        </InView>
      </section>
    </main>
  );
}
