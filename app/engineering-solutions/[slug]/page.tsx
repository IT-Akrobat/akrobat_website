import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ImageSlot from '@/app/components/products/ImageSlot';
import InView from '@/app/components/products/InView';
import { company } from '@/app/lib/nav-data';
import { findSolution, solutions } from '@/app/lib/solutions-data';

type Props = { params: Promise<{ slug: string }> };
const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });
const anchor = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const generateStaticParams = () =>
  solutions.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = findSolution((await params).slug);
  return s ? { title: s.label, description: s.lead } : {};
}

export default async function SolutionPage({ params }: Props) {
  const s = findSolution((await params).slug);
  if (!s) notFound();
  const i = solutions.indexOf(s);
  const prev = solutions[(i - 1 + solutions.length) % solutions.length];
  const next = solutions[(i + 1) % solutions.length];

  return (
    <main className="overflow-x-clip">
      {/* ---------- Hero: full-width photo card, text laid over it ---------- */}
      <section className="bg-white px-[14px] pt-28 pb-4 sm:px-[22px]">
        <div className="group bg-navy relative mx-auto flex min-h-[620px] max-w-[1400px] flex-col justify-between overflow-hidden rounded-[32px] lg:min-h-[680px]">
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]">
            <ImageSlot id={s.cover.id} hint={s.cover.hint} dark />
          </div>
          <div className="from-navy via-navy/55 to-navy/20 absolute inset-0 bg-gradient-to-t" />

          {/* top row */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 p-6 sm:p-10">
            <nav aria-label="Breadcrumb" className="text-sm text-white/75">
              <Link href="/engineering-solutions" className="hover:text-white">
                Engineering Solutions
              </Link>
              <span className="px-2">/</span>
              <span className="font-semibold text-white">{s.label}</span>
            </nav>
            {s.standard && (
              <span
                className="bg-brand rounded-full px-4 py-1.5 text-sm font-bold text-white"
                style={{ animation: 'hww-in 1s var(--ease-slow) .5s both' }}
              >
                {s.standard}
              </span>
            )}
          </div>

          {/* bottom row */}
          <div className="relative grid items-end gap-8 p-6 pt-0 sm:p-10 sm:pt-0 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h1 className="text-[clamp(40px,6vw,88px)] leading-[0.96] font-extrabold tracking-tight text-white">
                <span className="mask" style={delay(0.1)}>
                  <span>{s.label}</span>
                </span>
              </h1>
              <p
                className="mt-5 max-w-[560px] text-[18px] leading-relaxed text-white/85"
                style={{ animation: 'hww-in 1s var(--ease-slow) .6s both' }}
              >
                {s.lead}
              </p>
              <div
                className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
                style={{ animation: 'hww-in 1s var(--ease-slow) .8s both' }}
              >
                <Link
                  href="/contact-us#enquiry"
                  className="bg-brand hover:bg-brand-dark rounded-full px-7 py-3.5 font-bold text-white transition-colors"
                >
                  Request a quote
                </Link>
                <a
                  href={company.phoneHref}
                  className="border-brand border-b-2 pb-0.5 font-bold text-white"
                >
                  Call {company.phone}
                </a>
              </div>
            </div>

            {/* spec cards */}
            <dl
              className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1"
              style={{ animation: 'hww-in 1s var(--ease-slow) .9s both' }}
            >
              {s.facts.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 backdrop-blur-md max-sm:flex-col max-sm:items-start max-sm:gap-1 lg:flex-row"
                >
                  <dt className="text-sm font-semibold text-white/75">{k}</dt>
                  <dd className="text-lg font-extrabold text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ---------- Body: contents + sections on the lifeline ---------- */}
      <div className="mx-auto grid max-w-[1240px] gap-10 px-[22px] py-16 lg:grid-cols-[220px_1fr] lg:gap-14">
        {s.sections.length > 1 && (
          <aside className="hidden lg:block">
            <nav
              aria-label="On this page"
              className="border-navy/15 sticky top-28 border-l-2"
            >
              <p className="text-navy mb-3 pl-4 text-sm font-extrabold">
                On this page
              </p>
              <ul className="space-y-1">
                {s.sections.map((sec) => (
                  <li key={sec.title}>
                    <a
                      href={`#${anchor(sec.title)}`}
                      className="text-mute hover:text-brand-dark block py-1 pl-4 text-[15px] leading-snug font-semibold"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        <div
          className={`relative ${s.sections.length > 1 ? '' : 'lg:col-span-2'}`}
        >
          <span
            aria-hidden
            className="bg-navy/15 absolute top-2 bottom-2 left-[11px] w-[2px]"
          />
          {s.sections.map((sec) => (
            <section
              key={sec.title}
              id={anchor(sec.title)}
              className="relative scroll-mt-28 pb-16 pl-[44px] last:pb-0"
            >
              <span
                aria-hidden
                className="border-brand bg-surf absolute top-2 left-[3px] size-[18px] rounded-[4px] border-2"
              />
              <InView
                className={`grid items-start gap-8 ${sec.image ? 'xl:grid-cols-2 xl:gap-12' : ''}`}
              >
                <div className="rv">
                  <h2 className="text-navy text-[clamp(26px,3.2vw,40px)] leading-tight font-extrabold tracking-tight">
                    {sec.title}
                  </h2>
                  {sec.body && (
                    <p className="text-mute mt-4 max-w-[540px] text-[17px] leading-relaxed">
                      {sec.body}
                    </p>
                  )}
                  {sec.points && (
                    <ul className="mt-5 space-y-3">
                      {sec.points.map((p) => (
                        <li
                          key={p}
                          className="text-navy flex gap-3 text-[16px] leading-snug"
                        >
                          <span
                            aria-hidden
                            className="bg-brand mt-[7px] size-2 shrink-0 rounded-full"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}
                  {sec.specs && (
                    <dl className="divide-line border-line mt-5 divide-y border-y">
                      {sec.specs.map(([name, spec]) => (
                        <div
                          key={name}
                          className="grid gap-1 py-3 sm:grid-cols-[1fr_1.3fr] sm:gap-6"
                        >
                          <dt className="text-navy font-bold">{name}</dt>
                          <dd className="text-mute text-[15px]">{spec}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {sec.link && (
                    <a
                      href={sec.link.href}
                      className="bg-navy hover:bg-navy-2 mt-6 inline-block rounded-full px-6 py-3 text-[15px] font-bold text-white transition-colors"
                    >
                      {sec.link.label}
                    </a>
                  )}
                </div>
                {sec.image && (
                  <div
                    className="rv aspect-[4/3] overflow-hidden rounded-[24px] xl:sticky xl:top-28"
                    style={delay(0.15)}
                  >
                    <ImageSlot id={sec.image.id} hint={sec.image.hint} />
                  </div>
                )}
              </InView>
            </section>
          ))}
        </div>
      </div>

      {/* ---------- Previous / next ---------- */}
      <section className="border-line border-y bg-white">
        <div className="mx-auto grid max-w-[1240px] sm:grid-cols-2">
          {[
            ['Previous', prev],
            ['Next', next],
          ].map(([dir, x], n) => {
            const t = x as typeof prev;
            return (
              <Link
                key={t.slug}
                href={`/engineering-solutions/${t.slug}`}
                className={`px-[22px] py-8 transition-colors hover:bg-[#f6f8fc] ${n ? 'border-line sm:border-l sm:text-right' : ''}`}
              >
                <span className="text-mute text-sm font-semibold">
                  {dir as string}
                </span>
                <span className="text-navy mt-1 block text-xl font-extrabold">
                  {t.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-navy text-white">
        <InView className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-[22px] py-20 md:flex-row md:items-end">
          <div className="rv max-w-[640px]">
            <h2 className="text-[clamp(28px,4vw,52px)] leading-[1.04] font-extrabold tracking-tight">
              Need a special solution for your site?
            </h2>
            <p className="mt-3 text-white/75">
              Call {company.phone} or email {company.email}.
            </p>
          </div>
          <div className="rv flex flex-wrap gap-3" style={delay(0.2)}>
            <Link
              href="/contact-us#enquiry"
              className="bg-brand hover:bg-brand-dark rounded-full px-8 py-4 font-bold text-white transition-colors"
            >
              Talk to an engineer →
            </Link>
            <Link
              href="/engineering-solutions"
              className="rounded-full border border-white/40 px-8 py-4 font-bold transition-colors hover:bg-white/10"
            >
              All solutions
            </Link>
          </div>
        </InView>
      </section>
    </main>
  );
}
