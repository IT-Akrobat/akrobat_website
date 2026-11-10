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
          <a href="#" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
