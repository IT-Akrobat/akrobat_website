'use client';

import type { PointerEvent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

/* Corner-view (isometric) towers: every building shows two faces, so it reads
   as a real 3D block. All geometry is computed below. */
const S = 0.3; // vertical slope of the receding edges
const K = (Math.atan(S) * 180) / Math.PI;
const FONT = 'var(--font-inter), system-ui, sans-serif';

type P = [number, number];
const pts = (p: P[]) => p.map((q) => q.join(',')).join(' ');

type Tower = {
  id: string; // window pattern id
  c: number; // x of the near corner
  yb: number; // y of the near corner at the ground
  h: number;
  a: number; // left face width
  b: number; // right face width
  cw?: number; // half width of a cut (chamfered) corner
  l: string;
  r: string;
  top: string;
  mid?: string;
  bands?: number[];
  band?: string;
  fins?: string;
  base?: string;
  lit?: boolean;
  sheen?: boolean;
};

type Kind = 'grid' | 'ribbon' | 'slit' | 'balcony';

function Pattern({
  id,
  win,
  hi,
  kind = 'grid',
}: {
  id: string;
  win: string;
  hi: string;
  kind?: Kind;
}) {
  const W = { grid: 16, ribbon: 16, slit: 12, balcony: 20 }[kind];
  const shape = () => {
    if (kind === 'ribbon')
      return (
        <>
          <rect x="0" y="5" width="16" height="11" fill={win} />
          <rect x="0" y="5" width="16" height="4" fill={hi} opacity=".5" />
          <rect x="7.5" y="5" width="1" height="11" fill="#000" opacity=".28" />
        </>
      );
    if (kind === 'slit')
      return (
        <>
          <rect x="4" y="2" width="4" height="20" fill={win} />
          <rect x="4" y="2" width="4" height="6" fill={hi} opacity=".5" />
        </>
      );
    if (kind === 'balcony')
      return (
        <>
          <rect x="4" y="3" width="12" height="13" fill={win} />
          <rect x="4" y="3" width="12" height="4" fill={hi} opacity=".5" />
          <rect x="1" y="17" width="18" height="2.6" fill="#fff" opacity=".9" />
          <path d="M4 15.5h12" stroke="#fff" strokeWidth=".8" opacity=".7" />
        </>
      );
    return (
      <>
        <rect x="3" y="4" width="10" height="15" fill={win} />
        <rect x="3" y="4" width="10" height="5" fill={hi} opacity=".5" />
      </>
    );
  };
  const tile = (side: 'l' | 'r') => (
    <pattern
      id={`w${side}${id}`}
      width={W}
      height="24"
      patternUnits="userSpaceOnUse"
      patternTransform={`skewY(${side === 'l' ? K : -K})`}
    >
      {shape()}
    </pattern>
  );
  const litTile = (side: 'l' | 'r') => (
    <pattern
      id={`lit${side}`}
      width="48"
      height="96"
      patternUnits="userSpaceOnUse"
      patternTransform={`skewY(${side === 'l' ? K : -K})`}
    >
      <rect x="16" y="26" width="4" height="20" fill="#ffd27a" />
      <rect x="40" y="74" width="4" height="20" fill="#ffd27a" />
      <rect x="4" y="50" width="4" height="20" fill="#ffd27a" />
      <rect x="28" y="2" width="4" height="20" fill="#ffd27a" />
    </pattern>
  );
  return (
    <>
      {tile('l')}
      {tile('r')}
      {id === 'F' && (
        <>
          {litTile('l')}
          {litTile('r')}
        </>
      )}
    </>
  );
}

function roofCenter(o: Tower): P {
  const cw = o.cw ?? 0;
  const x1 = o.c - cw;
  return [x1 + (-o.a + o.b + 2 * cw) / 2, o.yb - o.h - (S * (o.a + o.b)) / 2];
}

function Prism(o: Tower) {
  const cw = o.cw ?? 0;
  const { c, yb, h, a, b } = o;
  const yt = yb - h;
  const x1 = c - cw;
  const x4 = c + cw;
  const x2 = x1 - a;
  const x5 = x4 + b;
  const y2 = yb - S * a;
  const y5 = yb - S * b;
  const left: P[] = [
    [x1, yb],
    [x2, y2],
    [x2, y2 - h],
    [x1, yt],
  ];
  const right: P[] = [
    [x4, yb],
    [x5, y5],
    [x5, y5 - h],
    [x4, yt],
  ];
  const roof: P[] = [
    [x1, yt],
    [x2, y2 - h],
    [x2 + b + 2 * cw, yt - S * a - S * b],
    [x5, y5 - h],
    [x4, yt],
  ];
  const baseH = 24;
  const baseL: P[] = [
    [x1, yb],
    [x2, y2],
    [x2, y2 - baseH],
    [x1, yb - baseH],
  ];
  const baseR: P[] = [
    [x4, yb],
    [x5, y5],
    [x5, y5 - baseH],
    [x4, yb - baseH],
  ];

  return (
    <g>
      <polygon points={pts(left)} fill={o.l} />
      <polygon points={pts(right)} fill={o.r} />
      {cw > 0 && (
        <polygon
          points={pts([
            [x1, yb],
            [x4, yb],
            [x4, yt],
            [x1, yt],
          ])}
          fill={o.mid ?? o.l}
        />
      )}
      <polygon points={pts(left)} fill={`url(#wl${o.id})`} />
      <polygon points={pts(right)} fill={`url(#wr${o.id})`} />
      {o.lit && (
        <>
          <polygon
            className="sk-twinkle"
            points={pts(left)}
            fill="url(#litl)"
          />
          <polygon
            className="sk-twinkle sk-twinkle-b"
            points={pts(right)}
            fill="url(#litr)"
          />
        </>
      )}
      {o.sheen && (
        <>
          <polygon points={pts(left)} fill="url(#sheen)" opacity=".5" />
          <polygon points={pts(right)} fill="url(#sheen)" opacity=".38" />
        </>
      )}
      {o.fins &&
        [0.18, 0.36, 0.54, 0.72, 0.9].map((t) => (
          <line
            key={t}
            x1={x4 + b * t}
            y1={yb - S * b * t}
            x2={x4 + b * t}
            y2={yb - S * b * t - h}
            stroke={o.fins}
            strokeWidth="5"
            opacity=".55"
          />
        ))}
      {(o.bands ?? []).map((k) => (
        <g key={k} stroke={o.band} strokeWidth="2.5">
          <line x1={x1} y1={yb - k} x2={x2} y2={y2 - k} />
          <line x1={x4} y1={yb - k} x2={x5} y2={y5 - k} />
        </g>
      ))}
      {o.base && (
        <>
          <polygon points={pts(baseL)} fill={o.base} />
          <polygon points={pts(baseR)} fill={o.base} />
          <polygon points={pts(baseL)} fill="#9fc3dc" opacity=".25" />
          <polygon points={pts(baseR)} fill="#9fc3dc" opacity=".18" />
        </>
      )}
      <polygon points={pts(roof)} fill={o.top} />
      <polyline
        points={pts([[x2, y2 - h], ...roof.slice(1, 4), [x5, y5 - h]] as P[])}
        fill="none"
        stroke="#fff"
        strokeOpacity=".25"
      />
      <line x1={x1} y1={yb} x2={x1} y2={yt} stroke="#fff" strokeOpacity=".4" />
      {cw > 0 && (
        <line
          x1={x4}
          y1={yb}
          x2={x4}
          y2={yt}
          stroke="#fff"
          strokeOpacity=".25"
        />
      )}
    </g>
  );
}

function RoofBox({
  at,
  a,
  h,
  l,
  r,
  top,
}: {
  at: P;
  a: number;
  h: number;
  l: string;
  r: string;
  top: string;
}) {
  // small box sitting on the roof, footprint centred on `at`
  const c = at[0];
  const yb = at[1] + S * a;
  return (
    <g>
      <polygon
        points={pts([
          [c, yb],
          [c - a, yb - S * a],
          [c - a, yb - S * a - h],
          [c, yb - h],
        ])}
        fill={l}
      />
      <polygon
        points={pts([
          [c, yb],
          [c + a, yb - S * a],
          [c + a, yb - S * a - h],
          [c, yb - h],
        ])}
        fill={r}
      />
      <polygon
        points={pts([
          [c, yb - h],
          [c - a, yb - S * a - h],
          [c, yb - 2 * S * a - h],
          [c + a, yb - S * a - h],
        ])}
        fill={top}
      />
    </g>
  );
}

function Mast({ at, len }: { at: P; len: number }) {
  return (
    <g>
      <line
        x1={at[0]}
        y1={at[1]}
        x2={at[0]}
        y2={at[1] - len}
        stroke="#cfd5e1"
        strokeWidth="2"
      />
      <circle
        cx={at[0]}
        cy={at[1] - len}
        r="3"
        fill="#e5322d"
        className="sk-blink"
      />
    </g>
  );
}

function Rail({
  a,
  b,
  color,
  hgt = 9,
}: {
  a: P;
  b: P;
  color: string;
  hgt?: number;
}) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  const n = Math.max(2, Math.round(len / 11));
  return (
    <g stroke={color} strokeLinecap="round">
      {Array.from({ length: n + 1 }, (_, i) => {
        const x = a[0] + ((b[0] - a[0]) * i) / n;
        const y = a[1] + ((b[1] - a[1]) * i) / n;
        return (
          <line key={i} x1={x} y1={y} x2={x} y2={y - hgt} strokeWidth="1.3" />
        );
      })}
      <line
        x1={a[0]}
        y1={a[1] - hgt}
        x2={b[0]}
        y2={b[1] - hgt}
        strokeWidth="1.8"
      />
      <line
        x1={a[0]}
        y1={a[1] - hgt / 2}
        x2={b[0]}
        y2={b[1] - hgt / 2}
        strokeWidth="1.2"
      />
    </g>
  );
}

function RoofGuard({
  o,
  color,
  part = 'all',
}: {
  o: Tower;
  color: string;
  part?: 'all' | 'back' | 'front';
}) {
  const cw = o.cw ?? 0;
  const { c, yb, h, a, b } = o;
  const yt = yb - h;
  const x1 = c - cw;
  const x4 = c + cw;
  const x2 = x1 - a;
  const x5 = x4 + b;
  const L: P = [x2, yb - S * a - h];
  const R: P = [x5, yb - S * b - h];
  const B: P = [x2 + b + 2 * cw, yt - S * a - S * b];
  return (
    <g>
      {part !== 'front' && (
        <>
          <Rail a={L} b={B} color={color} />
          <Rail a={B} b={R} color={color} />
        </>
      )}
      {part !== 'back' && (
        <>
          <Rail a={L} b={[x1, yt]} color={color} />
          {cw > 0 && <Rail a={[x1, yt]} b={[x4, yt]} color={color} />}
          <Rail a={[x4, yt]} b={R} color={color} />
        </>
      )}
    </g>
  );
}

/* Fixed ladder with a dark backing, running up one face of a tower.
   (x0, y0) is a point on the face's ground line and m its slope.
   `land` = the moment (seconds) the ladder hits its place: the wall brackets
   snap on and a small ring pulses at the foot. */
function Ladder({
  xa,
  x0,
  y0,
  m,
  h,
  w = 11,
  land = 0,
}: {
  xa: number;
  x0: number;
  y0: number;
  m: number;
  h: number;
  w?: number;
  land?: number;
}) {
  const xb = xa + w;
  const ya = y0 + m * (xa - x0);
  const yb = y0 + m * (xb - x0);
  const rungs = Math.floor(h / 10);
  const bracketAt = [h * 0.12, h * 0.5, h * 0.9];
  return (
    <g>
      <polygon
        points={pts([
          [xa - 3, ya - m * 3],
          [xb + 3, yb + m * 3],
          [xb + 3, yb + m * 3 - h],
          [xa - 3, ya - m * 3 - h],
        ])}
        fill="#000"
        opacity=".22"
      />
      <g stroke="#eef2f8" strokeLinecap="round">
        <line x1={xa} y1={ya} x2={xa} y2={ya - h} strokeWidth="2" />
        <line x1={xb} y1={yb} x2={xb} y2={yb - h} strokeWidth="2" />
        {Array.from({ length: rungs }, (_, i) => (
          <line
            key={i}
            x1={xa}
            y1={ya - 6 - i * 10}
            x2={xb}
            y2={yb - 6 - i * 10}
            strokeWidth="1.3"
          />
        ))}
      </g>
      {/* wall brackets that clamp on once the ladder has landed */}
      {bracketAt.map((k, i) => (
        <g
          key={k}
          className="sk-pop"
          style={{ animationDelay: `${land + 0.05 * i}s` }}
        >
          <rect
            x={xa - 2.6}
            y={ya - k - 1.6}
            width={w + 5.2}
            height="3.2"
            rx="1"
            fill="#f7861e"
          />
          <circle cx={xa - 0.6} cy={ya - k} r=".9" fill="#fff" />
          <circle cx={xb + 0.6} cy={yb - k} r=".9" fill="#fff" />
        </g>
      ))}
      <ellipse
        className="sk-thud"
        style={{ animationDelay: `${land}s` }}
        cx={(xa + xb) / 2}
        cy={(ya + yb) / 2 + 1}
        rx="9"
        ry="3"
        fill="none"
        stroke="#f7861e"
        strokeWidth="1.4"
      />
    </g>
  );
}

function Rise({ d, children }: { d: number; children: ReactNode }) {
  return (
    <g className="sk-rise" style={{ animationDelay: `${d}s` }}>
      {children}
    </g>
  );
}

/* Equipment that "attaches" to a building after load, slowly.
   from = the direction it arrives from; d = delay in seconds. */
function Attach({
  d,
  from,
  dur,
  children,
}: {
  d: number;
  from: 'top' | 'right' | 'grow' | 'ladder';
  dur?: number;
  children: ReactNode;
}) {
  return (
    <g
      className={`sk-attach sk-from-${from}`}
      style={{
        animationDelay: `${d}s`,
        ...(dur ? { animationDuration: `${dur}s` } : {}),
      }}
    >
      {children}
    </g>
  );
}

/* Lets a whole building (with its rails, ladder, roof gear) be dragged. */
function Drag({
  children,
  onMove,
}: {
  children: ReactNode;
  onMove?: (x: number, y: number) => void;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [grab, setGrab] = useState(false);
  const start = useRef<{
    px: number;
    py: number;
    ox: number;
    oy: number;
    k: number;
  } | null>(null);

  const down = (e: PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    const k = svg?.getScreenCTM()?.a || 1; // screen px per svg unit
    start.current = { px: e.clientX, py: e.clientY, ox: pos.x, oy: pos.y, k };
    e.currentTarget.setPointerCapture(e.pointerId);
    setGrab(true);
  };
  const move = (e: PointerEvent<SVGGElement>) => {
    const s = start.current;
    if (!s) return;
    const x = s.ox + (e.clientX - s.px) / s.k;
    const y = s.oy + (e.clientY - s.py) / s.k;
    setPos({ x, y });
    onMove?.(x, y);
  };
  const up = () => {
    start.current = null;
    setGrab(false);
  };

  return (
    <g
      transform={`translate(${pos.x} ${pos.y})`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="touch-none max-md:touch-auto"
      style={{
        pointerEvents: 'auto',
        cursor: grab ? 'grabbing' : 'grab',
        filter: grab
          ? 'drop-shadow(0 14px 18px rgba(11,31,69,.28))'
          : undefined,
      }}
    >
      {children}
    </g>
  );
}

type Kit = { suit: string; vest: string; helmet: string; glove: string };
const KIT_A: Kit = {
  suit: '#2b4a8a',
  vest: '#d7f02f',
  helmet: '#ffffff',
  glove: '#f7861e',
};
const KIT_B: Kit = {
  suit: '#1f3b5c',
  vest: '#ff8a1f',
  helmet: '#ffd23f',
  glove: '#14171d',
};

/* A technician walking along a roof, harness clipped to a lifeline cable
   that runs on posts beside him. The trolley slides along the cable as he
   walks, he turns at each end and pauses, like a real roof inspection.
   p0 / p1 are the points his feet follow. */
function Walker({
  p0,
  p1,
  delay,
  T = 9,
  pause = 1.6,
  sc = 0.9,
  kit = KIT_A,
  reverse = false,
}: {
  p0: P;
  p1: P;
  delay: number;
  T?: number;
  pause?: number;
  sc?: number;
  kit?: Kit;
  reverse?: boolean;
}) {
  const body = useRef<SVGGElement>(null);
  const legA = useRef<SVGGElement>(null);
  const legB = useRef<SVGGElement>(null);
  const armA = useRef<SVGGElement>(null);
  const armB = useRef<SVGGElement>(null);
  const lan = useRef<SVGPathElement>(null);
  const trol = useRef<SVGGElement>(null);
  const H = 46 * sc; // cable height above the feet
  const face0 = p1[0] >= p0[0] ? 1 : -1;

  useEffect(() => {
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const t0 = performance.now();
    let raf = 0;
    let face = reverse ? -face0 : face0;
    const tick = (now: number) => {
      const el = body.current;
      if (!el) return;
      const s = (now - t0) / 1000 - delay;
      if (s < 0 && !reduce) {
        raf = requestAnimationFrame(tick);
        return;
      }
      let q = 0.5;
      let moving = false;
      if (!reduce) {
        const cyc = 2 * T + 2 * pause;
        const m = s % cyc;
        let k: number;
        let up: boolean;
        if (m < T) {
          k = m / T;
          up = true;
          moving = true;
        } else if (m < T + pause) {
          k = 1;
          up = true;
        } else if (m < 2 * T + pause) {
          k = 1 - (m - T - pause) / T;
          up = false;
          moving = true;
        } else {
          k = 0;
          up = false;
        }
        const e = k * k * (3 - 2 * k) * 0.35 + k * 0.65; // gentle ease at the ends
        q = 0.07 + 0.86 * (reverse ? 1 - e : e);
        face = (up ? 1 : -1) * (reverse ? -1 : 1) * face0;
      }
      const x = p0[0] + (p1[0] - p0[0]) * q;
      const y = p0[1] + (p1[1] - p0[1]) * q;
      const w = reduce ? 0 : s;
      const swing = moving ? Math.sin(w * 5.2) : 0;
      const bob = moving ? -Math.abs(Math.sin(w * 5.2)) * 0.9 * sc : 0;
      el.style.opacity = '1';
      el.setAttribute(
        'transform',
        `translate(${x} ${y - 40 * sc + bob}) scale(${face * sc} ${sc})`,
      );
      legA.current?.setAttribute('transform', `rotate(${swing * 24} 1 26)`);
      legB.current?.setAttribute('transform', `rotate(${-swing * 24} -1 26)`);
      armA.current?.setAttribute(
        'transform',
        `rotate(${-swing * 20} 2.2 14.5)`,
      );
      armB.current?.setAttribute(
        'transform',
        `rotate(${swing * 20} -1.8 14.5)`,
      );
      // lanyard: back D-ring -> trolley on the cable
      const dx = x - face * 4.6 * sc;
      const dy = y - 23 * sc + bob;
      const cx = x - face * 3 * sc;
      const cy = y - H + (p1[1] - p0[1]) * ((cx - x) / (p1[0] - p0[0] || 1));
      if (lan.current) {
        lan.current.style.opacity = '1';
        lan.current.setAttribute(
          'd',
          `M${dx} ${dy} Q${(dx + cx) / 2 - face * 2 * sc} ${(dy + cy) / 2 + 4 * sc} ${cx} ${cy}`,
        );
      }
      if (trol.current) {
        trol.current.style.opacity = '1';
        trol.current.setAttribute('transform', `translate(${cx} ${cy})`);
      }
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [delay, T, pause, reverse, face0, p0, p1, H, sc]);

  const post = (t: number): P => [
    p0[0] + (p1[0] - p0[0]) * t,
    p0[1] + (p1[1] - p0[1]) * t,
  ];
  return (
    <g>
      {/* lifeline: three posts and a tensioned cable */}
      <g className="sk-pop" style={{ animationDelay: `${delay - 1.2}s` }}>
        <line
          x1={p0[0]}
          y1={p0[1] - H}
          x2={p1[0]}
          y2={p1[1] - H}
          stroke="#f7861e"
          strokeWidth="1.6"
        />
        {[0, 0.5, 1].map((t) => {
          const q = post(t);
          return (
            <g key={t}>
              <line
                x1={q[0]}
                y1={q[1]}
                x2={q[0]}
                y2={q[1] - H}
                stroke="#e9eef7"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx={q[0]}
                cy={q[1] - H}
                r="2.4"
                fill="#f7861e"
                stroke="#fff"
                strokeWidth="1"
              />
              <ellipse cx={q[0]} cy={q[1]} rx="3.4" ry="1.3" fill="#7a2a12" />
            </g>
          );
        })}
      </g>

      <path
        ref={lan}
        d="M0 0"
        fill="none"
        stroke="#f7861e"
        strokeWidth="1.2"
        style={{ opacity: 0 }}
      />

      <g ref={body} style={{ opacity: 0 }}>
        {/* far arm */}
        <g ref={armB}>
          <path
            d="M-1.8 14.5 Q-3.8 20 -3 25.5"
            stroke={kit.suit}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'brightness(.7)' }}
          />
          <circle cx="-3" cy="26.4" r="1.8" fill={kit.glove} />
        </g>

        {/* far leg */}
        <g ref={legB}>
          <path
            d="M-1 26 Q-1.6 32 -1.4 37"
            stroke={kit.suit}
            strokeWidth="4.4"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'brightness(.75)' }}
          />
          <rect
            x="-3.8"
            y="28"
            width="3.6"
            height="1.3"
            rx=".5"
            fill="#14171d"
          />
          <path d="M-5 36.4h6.8q1.9.4 1.9 2.9h-8.7z" fill="#14171d" />
          <rect x="-5" y="38.8" width="8.7" height="1.1" fill="#3b3f4a" />
        </g>

        {/* energy-absorber pack on the back */}
        <rect
          x="-7.4"
          y="10"
          width="3.6"
          height="6.4"
          rx="1.4"
          fill="#f7861e"
          stroke="#14171d"
          strokeWidth=".5"
        />
        <path d="M-7 12.2h2.8M-7 14h2.8" stroke="#14171d" strokeWidth=".5" />

        {/* torso: overalls + hi-vis vest + harness */}
        <path
          d="M-5 14.5Q-5 12 -2.6 12H2.6Q5 12 5 14.5V27H-5Z"
          fill={kit.suit}
        />
        <path
          d="M-5 13Q-5 12 -2.6 12H-1L0 17L1 12H2.6Q5 12 5 13V25H-5Z"
          fill={kit.vest}
        />
        <rect x="-5" y="17.6" width="10" height="1.6" fill="#f4f6fa" />
        <rect x="-5" y="21.4" width="10" height="1.6" fill="#f4f6fa" />
        <path
          d="M-3.6 12.4L3.2 26M3.6 12.4L-3.2 26"
          stroke="#14171d"
          strokeWidth="1.2"
        />
        <rect
          x="-1.4"
          y="15"
          width="2.8"
          height="1.8"
          rx=".5"
          fill="#cfd5e1"
          stroke="#14171d"
          strokeWidth=".4"
        />
        <rect x="-5.4" y="25" width="10.8" height="2.6" rx="1" fill="#14171d" />
        <rect x="2.6" y="25.4" width="3" height="4.4" rx=".8" fill="#4a3b2c" />
        <circle
          cx="-4.6"
          cy="17"
          r="1.6"
          fill="none"
          stroke="#f7861e"
          strokeWidth="1"
        />

        {/* head: neck, face, glasses, helmet with lamp + chin strap */}
        <rect x="-1.2" y="8.8" width="3.4" height="4" rx="1.4" fill="#b87a4f" />
        <circle cx="0.6" cy="6.4" r="3.6" fill="#c68a5e" />
        <circle cx="2.4" cy="6.6" r="0.55" fill="#1b1b1b" />
        <rect
          x="1.4"
          y="5.5"
          width="3"
          height="2.2"
          rx=".9"
          fill="#9fd8ee"
          fillOpacity=".55"
          stroke="#14171d"
          strokeWidth=".4"
        />
        <path
          d="M1.2 8.6q1.2.6 2.2 0"
          stroke="#7a4a2a"
          strokeWidth=".5"
          fill="none"
        />
        <path
          d="M-3.3 5.4A3.9 3.9 0 0 1 4.5 5.2L6.4 5.6V6.6H-3.3Z"
          fill={kit.helmet}
          stroke="#d6dbe5"
          strokeWidth=".3"
        />
        <path
          d="M-2.4 3.6Q0.6 1.8 3.8 3.4"
          stroke="#f7861e"
          strokeWidth="1"
          fill="none"
        />
        <rect x="3.9" y="3.4" width="2" height="1.6" rx=".6" fill="#14171d" />
        <circle cx="5.9" cy="4.2" r="1.1" fill="#fff6c2" opacity=".85" />
        <path
          d="M-2.4 6.8Q-2.8 10 0.4 10.2"
          stroke="#14171d"
          strokeWidth=".6"
          fill="none"
        />

        {/* near leg */}
        <g ref={legA}>
          <path
            d="M1 26 Q1.8 32 1.4 37"
            stroke={kit.suit}
            strokeWidth="4.8"
            strokeLinecap="round"
            fill="none"
            style={{ filter: 'brightness(1.2)' }}
          />
          <rect x="-0.6" y="28" width="4" height="1.3" rx=".5" fill="#14171d" />
          <path d="M-2.6 36.4h7.2q1.9.4 1.9 2.9h-9.1z" fill="#15181f" />
          <rect x="-2.6" y="38.8" width="9.1" height="1.1" fill="#3b3f4a" />
        </g>

        {/* near arm */}
        <g ref={armA}>
          <path
            d="M2.2 14.5 Q4.4 20 3.4 25.5"
            stroke="#e9eef7"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="3.4" cy="26.4" r="1.9" fill={kit.glove} />
        </g>
      </g>

      {/* trolley sliding on the cable (drawn over the lanyard end) */}
      <g ref={trol} style={{ opacity: 0 }}>
        <rect
          x="-3.4"
          y="-2"
          width="6.8"
          height="4"
          rx="2"
          fill="#fff"
          stroke="#f7861e"
          strokeWidth="1.2"
        />
      </g>
    </g>
  );
}

/* Four-sided pyramid cap for a tower. */
function PyramidCap({ o, h = 38 }: { o: Tower; h?: number }) {
  const N: P = [o.c, o.yb - o.h];
  const L: P = [o.c - o.a, o.yb - S * o.a - o.h];
  const R: P = [o.c + o.b, o.yb - S * o.b - o.h];
  const [rx, ry] = roofCenter(o);
  const A: P = [rx, ry - h];
  return (
    <g>
      <polygon points={pts([N, L, A])} fill="#2f5666" />
      <polygon points={pts([N, R, A])} fill="#6aa6b8" />
      <line
        x1={N[0]}
        y1={N[1]}
        x2={A[0]}
        y2={A[1]}
        stroke="#fff"
        strokeOpacity=".4"
      />
      <Mast at={A} len={14} />
    </g>
  );
}

function Shrub({ at }: { at: P }) {
  return (
    <g>
      <circle cx={at[0]} cy={at[1] - 3} r="4.6" fill="#2f6b4f" />
      <circle cx={at[0] + 2.6} cy={at[1] - 5} r="3.2" fill="#3f9a6c" />
      <circle cx={at[0] - 2.6} cy={at[1] - 4.4} r="2.4" fill="#58b784" />
    </g>
  );
}

const lerp = (a: P, b: P, t: number): P => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];
/* rim shrubs on a tower's roof */
function RoofGarden({ o }: { o: Tower }) {
  const N: P = [o.c, o.yb - o.h];
  const L: P = [o.c - o.a, o.yb - S * o.a - o.h];
  const R: P = [o.c + o.b, o.yb - S * o.b - o.h];
  return (
    <g>
      <Shrub at={lerp(L, N, 0.4)} />
      <Shrub at={lerp(L, N, 0.75)} />
      <Shrub at={lerp(R, N, 0.5)} />
    </g>
  );
}

function Card({
  x,
  y,
  w,
  text,
  dot,
  d,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  dot: string;
  d: number;
}) {
  return (
    <g className="sk-pop" style={{ animationDelay: `${d}s` }}>
      <rect
        x={x}
        y={y}
        width={w}
        height="30"
        rx="10"
        fill="#fff"
        stroke="#e3e7ee"
      />
      <circle cx={x + 14} cy={y + 15} r="3.5" fill={dot} />
      <text
        x={x + 26}
        y={y + 19}
        fontSize="9"
        fontWeight="600"
        letterSpacing=".05em"
        fill="#0b1f45"
        fontFamily={FONT}
      >
        {text}
      </text>
    </g>
  );
}

function Tree({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 1.5} y="396" width="3" height="12" fill="#5a3a2a" />
      <circle cx={x} cy="390" r="10" fill="#2f6b4f" />
      <circle cx={x + 5} cy="386" r="7" fill="#3a8460" />
    </g>
  );
}

/* Hazy towers far behind the main block, to fill the skyline. */
const farT = (c: number, yb: number, h: number, a: number): Tower => ({
  id: 'E',
  c,
  yb,
  h,
  a,
  b: Math.round(a * 0.92),
  l: '#c6d0e1',
  r: '#dde4ef',
  top: '#eef2f8',
  bands: [h * 0.33, h * 0.66],
  band: '#aab6cc',
});
const FAR = [
  farT(150, 332, 210, 34),
  farT(262, 352, 250, 28),
  farT(590, 340, 262, 24),
  farT(522, 352, 272, 26),
  farT(660, 352, 312, 24),
];

function Tank({ at }: { at: P }) {
  return (
    <g>
      <g stroke="#aab6cc" strokeWidth="1.4">
        <line x1={at[0] - 5} y1={at[1]} x2={at[0] - 5} y2={at[1] - 7} />
        <line x1={at[0] + 5} y1={at[1]} x2={at[0] + 5} y2={at[1] - 7} />
      </g>
      <rect
        x={at[0] - 7}
        y={at[1] - 20}
        width="14"
        height="13"
        fill="#b9c5d9"
      />
      <ellipse cx={at[0]} cy={at[1] - 20} rx="7" ry="2.4" fill="#d3dcea" />
    </g>
  );
}

const orange: Tower = {
  id: 'A',
  c: 330,
  yb: 360,
  h: 300,
  a: 74,
  b: 62,
  l: '#a93a18',
  r: '#c4481f',
  top: '#e0763f',
  bands: [80, 170, 260],
  band: '#7a2a12',
  fins: '#ee7a3d',
  base: '#1d2a33',
};
const dark: Tower = {
  id: 'F',
  c: 470,
  yb: 382,
  h: 230,
  a: 52,
  b: 58,
  cw: 14,
  l: '#18213d',
  r: '#25325a',
  mid: '#1e2849',
  top: '#3c4a78',
  bands: [70, 150],
  band: '#0e1428',
  lit: true,
  sheen: true,
  base: '#10172b',
};
const tier = (c: number, yb: number, h: number, a: number): Tower => ({
  id: 'G',
  c,
  yb,
  h,
  a,
  b: a,
  l: '#a6c0b0',
  r: '#cde0d3',
  top: '#eef6f0',
  bands: [h / 2],
  band: '#7f9d8c',
});
/* crown that is lowered onto the orange tower */
const crown: Tower = {
  id: 'A',
  c: 330,
  yb: 360 - 300 - 2 * S * 12,
  h: 46,
  a: 50,
  b: 38,
  l: '#8f2f12',
  r: '#b03d17',
  top: '#e8884f',
  bands: [23],
  band: '#6a220e',
  sheen: true,
};
const back: Tower = {
  id: 'C',
  c: 410,
  yb: 335,
  h: 320,
  a: 30,
  b: 30,
  l: '#8fa8c4',
  r: '#a9bfd6',
  top: '#c9d8e8',
  bands: [100, 200],
  band: '#6f88a6',
};
const teal: Tower = {
  id: 'B',
  c: 650,
  yb: 398,
  h: 210,
  a: 28,
  b: 28,
  l: '#3f6b7a',
  r: '#4d8091',
  top: '#6fa0b0',
  bands: [70, 140],
  band: '#2c4f5c',
  sheen: true,
};
const brick: Tower = {
  id: 'D',
  c: 200,
  yb: 398,
  h: 90,
  a: 62,
  b: 52,
  l: '#74483a',
  r: '#8c5a45',
  top: '#a07060',
  bands: [30],
  band: '#4a2a1e',
};

export default function HeroSkyline() {
  const t1 = tier(596, 394, 90, 60);
  const t2 = tier(596, 394 - 90 - 2 * S * 9, 80, 42);
  const t3 = tier(596, 394 - 170 - 2 * S * 18, 70, 24);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-28 right-0 bottom-0 flex w-[62%] items-end justify-end max-md:w-full max-md:opacity-35"
    >
      <div className="bg-brand/10 absolute right-[-10%] bottom-[-12%] aspect-square w-[70%] rounded-full" />
      <svg
        viewBox="120 -24 560 444"
        preserveAspectRatio="xMaxYMax meet"
        className="relative h-[94%] w-full"
      >
        <defs>
          <Pattern id="A" win="#3b2a2b" hi="#8fa3b5" kind="ribbon" />
          <Pattern id="B" win="#5b5d68" hi="#9aa3b2" />
          <Pattern id="C" win="#7d8696" hi="#d8e0ee" />
          <Pattern id="F" win="#3a4a78" hi="#8fa3d0" kind="slit" />
          <Pattern id="G" win="#58786a" hi="#e9f5ee" kind="balcony" />
          <Pattern id="D" win="#e9dcc4" hi="#ffffff" />
          <Pattern id="E" win="#b3bfd3" hi="#f1f5fb" />
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".55" />
            <stop offset=".45" stopColor="#fff" stopOpacity="0" />
            <stop offset=".7" stopColor="#fff" stopOpacity=".28" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="far-grad"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="110"
            x2="0"
            y2="352"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask
            id="far-mask"
            maskUnits="userSpaceOnUse"
            x="100"
            y="-60"
            width="620"
            height="500"
          >
            <rect
              x="100"
              y="-60"
              width="620"
              height="500"
              fill="url(#far-grad)"
            />
          </mask>
        </defs>

        {/* drifting clouds */}
        <g fill="#fff" opacity=".7">
          <g className="sk-cloud">
            <ellipse cx="200" cy="40" rx="30" ry="7" />
            <ellipse cx="220" cy="33" rx="18" ry="8" />
          </g>
          <g className="sk-cloud sk-cloud-b">
            <ellipse cx="560" cy="14" rx="26" ry="6" />
            <ellipse cx="576" cy="8" rx="14" ry="6" />
          </g>
        </g>

        {/* ground shadow */}
        <ellipse
          cx="420"
          cy="410"
          rx="300"
          ry="13"
          fill="#0b1f45"
          opacity=".07"
        />

        {/* hazy background skyline (also draggable) */}
        <g mask="url(#far-mask)" opacity=".85">
          {FAR.map((f, i) => (
            <Drag key={f.c}>
              <Rise d={0.05 * i}>
                <Prism {...f} />
                <RoofGuard o={f} color="#e3a56d" />
                {i === 1 && <Tank at={roofCenter(f)} />}
                {(i === 3 || i === 4) && <Mast at={roofCenter(f)} len={26} />}
              </Rise>
            </Drag>
          ))}
        </g>

        {/* Every building is draggable (workers, lifelines and ladders move
            with it). The tower rises first, then its equipment attaches. */}
        <Drag>
          <Rise d={0}>
            <Prism {...back} />
          </Rise>
          <Attach d={6.0} from="top">
            <RoofGuard o={back} color="#f7861e" />
          </Attach>
          <Attach d={6.5} from="grow">
            <Mast at={roofCenter(back)} len={26} />
          </Attach>
        </Drag>

        <Drag>
          <Rise d={0.3}>
            <Prism {...teal} />
          </Rise>
          <Attach d={6.9} from="top">
            <PyramidCap o={teal} />
          </Attach>
        </Drag>

        {/* orange tower: ribbon glass, crown + spire, worker on the roof */}
        <Drag>
          <Rise d={0.05}>
            <Prism {...orange} />
          </Rise>
          <Attach d={1.8} from="top">
            <RoofGuard o={orange} color="#ffcc33" part="back" />
          </Attach>
          <Attach d={0.95} from="ladder" dur={0.85}>
            <Ladder
              xa={orange.c + 30}
              x0={orange.c}
              y0={orange.yb}
              m={-S}
              h={orange.h + 6}
              land={0.95 + 0.52}
            />
          </Attach>
          <Attach d={3.0} from="top" dur={1.6}>
            <Prism {...crown} />
          </Attach>
          <Attach d={4.6} from="grow">
            <Mast at={roofCenter(crown)} len={44} />
          </Attach>
          <Walker p0={[324, 58.2]} p1={[386, 39.6]} delay={8.6} />
          <Attach d={2.0} from="top">
            <RoofGuard o={orange} color="#ffcc33" part="front" />
          </Attach>
        </Drag>

        {/* dark tower: slit glass, lit windows, worker on the roof */}
        <Drag>
          <Rise d={0.2}>
            <Prism {...dark} />
          </Rise>
          <Attach d={3.4} from="top">
            <RoofGuard o={dark} color="#ffcc33" part="back" />
          </Attach>
          <Attach d={1.45} from="ladder" dur={0.85}>
            <Ladder
              xa={dark.c + 14 + 26}
              x0={dark.c + 14}
              y0={dark.yb}
              m={-S}
              h={dark.h + 6}
              land={1.45 + 0.52}
            />
          </Attach>
          <Attach d={5.4} from="top">
            <RoofBox
              at={[roofCenter(dark)[0] - 12, roofCenter(dark)[1]]}
              a={12}
              h={22}
              l="#4a3b2c"
              r="#5c4a38"
              top="#6e5a44"
            />
            <RoofBox
              at={[roofCenter(dark)[0] + 18, roofCenter(dark)[1] + 2]}
              a={9}
              h={10}
              l="#2a2a31"
              r="#34343c"
              top="#4a4b55"
            />
          </Attach>
          <Walker
            p0={[478, 150.2]}
            p1={[536, 132.8]}
            delay={9.6}
            T={8}
            kit={KIT_B}
            reverse
          />
          <Attach d={3.5} from="top">
            <RoofGuard o={dark} color="#ffcc33" part="front" />
          </Attach>
        </Drag>

        {/* green terraced tower with roof gardens */}
        <Drag>
          <Rise d={0.34}>
            <Prism {...t1} />
            <Prism {...t2} />
            <Prism {...t3} />
            <RoofGarden o={t1} />
            <RoofGarden o={t2} />
            <RoofGarden o={t3} />
          </Rise>
          <Attach d={7.4} from="grow">
            <Mast at={roofCenter(t3)} len={34} />
          </Attach>
        </Drag>

        {/* brick shop: striped awning, chimney, worker on the roof */}
        <Drag>
          <Rise d={0.48}>
            <Prism {...brick} />
            {/* shopfront + awning on the right face */}
            <polygon
              points={pts([
                [200, 398],
                [252, 398 - S * 52],
                [252, 398 - S * 52 - 26],
                [200, 372],
              ])}
              fill="#3a1d15"
            />
            {Array.from({ length: 8 }, (_, i) => {
              const w = 52 / 8;
              const x0 = 200 + i * w;
              const x1 = x0 + w;
              const yy = (x: number) => 372 - S * (x - 200);
              return (
                <polygon
                  key={i}
                  points={pts([
                    [x0, yy(x0)],
                    [x1, yy(x1)],
                    [x1, yy(x1) - 9],
                    [x0, yy(x0) - 9],
                  ])}
                  fill={i % 2 ? '#f4e9d8' : '#a3223b'}
                />
              );
            })}
            <polygon
              points={pts([
                [200, 398],
                [138, 398 - S * 62],
                [138, 398 - S * 62 - 26],
                [200, 372],
              ])}
              fill="#2c2420"
            />
            <polyline
              points={pts([
                [138, 398 - S * 62 - 90],
                [200, 308],
                [252, 398 - S * 52 - 90],
              ])}
              fill="none"
              stroke="#d9ccb4"
              strokeWidth="3"
            />
          </Rise>
          <Attach d={7.8} from="top">
            <RoofGuard o={brick} color="#f7861e" part="back" />
          </Attach>
          <Attach d={8.2} from="top">
            <RoofBox
              at={[roofCenter(brick)[0] + 12, roofCenter(brick)[1] + 4]}
              a={6}
              h={26}
              l="#5a2f24"
              r="#74402f"
              top="#2a1511"
            />
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                className="sk-smoke"
                style={{ animationDelay: `${9.2 + i * 1.1}s` }}
                cx={roofCenter(brick)[0] + 12}
                cy={roofCenter(brick)[1] - 24}
                r="3"
                fill="#fff"
              />
            ))}
          </Attach>
          <Walker
            p0={[194, 306.2]}
            p1={[246, 290.6]}
            delay={10.6}
            T={7}
            sc={0.8}
          />
          <Attach d={7.9} from="top">
            <RoofGuard o={brick} color="#f7861e" part="front" />
          </Attach>
        </Drag>

        <Tree x={286} />
        <Tree x={668} />

        <Card
          x={446}
          y={40}
          w={158}
          text="ANCHOR POINTS CERTIFIED"
          dot="#f7861e"
          d={9.6}
        />
        <Card
          x={140}
          y={176}
          w={100}
          text="LIFELINE C1"
          dot="#7ad0ea"
          d={10.2}
        />
      </svg>
    </div>
  );
}
