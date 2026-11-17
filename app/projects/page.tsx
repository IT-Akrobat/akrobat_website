import type { Metadata } from 'next';

import ProjectsExplorer from '@/app/components/projects/ProjectsExplorer';
import { landmarks, sectors } from '@/app/lib/projects-data';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Height safety systems installed by Akrobat at more than 600 sites: entertainment, government, factories, offshore, schools, hotels, offices and overseas.',
};

export default function Projects() {
  return (
    <main className="bg-bg overflow-x-clip">
      <ProjectsExplorer sectors={sectors} />

      {/* ---------- Landmarks ---------- */}
      <section
        className="bg-navy relative overflow-hidden rounded-t-[48px] text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="relative mx-auto max-w-[1240px] px-[22px] py-20">
          <h2 className="text-[clamp(24px,2.6vw,34px)] leading-tight font-extrabold tracking-tight">
            Landmark projects
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {landmarks.map((l) => (
              <div
                key={l.place}
                className="rounded-[28px] border border-white/15 bg-white/[.06] p-7 backdrop-blur-sm"
              >
                <p className="text-brand font-bold">{l.place}</p>
                <ul className="mt-3 space-y-2 text-[19px] leading-snug font-semibold">
                  {l.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
