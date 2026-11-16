import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import HeroSkyline from '@/app/components/home/HeroSkyline';
import InView from '@/app/components/products/InView';
import { company } from '@/app/lib/nav-data';
import { solutions } from '@/app/lib/solutions-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Founded in Singapore in 2005, Akrobat designs, installs and inspects height safety systems at more than 600 sites.',
};

const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });

const sectors = [
  'Subway stations',
  'Factories',
  'Shipyards',
  'Construction',
  'Airports',
];

const landmarks: [string, string[]][] = [
  [
    'In Singapore',
    ['Resorts World Sentosa', 'Fusionopolis', 'Marina Bay Sands'],
  ],
  [
    'Worldwide',
    [
      'Jebel Ali Airport, Dubai',
      'Abu Dhabi National Exhibition Centre (ADNEC)',
      'Dubai Sports Complex',
    ],
  ],
];

const promise = [
  [
    'Involved from start to end',
    'Our height safety specialists take part from conception and design through to complete installation.',
  ],
  [
    'Inspection and after-sales',
    'We inspect and service every system so it keeps performing for years.',
  ],
  [
    'Equipment that fits the system',
    'We supply personal protective equipment from trusted brands, compatible with our own systems, for head-to-foot protection.',
  ],
];

const accreditations = [
  ['/pdf/bizsafe.jpg', 'bizSAFE Star'],
  ['/pdf/iso9001.jpg', 'ISO 9001'],
  ['/pdf/iso45001.jpg', 'ISO 45001'],
  ['/pdf/smf.jpg', 'Singapore Manufacturing Federation'],
];

const pin = (
  <svg
    viewBox="0 0 24 24"
    aria-hidden
    className="size-5 shrink-0 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
  >
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export default function About() {
  const stats: [string, string][] = [
    ['2005', 'Founded in Singapore'],
    ['600+', 'Sites installed'],
    [`${solutions.length}`, 'Engineered systems'],
    ['ISO', '9001 and 45001 certified'],
  ];

  return (
    <main className="overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-[#fdf3e6]">
        <Image
          src="/about/about-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[.14]"
        />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-[22px] pt-36 pb-28 md:pt-40 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="text-navy text-[clamp(46px,8vw,118px)] leading-[0.92] font-extrabold tracking-tight">
              <span className="mask" style={delay(0.1)}>
                <span>The height</span>
              </span>
              <br />
              <span className="mask" style={delay(0.25)}>
                <span className="outline-text [--oc:var(--color-brand)]">
                  safety specialist
                </span>
              </span>
            </h1>
            <p
              className="text-mute mt-9 max-w-[560px] text-[19px] leading-relaxed"
              style={{ animation: 'hww-in 1s var(--ease-slow) .7s both' }}
            >
              Akrobat designs, installs and inspects the systems that let people
              work safely at height. We started in Singapore in 2005.
            </p>
            <div
              className="mt-7 flex flex-wrap gap-3"
              style={{ animation: 'hww-in 1s var(--ease-slow) .85s both' }}
            >
              <Link
                href="/engineering-solutions"
                className="bg-navy hover:bg-navy-2 rounded-full px-7 py-3.5 font-bold text-white transition-colors"
              >
                Our solutions
              </Link>
              <Link
                href="/contact-us#enquiry"
                className="border-navy/30 text-navy hover:bg-navy/5 rounded-full border px-7 py-3.5 font-bold transition-colors"
              >
                Talk to an engineer
              </Link>
            </div>
          </div>
          <div
            className="relative mx-auto h-[380px] w-full max-w-[560px] md:h-[440px]"
            style={{ animation: 'hww-in 1.1s var(--ease-slow) .5s both' }}
          >
            <HeroSkyline className="absolute inset-0 flex items-end justify-center" />
          </div>
        </div>
      </section>

      {/* ---------- Stats strip overlapping the hero ---------- */}
      <section className="relative z-10 bg-white">
        <div className="mx-auto max-w-[1240px] px-[22px]">
          <dl className="border-line -mt-14 grid grid-cols-2 divide-x divide-y divide-[var(--color-line)] overflow-hidden rounded-[28px] border bg-white md:grid-cols-4 md:divide-y-0">
            {stats.map(([n, l]) => (
              <div key={l} className="p-6 md:p-8">
                <dt className="text-navy text-[clamp(30px,3.6vw,46px)] leading-none font-extrabold">
                  {n}
                </dt>
                <dd className="text-mute mt-2 text-[15px] font-semibold">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------- Story ---------- */}
        <InView className="mx-auto grid max-w-[1240px] gap-10 px-[22px] py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <h2 className="rv text-navy text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
            An engineer’s company, built on fall prevention
          </h2>
          <div className="rv space-y-5" style={delay(0.12)}>
            <p className="text-navy text-[19px] leading-snug font-bold">
              Philippe Girardot, an engineer from École Centrale Paris, founded
              Akrobat in Singapore in 2005.
            </p>
            <p className="text-mute text-[17px] leading-relaxed">
              The company quickly became one of the leading and most innovative
              specialists in fall prevention and abseiling systems, with more
              than 600 references from every kind of site.
            </p>
            <ul className="flex flex-wrap gap-2 pt-1">
              {sectors.map((s) => (
                <li
                  key={s}
                  className="text-navy rounded-full bg-[#fdf3e6] px-4 py-1.5 text-[14px] font-semibold"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </InView>
      </section>

      {/* ---------- Mission ---------- */}
      <section className="bg-navy relative overflow-hidden text-white">
        <svg
          aria-hidden
          viewBox="0 0 400 400"
          className="absolute -top-10 -right-16 hidden w-[420px] opacity-[.07] md:block"
        >
          <g fill="none" stroke="#fff" strokeWidth="6">
            <path d="M20 380V120h120v260M140 380V40h120v340M260 380V160h120v220" />
          </g>
        </svg>
        <InView className="relative mx-auto max-w-[1240px] px-[22px] py-24">
          <h2 className="rv max-w-[760px] text-[clamp(30px,4.2vw,56px)] leading-[1.04] font-extrabold tracking-tight">
            Our mission is to make your workplace safer.
          </h2>
          <p
            className="rv mt-4 max-w-[560px] text-[18px] text-white/75"
            style={delay(0.1)}
          >
            We do it by proposing the most comprehensive safety solutions for
            your site.
          </p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {promise.map(([t, d], i) => (
              <li
                key={t}
                className="rv border-brand rounded-[22px] border-t-4 bg-white/[.06] p-7"
                style={delay(0.15 + i * 0.12)}
              >
                <h3 className="text-xl font-extrabold">{t}</h3>
                <p className="mt-3 text-white/75">{d}</p>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      {/* ---------- Landmark projects ---------- */}
      <section className="bg-[#f6f8fc]">
        <InView className="mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="rv text-navy max-w-[640px] text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
            Landmark projects
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {landmarks.map(([place, list], i) => (
              <div
                key={place}
                className="rv border-line overflow-hidden rounded-[26px] border bg-white"
                style={delay(0.1 + i * 0.12)}
              >
                <h3
                  className={`flex items-center gap-2 px-8 py-5 text-lg font-extrabold text-white ${i ? 'bg-brand' : 'bg-navy'}`}
                >
                  {pin}
                  {place}
                </h3>
                <ul className="divide-line divide-y px-8 pb-3">
                  {list.map((p) => (
                    <li
                      key={p}
                      className="text-navy py-4 text-[19px] leading-snug font-bold"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/projects"
            className="rv text-brand-dark mt-8 inline-block font-bold underline underline-offset-4"
          >
            See all projects
          </Link>
        </InView>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="bg-white">
        <InView className="mx-auto grid max-w-[1240px] gap-10 px-[22px] py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="rv">
            <h2 className="text-navy text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
              Systems and equipment, from one supplier
            </h2>
            <p className="text-mute mt-4 max-w-[440px] text-[17px] leading-relaxed">
              Our {solutions.length} engineered systems are backed by a full
              range of fall arrest, rope access and rescue equipment.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/engineering-solutions"
                className="bg-navy hover:bg-navy-2 rounded-full px-6 py-3 font-bold text-white transition-colors"
              >
                Engineering solutions
              </Link>
              <Link
                href="/products"
                className="border-navy/30 text-navy hover:bg-navy/5 rounded-full border px-6 py-3 font-bold transition-colors"
              >
                Products
              </Link>
            </div>
          </div>
          <ul className="rv grid gap-3 sm:grid-cols-2" style={delay(0.12)}>
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/engineering-solutions/${s.slug}`}
                  className="border-line text-navy hover:border-brand group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 font-bold transition-colors hover:bg-[#fdf3e6]"
                >
                  {s.label}
                  <span
                    aria-hidden
                    className="text-brand transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </InView>
      </section>

      {/* ---------- Accreditations ---------- */}
      <section className="border-line border-y bg-white">
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
      </section>

      {/* ---------- Visit / contact ---------- */}
      <section className="bg-[#fdf3e6]">
        <InView className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-[22px] py-20 md:flex-row md:items-end">
          <div className="rv">
            <h2 className="text-navy max-w-[560px] text-[clamp(30px,4.6vw,60px)] leading-[1.02] font-extrabold tracking-tight">
              Talk to the people who design it.
            </h2>
            <address className="text-mute mt-4 text-[17px] leading-relaxed not-italic">
              {company.address.join(', ')}
              <br />
              {company.phone} · {company.email}
            </address>
          </div>
          <Link
            href="/contact-us#enquiry"
            className="rv bg-brand hover:bg-brand-dark rounded-full px-8 py-4 text-base font-bold text-white transition-colors"
            style={delay(0.2)}
          >
            Contact us →
          </Link>
        </InView>
      </section>
    </main>
  );
}
