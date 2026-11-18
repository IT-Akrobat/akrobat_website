import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

import { company } from '@/app/lib/nav-data';
import {
  allProjectSlugs,
  landmarks,
  sectorHref,
  sectors,
  singaporeSectors,
  slugify,
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
  if (!r || r.kind === 'region') return {};
  return { title: `${r.sector.label} projects`, description: r.sector.blurb };
}

const gridBg = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
  backgroundSize: '40px 40px',
};

/* Photo gallery: 1 photo = wide, 2 = side by side, 3+ = tidy grid. */
function Gallery({ name, images }: { name: string; images: string[] }) {
  const cols =
    images.length === 1
      ? 'grid-cols-1'
      : images.length === 2
        ? 'grid-cols-2'
        : 'grid-cols-2 lg:grid-cols-3';
  const ratio = images.length === 1 ? 'aspect-[16/9]' : 'aspect-[4/3]';
  return (
    <ul className={`grid gap-3 sm:gap-4 ${cols}`}>
      {images.map((src, i) => (
        <li
          key={src}
          className={`bg-navy group relative overflow-hidden rounded-[20px] shadow-[0_14px_30px_rgba(11,31,69,.14)] ${ratio}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${name}, photo ${i + 1}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </li>
      ))}
    </ul>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          role="img"
          aria-label={`Picture of ${label} to be added`}
          className="slot-dark grid aspect-[4/3] place-items-center rounded-[20px] text-sm font-semibold text-white/70"
        >
          Picture to be added
        </div>
      ))}
    </div>
  );
}

export default async function ProjectSubPage({ params }: Props) {
  const r = resolve((await params).slug);
  if (!r) notFound();
  if (r.kind === 'region') redirect('/projects');

  const { sector } = r;
  const isIntl = sector.region === 'International';
  const sites = sector.sites ?? [];
  const others = sector.others ?? [];
  const photoCount = sites.reduce((n, s) => n + s.images.length, 0);
  const worldwide = landmarks.find((l) => l.place === 'Worldwide')?.items ?? [];
  const otherSectors = sectors.filter((s) => s.id !== sector.id);

  return (
    <main className="bg-bg overflow-x-clip">
      {/* ---------- Hero ---------- */}
      <section
        className="bg-navy relative overflow-hidden rounded-b-[48px] text-white"
        style={gridBg}
      >
        <div className="relative mx-auto max-w-[1240px] px-[22px] pt-32 pb-16">
          <nav
            aria-label="Breadcrumb"
            className="text-sm font-semibold text-white/60"
          >
            <Link href="/projects" className="hover:text-white">
              Projects
            </Link>
            <span aria-hidden> / </span>
            <span className="text-brand">
              {isIntl ? 'International' : 'Singapore'}
            </span>
            {!isIntl && (
              <>
                <span aria-hidden> / </span>
                <span className="text-white">{sector.label}</span>
              </>
            )}
          </nav>

          <h1
            className="mt-4 text-[clamp(40px,6.4vw,84px)] leading-none font-extrabold tracking-tight"
            style={{ animation: 'hww-in 1s var(--ease-slow) .1s both' }}
          >
            {sector.label}
          </h1>
          <p
            className="mt-5 max-w-[560px] text-[19px] leading-relaxed text-white/75"
            style={{ animation: 'hww-in 1s var(--ease-slow) .25s both' }}
          >
            {sector.blurb}
          </p>

          {(sites.length > 0 || others.length > 0) && (
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {sites.length > 0 && (
                <div>
                  <dt className="text-sm font-semibold text-white/60">
                    {isIntl ? 'Countries' : 'Featured sites'}
                  </dt>
                  <dd className="text-3xl font-extrabold">{sites.length}</dd>
                </div>
              )}
              {photoCount > 0 && (
                <div>
                  <dt className="text-sm font-semibold text-white/60">
                    Photos
                  </dt>
                  <dd className="text-3xl font-extrabold">{photoCount}</dd>
                </div>
              )}
              {others.length > 0 && (
                <div>
                  <dt className="text-sm font-semibold text-white/60">
                    More sites
                  </dt>
                  <dd className="text-3xl font-extrabold">{others.length}</dd>
                </div>
              )}
            </dl>
          )}

          {isIntl && worldwide.length > 0 && (
            <p className="mt-6 max-w-[640px] text-[15px] leading-relaxed text-white/70">
              <span className="text-brand font-bold">Landmarks: </span>
              {worldwide.join(' · ')}
            </p>
          )}

          {/* jump links */}
          {(sites.length > 0 || others.length > 0) && (
            <ul className="mt-10 flex flex-wrap gap-2.5">
              {sites.map((s) => (
                <li key={s.name}>
                  <a
                    href={`#${slugify(s.name)}`}
                    className="hover:bg-brand hover:border-brand focus-visible:outline-brand rounded-full border border-white/30 px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
              {others.length > 0 && (
                <li>
                  <a
                    href="#more-sites"
                    className="bg-brand focus-visible:outline-brand rounded-full border border-transparent px-4 py-2 text-sm font-bold transition-colors hover:bg-white hover:text-[#0b1f45] focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    More sites
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ---------- Site galleries ---------- */}
      {sites.length > 0 ? (
        sites.map((site, i) => (
          <section
            key={site.name}
            id={slugify(site.name)}
            className={`scroll-mt-24 ${i % 2 === 0 ? 'bg-bg' : 'bg-white'}`}
          >
            <div className="mx-auto grid max-w-[1240px] gap-8 px-[22px] py-16 lg:grid-cols-[0.55fr_1.45fr] lg:gap-14 lg:py-20">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-brand text-sm font-bold tracking-[0.2em]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="text-navy mt-2 text-[clamp(28px,3.4vw,44px)] leading-tight font-extrabold tracking-tight">
                  {site.name}
                </h2>
                <p className="text-mute mt-3 text-[15px] font-semibold">
                  {site.images.length}{' '}
                  {site.images.length === 1 ? 'photo' : 'photos'}
                </p>
              </div>
              <Gallery name={site.name} images={site.images} />
            </div>
          </section>
        ))
      ) : (
        <section className="bg-bg">
          <div className="mx-auto max-w-[1240px] px-[22px] py-20">
            <h2 className="text-navy mb-8 text-[clamp(24px,2.6vw,34px)] font-extrabold tracking-tight">
              Projects
            </h2>
            <Placeholder label={sector.label} />
          </div>
        </section>
      )}

      {/* ---------- More sites (no photos) ---------- */}
      {others.length > 0 && (
        <section
          id="more-sites"
          className="bg-navy relative scroll-mt-24 overflow-hidden rounded-t-[48px] text-white"
          style={gridBg}
        >
          <div className="relative mx-auto max-w-[1240px] px-[22px] py-20">
            <h2 className="text-[clamp(26px,3vw,40px)] leading-tight font-extrabold tracking-tight">
              More {sector.label.toLowerCase()} sites
            </h2>
            <p className="mt-2 max-w-[520px] text-[17px] text-white/70">
              Systems we have designed and installed.
            </p>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li
                  key={o.name}
                  className="flex flex-col rounded-[24px] border border-white/15 bg-white/[.06] p-6 backdrop-blur-sm"
                >
                  <h3 className="text-xl leading-snug font-extrabold">
                    {o.name}
                  </h3>
                  {o.detail && (
                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-white/65">
                      {o.detail}
                    </p>
                  )}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {o.systems.map((sys) => (
                      <li
                        key={sys}
                        className="border-brand text-brand rounded-full border px-3 py-1 text-[13px] font-bold"
                      >
                        {sys}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Quote band ---------- */}
      <section className="bg-[#fdf3e6]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-[22px] py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-navy text-[clamp(26px,3.2vw,40px)] leading-tight font-extrabold tracking-tight">
              Working on a similar site?
            </h2>
            <p className="text-mute mt-2 text-[17px]">
              Talk to our height safety specialists: {company.phone}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact-us"
              className="bg-brand hover:bg-brand-dark rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              Request a quote
            </Link>
            <a
              href={company.phoneHref}
              className="border-navy text-navy hover:bg-navy rounded-full border-2 px-7 py-[12px] text-[15px] font-bold transition-colors hover:text-white"
            >
              Call us
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Other sectors ---------- */}
      <section className="bg-bg">
        <div className="mx-auto max-w-[1240px] px-[22px] py-16">
          <h2 className="text-navy mb-6 text-[clamp(22px,2.4vw,30px)] font-extrabold tracking-tight">
            {isIntl ? 'Singapore sectors' : 'Other sectors'}
          </h2>
          <ul className="flex flex-wrap gap-3">
            {(isIntl ? singaporeSectors : otherSectors).map((s) => (
              <li key={s.id}>
                <Link
                  href={sectorHref(s)}
                  className="border-navy/25 text-navy hover:border-brand hover:text-brand-dark focus-visible:outline-brand rounded-full border bg-white px-5 py-2.5 text-[15px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
