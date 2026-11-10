'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { company } from '@/app/lib/nav-data';

/* The orange "Working at height?" band. It already says "contact us", so it
   is hidden on the Contact Us page itself. */
export default function FooterCta() {
  const pathname = usePathname();
  if (pathname.startsWith('/contact-us')) return null;

  return (
    <div className="bg-brand flex flex-col items-start justify-between gap-6 rounded-[28px] px-8 py-9 md:flex-row md:items-center md:px-12">
      <div>
        <h2 className="text-[clamp(24px,3vw,36px)] leading-tight font-extrabold tracking-tight">
          Working at height? Let’s make it safe.
        </h2>
        <p className="mt-2 text-[16px] text-white/90">
          Talk to our team about equipment, installation or inspection.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={company.phoneHref}
          className="text-navy rounded-full bg-white px-7 py-3.5 text-[15px] font-bold transition-colors hover:bg-[#fdf3e6]"
        >
          {company.phone}
        </a>
        <Link
          href="/contact-us#enquiry"
          className="bg-navy rounded-full px-7 py-3.5 text-[15px] font-bold transition-colors hover:bg-[#14306b]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
