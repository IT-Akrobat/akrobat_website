import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ImageSlot from '@/app/components/products/ImageSlot';
import InView from '@/app/components/products/InView';
import SrlCatalogue from '@/app/components/products/SrlCatalogue';
import TypeCarousel from '@/app/components/products/TypeCarousel';
import { mobileGroups, mobileTabByHref } from '@/app/lib/mobile-data';
import { company, type NavGroup } from '@/app/lib/nav-data';
import {
  allProductSlugs,
  categoryMeta,
  findGroup,
  findItem,
  getDetail,
  parens,
  stripParens,
} from '@/app/lib/product-data';
import { srlHref } from '@/app/lib/srl-data';

type Props = { params: Promise<{ slug: string[] }> };

const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });
const hrefOf = (slug: string[]) => `/products/${slug.join('/')}`;

export function generateStaticParams() {
  return allProductSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const href = hrefOf((await params).slug);
  const group = findGroup(href);
  if (group)
    return { title: group.label, description: categoryMeta[href]?.summary };
  const found = findItem(href);
  if (!found) return {};
  return {
    title: stripParens(found.item.label),
    description: getDetail(found.item, found.group).summary,
  };
}

/* ---------- Fall Arrest Equipment: explainer copy ---------- */
const faIntro = {
  title: 'Compliant fall protection equipment and solutions in Singapore',
  paras: [
    'Akrobat has grown to become one of the leading innovative specialists in fall arrest and rope access systems in Singapore and beyond. Whether it is temporary protection, or a permanent fall arrest system custom designed for your site, we aim to give you the best solution.',
    'Having taken part in more than 600 projects in Singapore, we provide comprehensive, stress-free turnkey solutions across a wide range of industries: design-engineering, installation and inspection. Besides designing and implementing fall arrest and safety systems, we supply a wide range of Personal Protective Equipment (PPE) required when working at height.',
  ],
};

const faSteps = [
  {
    n: '01',
    t: 'Anchor',
    d: 'A strong, certified point on the structure that the whole system hangs from. It can be a fixed anchor, a lifeline or a mobile anchorage.',
  },
  {
    n: '02',
    t: 'Connect',
    d: 'A self-retracting lifeline, a lanyard with energy absorber or a fall arrester on a line joins the worker to the anchor. Carabiners and hooks make the links.',
  },
  {
    n: '03',
    t: 'Body support',
    d: 'A full-body harness spreads the force of a fall across the shoulders, chest and thighs, and keeps the worker upright.',
  },
];

const faChoose = [
  [
    'Moving along an edge with no slack in the line',
    'Self-Retracting Lifeline',
  ],
  ['Body support for every fall arrest system', 'Harness'],
  ['No permanent anchor, short-term job', 'Temporary Lifeline & Fall Arrester'],
  ['Link harness to anchor and soften the shock', 'Lanyard'],
  ['Join harness, lanyard and anchor safely', 'Carabiner & Hook'],
  ['Form an anchor connection or work line', 'Rope & Sling'],
];

const kicker =
  'text-brand-dark flex items-center gap-3 text-xs font-bold tracking-[0.22em] uppercase';

function Cta({ title }: { title: React.ReactNode }) {
  return (
    <section className="bg-navy text-white">
      <InView className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-[22px] py-20 md:flex-row md:items-end">
        <div>
          <h2 className="rv max-w-[640px] text-[clamp(28px,4.2vw,54px)] leading-[1.05] font-extrabold tracking-tight">
            {title}
          </h2>
          <p className="rv mt-5 text-white/70" style={delay(0.1)}>
            Call{' '}
            <a href={company.phoneHref} className="text-white underline">
              {company.phone}
            </a>{' '}
            or email{' '}
            <a
              href={`mailto:${company.email}`}
              className="text-white underline"
            >
              {company.email}
            </a>
          </p>
        </div>
        <Link
          href="/contact-us#enquiry"
          className="rv bg-brand hover:bg-brand-dark rounded-full px-8 py-4 text-base font-bold text-white transition-colors"
          style={delay(0.2)}
        >
          Talk to an engineer →
        </Link>
      </InView>
    </section>
  );
}

/* ======================= Category page ======================= */
function CategoryPage({ group }: { group: NavGroup }) {
  const meta = categoryMeta[group.href];
  const isFA = meta.code === 'FA';

  return (
    <main className="overflow-x-clip">
      {/* Hero */}
      <section className="bg-[#fdf3e6]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-[22px] pt-36 pb-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-mute mb-6 text-sm">
              <Link href="/products" className="hover:text-brand-dark">
                Products
              </Link>{' '}
              / <span className="text-navy font-semibold">{group.label}</span>
            </nav>
            <p className={kicker}>
              <span className="bg-brand h-[3px] w-9" />
              {meta.code} · {meta.kicker}
            </p>
            <h1 className="text-navy mt-5 text-[clamp(40px,6.4vw,88px)] leading-[0.98] font-extrabold tracking-tight">
              {group.label}
            </h1>
            <p className="text-mute mt-6 max-w-[520px] text-[18px] leading-relaxed">
              {meta.summary}
            </p>
            <a
              href="#types"
              className="bg-navy hover:bg-brand mt-8 inline-flex rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              See the {group.children.length} types ↓
            </a>
          </div>
          <div
            className="aspect-[4/3]"
            style={{ clipPath: 'polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)' }}
          >
            <ImageSlot
              id={`${meta.code}-COVER`}
              hint={`Cover photo for ${group.label}`}
            />
          </div>
        </div>
      </section>

      {/* Standards band */}
      <div className="bg-navy overflow-hidden py-4 text-white" aria-hidden>
        <div className="marquee">
          {[
            ...meta.marquee,
            ...meta.marquee,
            ...meta.marquee,
            ...meta.marquee,
          ].map((m, i) => (
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

      {/* What it is (Fall Arrest only) */}
      {isFA && (
        <section className="bg-bg">
          <InView className="mx-auto grid max-w-[1240px] gap-12 px-[22px] py-20 md:grid-cols-2">
            <div>
              <p className={`rv ${kicker}`}>
                <span className="bg-brand h-[3px] w-9" />
                What is fall arrest equipment?
              </p>
              <h2
                className="rv text-navy mt-4 text-[clamp(28px,3.6vw,46px)] leading-[1.08] font-extrabold tracking-tight"
                style={delay(0.1)}
              >
                {faIntro.title}
              </h2>
            </div>
            <div className="text-mute space-y-5 text-[16.5px] leading-relaxed">
              {faIntro.paras.map((p, i) => (
                <p key={i} className="rv" style={delay(0.15 + i * 0.1)}>
                  {p}
                </p>
              ))}
            </div>
          </InView>

          <InView className="mx-auto grid max-w-[1240px] gap-5 px-[22px] pb-20 md:grid-cols-3">
            {faSteps.map((s, i) => (
              <div
                key={s.n}
                className="rv border-line rounded-[24px] border bg-white p-8"
                style={delay(i * 0.12)}
              >
                <span className="text-brand text-sm font-extrabold tracking-widest">
                  {s.n}
                </span>
                <h3 className="text-navy mt-3 text-2xl font-extrabold">
                  {s.t}
                </h3>
                <p className="text-mute mt-3 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </InView>
        </section>
      )}

      {/* Types */}
      <section id="types" className="scroll-mt-28 bg-[#f6f8fc]">
        <div className="mx-auto max-w-[1240px] px-[22px] py-20">
          <p className={kicker}>
            <span className="bg-brand h-[3px] w-9" />
            Types in this range
          </p>
          <h2 className="text-navy mt-4 text-[clamp(30px,4vw,54px)] leading-[1.05] font-extrabold tracking-tight">
            Choose the <span className="text-brand">right type</span>
          </h2>

          <TypeCarousel
            seconds={40}
            items={group.children.map((c, i) => ({
              href: c.href,
              title: stripParens(c.label),
              slotId: `${meta.code}-0${i + 1}`,
            }))}
          />
        </div>
      </section>

      {meta.code === 'MF' && (
        <SrlCatalogue
          groups={mobileGroups}
          imageBase="/products/mobile"
          eyebrow="Alsipercha"
          heading={['Anchor that', 'goes with you.']}
          initialKey={undefined}
          quoteLabel="Mobile Fall Protection"
        />
      )}

      {/* Which one do I need? (Fall Arrest only) */}
      {isFA && (
        <section className="bg-white">
          <InView className="mx-auto max-w-[1000px] px-[22px] py-20">
            <h2 className="rv text-navy text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-tight">
              What type of fall protection equipment{' '}
              <span className="text-brand">do I need?</span>
            </h2>
            <p
              className="rv text-mute mt-5 max-w-[720px] text-[16.5px] leading-relaxed"
              style={delay(0.1)}
            >
              A fall arrest system generally uses equipment such as a
              retractable fall arrester, or one on a rigid or flexible anchor
              line. Whatever the equipment, the right and practical choice is
              the one that protects against vertical drops on your job. Our
              specialists understand the hazards faced by construction site
              workers exposed to drops from height, and plan accordingly.
            </p>
            <ul className="mt-10">
              {faChoose.map(([need, pick], i) => (
                <li
                  key={pick}
                  className="rv border-line flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  style={delay(0.05 * i)}
                >
                  <span className="text-mute">{need}</span>
                  <span className="text-navy font-bold">→ {pick}</span>
                </li>
              ))}
            </ul>
            <p className="text-mute mt-10 max-w-[720px] text-[16.5px] leading-relaxed">
              As experienced height safety specialists, we survey your site,
              assess the main hazards, design the best solution to reduce the
              risk of falling, then implement it with a full range of
              complementary PPE.
            </p>
          </InView>
        </section>
      )}

      <Cta
        title={
          <>
            Need help choosing the{' '}
            <span className="text-brand">right system?</span>
          </>
        }
      />
    </main>
  );
}

/* ======================= Single product page ======================= */
function ItemPage({
  group,
  item,
  index,
}: {
  group: NavGroup;
  item: { label: string; href: string };
  index: number;
}) {
  const meta = categoryMeta[group.href];
  const d = getDetail(item, group);
  const others = group.children.filter((c) => c.href !== item.href);

  return (
    <main className="overflow-x-clip">
      <section className="bg-[#fdf3e6]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-[22px] pt-36 pb-16 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <nav aria-label="Breadcrumb" className="text-mute mb-6 text-sm">
              <Link href="/products" className="hover:text-brand-dark">
                Products
              </Link>{' '}
              /{' '}
              <Link href={group.href} className="hover:text-brand-dark">
                {group.label}
              </Link>
            </nav>
            <p className={kicker}>
              <span className="bg-brand h-[3px] w-9" />
              {d.standard}
            </p>
            <h1 className="text-navy mt-5 text-[clamp(36px,5.4vw,72px)] leading-[1] font-extrabold tracking-tight">
              {stripParens(item.label)}
            </h1>
            {parens(item.label) && (
              <p className="text-brand-dark mt-3 text-lg font-bold">
                {parens(item.label)}
              </p>
            )}
            <p className="text-mute mt-6 max-w-[520px] text-[18px] leading-relaxed">
              {d.summary}
            </p>
            <Link
              href="/contact-us#enquiry"
              className="bg-navy hover:bg-brand mt-8 inline-flex rounded-full px-7 py-3.5 text-[15px] font-bold text-white transition-colors"
            >
              Ask for a quote →
            </Link>
          </div>
          <div
            className="aspect-square"
            style={{ clipPath: 'polygon(0 0,100% 0,100% 92%,92% 100%,0 100%)' }}
          >
            <ImageSlot
              id={`${meta.code}-0${index + 1}`}
              hint={stripParens(item.label)}
            />
          </div>
        </div>
      </section>

      {item.href === srlHref && <SrlCatalogue />}
      {mobileTabByHref[item.href] && (
        <SrlCatalogue
          groups={mobileGroups}
          imageBase="/products/mobile"
          eyebrow="Alsipercha"
          heading={['Anchor that', 'goes with you.']}
          initialKey={mobileTabByHref[item.href]}
          quoteLabel="Mobile Fall Protection"
        />
      )}

      <section className="bg-bg">
        <InView className="mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="rv text-navy text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-tight">
            Why choose <span className="text-brand">this</span>
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {d.features.map((f, i) => (
              <div
                key={f.t}
                className="rv border-line rounded-[24px] border bg-white p-7"
                style={delay(i * 0.1)}
              >
                <h3 className="text-navy text-xl font-extrabold">{f.t}</h3>
                <p className="text-mute mt-2 leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <h3 className="rv text-navy mt-14 text-xl font-extrabold">
            Typical uses
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {d.uses.map((u) => (
              <li
                key={u}
                className="border-line text-navy rounded-full border bg-white px-5 py-2.5 text-sm font-semibold"
              >
                {u}
              </li>
            ))}
          </ul>
        </InView>
      </section>

      {others.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-[1240px] px-[22px] py-16">
            <h2 className="text-navy text-2xl font-extrabold">
              More in {group.label}
            </h2>
            <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {others.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group border-line hover:border-brand text-navy flex items-center justify-between border-b py-3.5 font-semibold transition-colors"
                  >
                    <span>{c.label}</span>
                    <span className="text-brand transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Cta
        title={
          <>
            Tell us about your site and we’ll{' '}
            <span className="text-brand">recommend the right model.</span>
          </>
        }
      />
    </main>
  );
}

export default async function ProductPage({ params }: Props) {
  const href = hrefOf((await params).slug);

  const group = findGroup(href);
  if (group) return <CategoryPage group={group} />;

  const found = findItem(href);
  if (found) return <ItemPage {...found} />;

  notFound();
}
