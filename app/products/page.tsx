import type { Metadata } from 'next';
import Link from 'next/link';

import InView from '@/app/components/products/InView';
import ProductsShowcase, {
  type ShowcaseGroup,
} from '@/app/components/products/ProductsShowcase';
import { products } from '@/app/lib/nav-data';
import { categoryMeta } from '@/app/lib/product-data';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Fall arrest equipment, mobile fall protection, anchorage systems, roof clamps and rescue equipment from Akrobat.',
};

const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });

export default function ProductsIndex() {
  const groups: ShowcaseGroup[] = products.map((g) => ({
    href: g.href,
    label: g.label,
    children: g.children,
    ...categoryMeta[g.href],
  }));
  const total = products.reduce((n, g) => n + g.children.length, 0);
  const band = [
    ...products.map((g) => g.label),
    ...products.map((g) => g.label),
  ];

  return (
    <main className="overflow-x-clip">
      {/* ---- Hero ---- */}
      <section className="relative isolate overflow-hidden bg-[#fdf3e6]">
        <span
          aria-hidden
          className="hww-spin-slow border-brand/40 absolute top-1/2 -right-40 -z-10 size-[620px] -translate-y-1/2 rounded-full border-2 border-dashed"
        />
        <span
          aria-hidden
          className="hww-spin-fast absolute top-1/2 -right-40 -z-10 size-[620px] -translate-y-1/2 rounded-full"
        >
          <span className="bg-brand absolute -top-1.5 left-1/2 size-3 rounded-full shadow-[0_0_16px_4px_rgba(247,134,30,.7)]" />
        </span>
        <div className="mx-auto flex min-h-[calc(100svh-180px)] max-w-[1240px] flex-col justify-center px-[22px] py-16">
          <p className="text-brand-dark mb-6 flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase">
            <span className="bg-brand h-[3px] w-9" />
            Akrobat catalogue
          </p>
          <h1 className="text-navy text-[clamp(52px,10vw,150px)] leading-[0.92] font-extrabold tracking-tight">
            <span className="mask" style={delay(0.1)}>
              <span>Gear for</span>
            </span>
            <br />
            <span className="mask" style={delay(0.25)}>
              <span className="outline-text [--oc:var(--color-brand)]">
                every height
              </span>
            </span>
          </h1>
          <div
            className="mt-10 flex flex-wrap items-end gap-x-14 gap-y-6"
            style={{ animation: 'hww-in 1s var(--ease-slow) .7s both' }}
          >
            <p className="text-mute max-w-[420px] text-[18px] leading-relaxed">
              Everything you need to work safely at height, from a single
              carabiner to a permanent anchorage system.
            </p>
            <div className="flex gap-10">
              <p className="text-navy text-5xl leading-none font-extrabold">
                {products.length}
                <small className="text-mute mt-2 block text-sm font-semibold">
                  ranges
                </small>
              </p>
              <p className="text-navy text-5xl leading-none font-extrabold">
                {total}
                <small className="text-mute mt-2 block text-sm font-semibold">
                  products
                </small>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Band ---- */}
      <div className="bg-navy overflow-hidden py-4 text-white" aria-hidden>
        <div className="marquee">
          {[...band, ...band].map((m, i) => (
            <span
              key={i}
              className="flex items-center text-xl font-extrabold tracking-wide whitespace-nowrap uppercase"
            >
              <span className="px-8">{m}</span>
              <span className="text-brand">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---- Scroll-linked showcase ---- */}
      <section className="bg-[#f6f8fc]">
        <ProductsShowcase groups={groups} />
      </section>

      {/* ---- Closing ---- */}
      <section className="bg-navy text-white">
        <InView className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-[22px] py-20 md:flex-row md:items-end">
          <h2 className="rv max-w-[640px] text-[clamp(30px,4.6vw,60px)] leading-[1.02] font-extrabold tracking-tight">
            Need help choosing the{' '}
            <span className="text-brand">right system?</span>
          </h2>
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
