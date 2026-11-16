'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/* Full-bleed photo slideshow for the home hero.
   Fades to the next photo every INTERVAL_MS (30 s); the new photo zooms out,
   un-tilts and sharpens into place (see .hs-zoom in globals.css). To add or remove
   photos, edit the list below and drop the file into /public/hero. */
const INTERVAL_MS = 10_000;

const slides: { src: string; alt: string; pos?: string }[] = [
  {
    src: '/hero/hero-01.jpg',
    alt: 'Technician on a standing-seam roof with a rail lifeline',
    pos: '50% 40%',
  },
  {
    src: '/hero/hero-02.jpg',
    alt: 'Technician clipped on across a glass roof in the city',
    pos: '50% 45%',
  },
  {
    src: '/hero/hero-03.jpg',
    alt: 'Worker on a ladder at a vertical green wall',
    pos: '50% 30%',
  },
  {
    src: '/hero/hero-04.jpg',
    alt: 'Technician standing on a glass roof with a lifeline',
    pos: '50% 50%',
  },
  {
    src: '/hero/hero-05.jpg',
    alt: 'Worker attached to a rail on a large glass roof',
    pos: '50% 50%',
  },
  {
    src: '/hero/hero-06.jpg',
    alt: 'Roof walkway and guardrail above an industrial waterfront',
    pos: '50% 50%',
  },
  {
    src: '/hero/hero-07.jpg',
    alt: 'Height safety installation on a roof',
    pos: '50% 50%',
  },
  {
    src: '/hero/hero-08.jpg',
    alt: 'Height safety installation on a roof',
    pos: '50% 50%',
  },
];

export default function HeroSlideshow() {
  const [i, setI] = useState(0);
  // bumping `tick` restarts the 30 s timer (used when someone clicks a dot)
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setI((n) => (n + 1) % slides.length),
      INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [tick]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b1f45]">
      {slides.map((s, n) => (
        <div
          key={s.src}
          aria-hidden={n !== i}
          className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${n === i ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={n === 0}
            sizes="100vw"
            quality={80}
            className={`object-cover ${n === i ? 'hs-zoom' : ''}`}
            style={{ objectPosition: s.pos }}
          />
        </div>
      ))}

      {/* light scrim on the left only, so the headline reads and the photo stays clear */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent max-md:bg-black/40 max-md:from-transparent max-md:via-transparent" />

      {/* slide dots */}
      <div className="absolute right-6 bottom-20 z-10 flex gap-2 md:right-10 md:bottom-24">
        {slides.map((s, n) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show photo ${n + 1} of ${slides.length}`}
            aria-current={n === i}
            onClick={() => {
              setI(n);
              setTick((t) => t + 1);
            }}
            className={`h-2 rounded-full transition-all ${n === i ? 'bg-brand w-7' : 'w-2 bg-white/60 hover:bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
}
