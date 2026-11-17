import type { Metadata } from 'next';
import Link from 'next/link';

import NewsFeed from '@/app/components/news/NewsFeed';
import { company } from '@/app/lib/nav-data';
import { news } from '@/app/lib/news-data';

export const metadata: Metadata = {
  title: 'Promotions & News',
  description:
    'Current promotions, height safety articles and trade show updates from Akrobat Pte Ltd, Singapore.',
};

const delay = (s: number) => ({ ['--rd' as string]: `${s}s` });

export default function PromotionsNews() {
  const latestPromo = news.find((n) => n.category === 'Promotions');
  const rest = news;

  return (
    <main className="overflow-x-clip">
      {/* ---------- Header ---------- */}
      <section className="bg-[#fdf3e6]">
        <div className="mx-auto grid max-w-[1240px] items-end gap-10 px-[22px] pt-36 pb-16 md:pt-40 lg:grid-cols-[1.2fr_0.8fr]">
          <h1
            className="text-navy text-[clamp(44px,7vw,100px)] leading-[0.95] font-extrabold tracking-tight"
            style={{ animation: 'hww-in 1s var(--ease-slow) .1s both' }}
          >
            Promotions
            <br />
            <span className="outline-text [--oc:var(--color-brand)]">
              &amp; news
            </span>
          </h1>
          <p
            className="text-mute max-w-[460px] text-[19px] leading-relaxed"
            style={{ animation: 'hww-in 1s var(--ease-slow) .35s both' }}
          >
            Offers on fall arrest equipment, advice from our height safety
            specialists, and where to find us at trade shows.
          </p>
        </div>
      </section>

      {/* ---------- Latest offer ---------- */}
      {latestPromo && (
        <section className="bg-[#fdf3e6]">
          <div className="mx-auto max-w-[1240px] px-[22px] pb-16">
            <div
              className="bg-navy grid gap-8 overflow-hidden rounded-[28px] p-8 text-white md:grid-cols-[1.1fr_0.9fr] md:items-center md:p-12"
              style={{ animation: 'hww-in 1s var(--ease-slow) .5s both' }}
            >
              <div>
                <p className="text-brand text-sm font-bold">
                  Latest offer · {latestPromo.date}
                </p>
                <h2 className="mt-3 text-[clamp(28px,3.6vw,46px)] leading-[1.05] font-extrabold tracking-tight">
                  {latestPromo.title}
                </h2>
                <p className="mt-4 max-w-[480px] text-[17px] leading-relaxed text-white/75">
                  {latestPromo.summary}
                </p>
              </div>
              <div
                role="img"
                aria-label="Picture to be added"
                className="relative flex aspect-[16/10] items-end rounded-[20px] border-2 border-dashed border-white/30 p-6"
              >
                <span className="text-[clamp(30px,3.4vw,44px)] leading-none font-extrabold tracking-tight">
                  {latestPromo.offer}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---------- All items ---------- */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1240px] px-[22px] py-20">
          <NewsFeed items={rest} />
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section className="bg-[#f6f8fc]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-[22px] py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-navy text-[clamp(26px,3.2vw,40px)] leading-tight font-extrabold tracking-tight">
              Want a quote on any of these?
            </h2>
            <p className="text-mute mt-2 text-[17px]">
              Call {company.phone} or send us an enquiry. Offers are while
              stocks last.
            </p>
          </div>
          <Link
            href="/contact-us#enquiry"
            className="bg-brand hover:bg-brand-dark rounded-full px-8 py-4 font-bold text-white transition-colors"
          >
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
