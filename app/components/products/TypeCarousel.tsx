'use client';

import Link from 'next/link';
import type { MouseEvent, PointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import ImageSlot from './ImageSlot';

export type TypeItem = { href: string; title: string; slotId: string };

/* A ring of cards. The front card is big, its neighbours are turned toward
   it on both sides, and the whole ring turns round. It advances by itself
   every `seconds` (default 40); hover pauses it. Swipe / drag, arrows,
   dots, or a click on a side card turn it by hand. */
export default function TypeCarousel({
  items,
  seconds = 40,
}: {
  items: TypeItem[];
  seconds?: number;
}) {
  const n = items.length;
  const [st, setSt] = useState({ i: 0, prev: 0 });
  const [hold, setHold] = useState(false);
  const drag = useRef<{ x: number } | null>(null);
  const swiped = useRef(false);
  const i = st.i;

  const to = (v: number) => setSt((s) => ({ i: ((v % n) + n) % n, prev: s.i }));

  useEffect(() => {
    if (hold || n < 2) return;
    const t = setTimeout(
      () => setSt((s) => ({ i: (s.i + 1) % n, prev: s.i })),
      seconds * 1000,
    );
    return () => clearTimeout(t);
  }, [i, hold, n, seconds]);

  if (!n) return null;

  /* signed shortest distance of card k from the front, in -n/2..n/2 */
  const dist = (k: number, from: number) => {
    let d = (((k - from) % n) + n) % n;
    if (d > n / 2) d -= n;
    return d;
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX };
  };
  const up = (e: PointerEvent<HTMLDivElement>) => {
    const s = drag.current;
    drag.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    if (Math.abs(dx) > 40) {
      swiped.current = true;
      to(i + (dx < 0 ? 1 : -1));
    }
  };
  const click = (e: MouseEvent, k: number) => {
    if (swiped.current) {
      swiped.current = false;
      e.preventDefault();
      return;
    }
    if (k !== i) {
      e.preventDefault();
      to(k);
    }
  };

  return (
    <div
      className="type-ring mt-10"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div
        className="type-stage"
        onPointerDown={down}
        onPointerUp={up}
        onPointerCancel={() => (drag.current = null)}
      >
        {items.map((it, k) => {
          const d = dist(k, i);
          const a = Math.abs(d);
          const wrapped = Math.abs(d - dist(k, st.prev)) > 1.5;
          const shown = a <= 2;
          return (
            <Link
              key={it.href}
              href={it.href}
              draggable={false}
              aria-hidden={d !== 0}
              tabIndex={d === 0 ? 0 : -1}
              onClick={(e) => click(e, k)}
              className="type-card group"
              style={{
                transform: `translateX(calc(var(--w) * ${(d * 0.6).toFixed(3)})) translateZ(${-a * 150}px) rotateY(${-d * 38}deg) scale(${1 - a * 0.08})`,
                opacity: shown ? 1 : 0,
                zIndex: 10 - Math.round(a),
                pointerEvents: shown ? 'auto' : 'none',
                filter: a ? `brightness(${1 - a * 0.14})` : undefined,
                transition: wrapped ? 'none' : undefined,
              }}
            >
              <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                <ImageSlot id={it.slotId} hint={it.title} />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(11,31,69,.94),rgba(11,31,69,.4)_42%,transparent_68%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="text-[clamp(22px,2.4vw,32px)] leading-tight font-extrabold text-white">
                  {it.title}
                </h3>
                <span className="bg-brand mt-4 inline-block rounded-full px-5 py-2.5 text-[15px] font-bold text-white">
                  View details →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {n > 1 && (
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous type"
              onClick={() => to(i - 1)}
              className="border-line hover:border-brand grid size-11 place-items-center rounded-full border bg-white text-xl font-bold text-[#0b1f45] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7861e]"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {items.map((x, k) => (
                <button
                  key={x.href}
                  type="button"
                  aria-label={`Show ${x.title}`}
                  aria-current={k === i}
                  onClick={() => to(k)}
                  className={`h-2.5 rounded-full transition-all ${k === i ? 'bg-brand w-8' : 'w-2.5 bg-[#0b1f45]/25 hover:bg-[#0b1f45]/45'}`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next type"
              onClick={() => to(i + 1)}
              className="border-line hover:border-brand grid size-11 place-items-center rounded-full border bg-white text-xl font-bold text-[#0b1f45] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f7861e]"
            >
              →
            </button>
          </div>
          {/* countdown to the next turn */}
          <div className="h-1 w-56 overflow-hidden rounded-full bg-[#0b1f45]/10">
            <div
              key={i}
              className="type-timer bg-brand h-full origin-left"
              style={{
                animationDuration: `${seconds}s`,
                animationPlayState: hold ? 'paused' : 'running',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
