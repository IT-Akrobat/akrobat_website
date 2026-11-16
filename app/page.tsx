import Link from 'next/link';

import { products, solutions } from '@/app/lib/nav-data';
import { news } from '@/app/lib/news-data';

import HeroSlideshow from './components/home/HeroSlideshow';
import HowWeWork from './components/home/HowWeWork';
import ProductTiles from './components/home/ProductTiles';
import ProjectsSection from './components/home/ProjectsSection';
import Reveal from './components/home/RevealFromLeft';
import InView from './components/products/InView';

const stats = [
  { value: '2005', label: 'Founded in Singapore' },
  { value: '600+', label: 'Sites with height safety systems' },
  { value: `${products.length}`, label: 'Product ranges' },
  { value: `${solutions.length}`, label: 'Engineering solutions' },
];

const eyebrow =
  'text-brand-dark mb-3 text-sm font-bold tracking-[0.2em] uppercase';
const h2 =
  'text-navy text-[clamp(28px,3.6vw,44px)] leading-tight font-extrabold tracking-tight';

const aboutHeading =
  'A leading fall arrest and fall prevention brand in Singapore';
const delay = (n: number) => ({ ['--rd' as string]: `${n}s` });

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100svh+24px)] items-center overflow-hidden bg-[#0b1f45]">
        <HeroSlideshow />

        <div className="pointer-events-none relative z-10 mx-auto w-full max-w-[1240px] px-[22px] py-28 md:py-36">
          <p className="text-brand mb-5 flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase">
            <span className="bg-brand h-[3px] w-9" />
            Height safety specialist
          </p>
          <h1 className="max-w-[680px] text-[clamp(34px,5vw,72px)] leading-[1.08] font-extrabold tracking-tight [text-shadow:0_2px_18px_rgba(0,0,0,.45)]">
            <span className="text-white">Fall arrest system and </span>
            <span className="text-brand">rope access</span>
          </h1>
          <p className="mt-6 max-w-[520px] text-[clamp(16px,1.4vw,20px)] leading-relaxed text-white [text-shadow:0_1px_10px_rgba(0,0,0,.55)]">
            Akrobat Pte Ltd engineers, installs and certifies height safety
            systems for roofs, plants and high-rise buildings across Singapore.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="bg-brand hover:bg-brand-dark pointer-events-auto rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              Explore products
            </Link>
            <Link
              href="/contact-us#enquiry"
              className="hover:text-navy pointer-events-auto rounded-full border-2 border-white px-7 py-[12px] text-[15px] font-bold text-white transition-colors hover:bg-white"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 mx-auto -mt-14 max-w-[1240px] px-[22px]">
        <Reveal
          from="up"
          className="border-line grid grid-cols-2 gap-y-8 rounded-[28px] border bg-white px-4 py-8 shadow-[0_20px_50px_rgba(11,31,69,.12)] md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-[#e3e7ee]"
        >
          {stats.map((s) => (
            <div key={s.label} className="px-6 text-center">
              <p className="text-navy text-[clamp(32px,3.6vw,46px)] leading-none font-extrabold">
                {s.value}
                <span className="bg-brand mx-auto mt-3 block h-[3px] w-8 rounded-full" />
              </p>
              <p className="text-mute mt-3 text-[14.5px]">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* About */}
      <section className="overflow-hidden">
        <InView className="mx-auto grid max-w-[1240px] gap-10 px-[22px] py-20 md:grid-cols-2 md:gap-16">
          <div>
            <p className={`${eyebrow} rv rv-l`}>About Akrobat</p>
            <span
              aria-hidden
              className="draw bg-brand mb-5 block h-[3px] w-24 rounded-full"
              style={delay(0.15)}
            />
            <h2 className={h2}>
              {aboutHeading.split(' ').map((w, k) => (
                <span
                  key={w + k}
                  className="rv mr-[0.25em] inline-block"
                  style={delay(0.2 + k * 0.07)}
                >
                  {w}
                </span>
              ))}
            </h2>
          </div>
          <div className="text-mute space-y-4 text-[17px] leading-relaxed">
            <p className="rv rv-r" style={delay(0.35)}>
              Akrobat Pte Ltd was founded in Singapore in 2005 and the company
              has grown to become one of the leading innovative specialists in
              fall protection and access systems with more than 800 references.
              We have completed major landmark projects in Singapore such as
              Garden by the Bay, Marina Bay Sands, Resort World Sentosa and
              more. We also have some major projects worldwide: Al Maktoum
              International Airport in Dubai, Abu Dhabi Exposition Centre and
              Okada Hotel-Manila….. We provide everything from
              Design-engineering up to installation and inspection. Besides our
              activities as safety systems designers and installers, we provide
              a wide range of personal protective equipment (PPE) related to
              working at heights.
            </p>

            <div className="rv" style={delay(0.7)}>
              <Link
                href="/about"
                className="group text-navy relative inline-flex items-center gap-2 pb-1 font-semibold"
              >
                More about us
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                  →
                </span>
                <span className="bg-brand absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-[0.35] transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </div>
          </div>
        </InView>
      </section>

      {/* Products */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-[22px] py-20">
          <p className={eyebrow}>Products</p>
          <h2 className={h2}>Equipment for every height</h2>
          <ProductTiles />
        </div>
      </section>

      {/* Engineering solutions */}
      <section className="mx-auto max-w-[1240px] px-[22px] py-20">
        <p className={eyebrow}>Engineering solutions</p>
        <h2 className={h2}>Designed, installed and certified</h2>
        <div className="mt-10 grid gap-x-8 sm:grid-cols-2">
          {solutions.map((s, i) => (
            <Link
              key={s.href}
              href={s.href}
              className="border-line hover:text-brand flex items-center gap-4 border-b py-4 text-[17px] font-medium transition-colors"
            >
              <span className="text-brand-dark w-7 text-sm font-bold">
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.label}
            </Link>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1000px] px-[22px] py-20">
          <p className={eyebrow}>How we work</p>
          <h2 className={h2}>From first visit to re-certification</h2>
          <p className="text-mute mt-4 max-w-[560px] text-[17px] leading-relaxed">
            Height safety never stops at installation. Every system returns to
            inspection and re-certification, and the cycle begins again.
          </p>
          <HowWeWork />
        </div>
      </section>

      {/* Promotions & News */}
      <section className="mx-auto max-w-[1240px] px-[22px] py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Promotions &amp; News</p>
            <h2 className={h2}>What’s new at Akrobat</h2>
          </div>
          <Link
            href="/promotions-news"
            className="text-navy border-brand border-b-2 pb-1 font-semibold"
          >
            View all
          </Link>
        </div>

        {news.length > 0 ? (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.slice(0, 3).map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="border-line hover:border-brand rounded-3xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,31,69,.12)]"
              >
                <p className="text-brand-dark text-xs font-bold tracking-[0.18em] uppercase">
                  {n.date}
                </p>
                <h3 className="text-navy mt-3 text-xl font-bold">{n.title}</h3>
                <p className="text-mute mt-2 text-[15px] leading-relaxed">
                  {n.summary}
                </p>
                <span className="text-brand-dark mt-5 inline-block text-sm font-bold">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-navy mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] px-8 py-9 text-white md:flex-row md:items-center md:px-12">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Current offers and company updates
              </h3>
              <p className="mt-2 max-w-[520px] text-[16px] text-white/75">
                See our latest promotions, product news and announcements.
              </p>
            </div>
            <Link
              href="/promotions-news"
              className="bg-brand hover:bg-brand-dark rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              See promotions &amp; news
            </Link>
          </div>
        )}
      </section>

      {/* Projects */}
      <ProjectsSection />
    </main>
  );
}
