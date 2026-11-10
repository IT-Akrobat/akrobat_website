'use client';
import { company } from '@/app/lib/nav-data';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

import SearchBox from './SearchBox';
import Sidebar from './Sidebar';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 -mb-24 px-4 pt-4 max-[480px]:px-2.5 max-[480px]:pt-2.5">
        <div className="pointer-events-auto mx-auto flex max-w-[1560px] items-center gap-3 p-2 max-[480px]:gap-2 max-[480px]:p-1.5">
          {/* Logo: no background, sits directly on the page, no bar background */}
          <Link
            href="/"
            aria-label="Akrobat home"
            className="flex flex-none items-center pr-2 pl-5 max-[480px]:pl-3"
          >
            <Image
              src="/akrobat-logo.png"
              alt="Akrobat"
              width={233}
              height={202}
              priority
              className="h-[58px] w-auto max-[480px]:h-11"
            />
          </Link>

          <div className="flex-1" />

          <SearchBox />

          <a
            href={company.phoneHref}
            aria-label={`Call us ${company.phone}`}
            className="bg-brand hover:bg-brand-dark flex h-12 flex-none items-center gap-2.5 rounded-full px-6 text-[15px] font-bold whitespace-nowrap text-white transition-colors max-[480px]:size-11 max-[480px]:justify-center max-[480px]:px-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-[18px] fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
              aria-hidden
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            <span className="max-[640px]:hidden">Call Us Now</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="group/mb bg-brand hover:bg-brand-dark flex size-12 flex-none cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full transition-colors duration-300 max-[480px]:size-11"
          >
            <span className="h-0.5 w-5 rounded-sm bg-white" />
            <span className="h-0.5 w-5 rounded-sm bg-white transition-all duration-300 group-hover/mb:w-3" />
            <span className="h-0.5 w-5 rounded-sm bg-white" />
          </button>
        </div>
      </header>

      <Sidebar open={menuOpen} onClose={closeMenu} />
    </>
  );
}
