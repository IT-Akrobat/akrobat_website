'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

const hidden = {
  up: 'translate-y-[90px]',
  left: '-translate-x-[120px]',
} as const;

/* Slides its children into place the first time they scroll into view. */
export default function Reveal({
  children,
  className = '',
  from = 'up',
}: {
  children: ReactNode;
  className?: string;
  from?: keyof typeof hidden;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[1100ms] ease-[cubic-bezier(0.22,0.8,0.25,1)] motion-reduce:transition-none ${
        shown
          ? 'translate-x-0 translate-y-0 opacity-100'
          : `${hidden[from]} opacity-0 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-100`
      } ${className}`}
    >
      {children}
    </div>
  );
}
