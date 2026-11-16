import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { company, products, solutions } from '@/app/lib/nav-data';

import FooterCta from './FooterCta';

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Promotions & News', href: '/promotions-news' },
  { label: 'Contact Us', href: '/contact-us' },
];

const certs = [
  { src: '/pdf/bizsafe.jpg', alt: 'bizSAFE Star', w: 700, h: 496 },
  {
    src: '/pdf/iso9001.jpg',
    alt: 'ISO 9001 Quality Management',
    w: 600,
    h: 600,
  },
  {
    src: '/pdf/iso45001.jpg',
    alt: 'ISO 45001 Health and Safety Management',
    w: 600,
    h: 600,
  },
  {
    src: '/pdf/smf.jpg',
    alt: 'Singapore Manufacturing Federation',
    w: 206,
    h: 242,
  },
];

const colTitle =
  'mb-5 text-xs font-bold tracking-[0.22em] text-brand uppercase';
const link = 'text-[15px] text-white/70 transition-colors hover:text-white';

/* cached so the build can prerender the year (Cache Components) */
async function Year() {
  'use cache';
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="bg-[#08183a] text-white">
      <div className="mx-auto max-w-[1240px] px-[22px] pt-16">
        {/* Call-to-action (hidden on the Contact Us page) */}
        <Suspense fallback={null}>
          <FooterCta />
        </Suspense>

        {/* Columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <p className="text-2xl font-extrabold">{company.name}</p>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/65">
              Fall arrest and height safety specialist in Singapore since 2005.
            </p>
          </div>

          <div>
            <h3 className={colTitle}>Products</h3>
            <ul className="space-y-3">
              {products.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className={link}>
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={colTitle}>Solutions</h3>
            <ul className="space-y-3">
              {solutions.slice(0, 5).map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={link}>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/engineering-solutions"
                  className="text-brand text-[15px] font-semibold"
                >
                  All solutions →
                </Link>
              </li>
            </ul>
            <h3 className={`${colTitle} mt-8`}>Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={colTitle}>Visit &amp; contact</h3>
            <address className="space-y-1 text-[15px] leading-relaxed text-white/70 not-italic">
              {company.address.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </address>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li>
                <a href={company.phoneHref} className={link}>
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className={link}>
                  {company.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 px-[22px] py-6 text-sm text-white/50 sm:flex-row">
          <p>
            © <Year /> {company.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
            <p className="text-lg text-white/75">Our Accreditation:</p>
            <ul
              aria-label="Certifications and memberships"
              className="flex items-center gap-3"
            >
              {certs.map((c) => (
                <li key={c.src} className="rounded-md bg-white p-1">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    width={c.w}
                    height={c.h}
                    className="h-12 w-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Floating back-to-top button. Fades in after the page is scrolled
          (browsers without scroll-driven animations just always show it). */}
      <a
        href="#"
        aria-label="Back to top"
        className="back-to-top bg-brand hover:bg-brand-dark focus-visible:outline-navy fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full text-white shadow-[0_8px_24px_rgba(11,31,69,.3)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 md:right-8 md:bottom-8"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-6 fill-none stroke-current stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]"
          aria-hidden
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </a>
      <style>{`
        @supports (animation-timeline: scroll()) {
          .back-to-top {
            opacity: 0;
            pointer-events: none;
            animation: back-to-top-in linear both;
            animation-timeline: scroll(root);
            animation-range: 300px 500px;
          }
          @keyframes back-to-top-in {
            to { opacity: 1; pointer-events: auto; }
          }
        }
      `}</style>
    </footer>
  );
}
