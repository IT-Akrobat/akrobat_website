'use client';

import { useEffect, useRef } from 'react';

/* A vertical lifeline that fills with orange as the page scrolls, with a
   glowing carabiner riding at its tip. Sits inside a `relative` parent. */
export default function RailProgress() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = root.current?.parentElement;
    if (!parent) return;
    let raf = 0;
    const update = () => {
      const r = parent.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height),
      );
      if (fill.current) fill.current.style.height = `${p * 100}%`;
      if (dot.current) dot.current.style.top = `${p * 100}%`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="bg-navy/15 absolute top-0 bottom-0 left-5 w-[3px] -translate-x-1/2 rounded-full md:left-1/2"
    >
      <span
        ref={fill}
        className="bg-brand absolute top-0 left-0 w-full rounded-full"
        style={{ height: 0 }}
      />
      <span
        ref={dot}
        className="bg-brand absolute left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_0_0_6px_rgba(247,134,30,.25),0_0_20px_rgba(247,134,30,.8)]"
        style={{ top: 0 }}
      />
    </div>
  );
}
