'use client';

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

/* Sets data-in="true" the first time it scrolls into view. The CSS in
   globals.css (.rv, .draw, .clip-l, .clip-r) reacts to that attribute. */
export default function InView({
  children,
  className = '',
  threshold = 0.2,
  style,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} data-in={shown} className={className} style={style}>
      {children}
    </div>
  );
}
