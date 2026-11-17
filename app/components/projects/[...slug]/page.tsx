import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  allProjectSlugs,
  landmarks,
  sectorHref,
  sectors,
  singaporeSectors,
  type Sector,
} from '@/app/lib/projects-data';

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return allProjectSlugs.map((slug) => ({ slug }));
}

function resolve(
  slug: string[],
): { kind: 'region' } | { kind: 'sector'; sector: Sector } | null {
  const key = slug.join('/');
  if (key === 'singapore-projects') return { kind: 'region' };
  const sector = sectors.find((s) => sectorHref(s) === `/projects/${key}`);
  return sector ? { kind: 'sector', sector } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = resolve((await params).slug);
  if (!r) return {};
  if (r.kind === 'region') return { title: 'Singapore Projects' };
  return { title: r.sector.label, description: r.sector.blurb };
}

const back = (
  <Link
    href="/projects"
    className="text-brand-dark text-sm font-bold underline-offset-4 hover:underline"
  >
    All projects
  </Link>
);

function Hero({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-[#fdf3e6]">
      <div className="mx-auto max-w-[1240px] px-[22px] pt-28 pb-12">
        {back}
        <h1
          className="text-navy mt-4 text-[clamp(34px,5vw,64px)] leading-none font-extrabold tracking-tight"
          style={{ animation: 'hww-in 1s var(--ease-slow) .1s both' }}
        >
          {title}
        </h1>
        <p
          className="text-mute mt-4 max-w-[560px] text-[18px] leading-relaxed"
          style={{ animation: 'hww-in 1s var(--ease-slow) .3s both' }}
        >
          {text}
        </p>
      </div>
    </section>
  );
}

function SectorLinks({ list, current }: { list: Sector[]; current?: string }) {
  return (
    <ul className="border-navy border-t-2">
      {list.map((s) => (
        <li key={s.id} className="border-line border-b">
          <Link
            href={sectorHref(s)}
            aria-current={s.id === current ? 'page' : undefined}
            className={`focus-visible:outline-brand group flex items-baseline justify-between gap-4 py-5 focus-visible:outline-2 ${
              s.id === current
                ? 'text-brand-dark'
                : 'text-navy hover:text-brand-dark'
            }`}
          >
            <span className="text-[clamp(24px,3.4vw,44px)] leading-[1.05] font-extrabold tracking-tight">
              {s.label}
            </span>
            <span
              aria-hidden
              className="text-xl transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectSubPage({ params }: Props) {
  const r = resolve((await params).slug);
  if (!r) notFound();

  if (r.kind === 'region') {
    return (
      <main>
        <Hero
          title="Singapore projects"
          text="Height safety systems we have designed, installed and inspected across Singapore, by sector."
        />
        <section className="bg-white">
          <div className="mx-auto max-w-[1240px] px-[22px] py-20">
            <SectorLinks list={singaporeSectors} />
          </div>
        </section>
      </main>
    );
  }

  const { sector } = r;
  const isIntl = sector.region === 'International';
  const named = isIntl
    ? (landmarks.find((l) => l.place === 'Worldwide')?.items ?? [])
    : sector.projects;
  const list = isIntl ? sector.projects.concat(named) : sector.projects;
  const others = singaporeSectors.filter((s) => s.id !== sector.id);

  return (
    <main>
      <Hero title={sector.label} text={sector.blurb} />

      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="text-navy mb-8 text-[clamp(24px,2.6vw,34px)] font-extrabold tracking-tight">
            {isIntl ? 'Landmark projects worldwide' : 'Projects'}
          </h2>
          {list.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((p) => (
                <li
                  key={p}
                  className="border-line overflow-hidden rounded-[24px] border"
                >
                  <div
                    role="img"
                    aria-label="Picture to be added"
                    className="bg-navy aspect-[16/10] p-3"
                  >
                    <div className="size-full rounded-[16px] border-2 border-dashed border-white/25" />
                  </div>
                  <p className="text-navy p-5 text-xl leading-snug font-extrabold">
                    {p}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-navy/25 text-mute rounded-[24px] border-2 border-dashed p-10 text-[17px]">
              Project list and pictures to be added.
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#f6f8fc]">
        <div className="mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="text-navy mb-8 text-[clamp(24px,2.6vw,34px)] font-extrabold tracking-tight">
            {isIntl ? 'Singapore sectors' : 'Other sectors'}
          </h2>
          <SectorLinks list={isIntl ? singaporeSectors : others} />
          {!isIntl && (
            <p className="mt-8">
              <Link
                href="/projects/international"
                className="text-brand-dark font-bold underline underline-offset-4"
              >
                International projects
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
