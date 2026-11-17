'use client';

import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { type Sector, sectorHref } from '@/app/lib/projects-data';

/* One building per sector, drawn in SVG. A lifeline runs across the roofs
   and a carabiner slides to whichever building is selected. */

const STEP = 150;
const GROUND = 300;
const WIN = '#fdf3e6'; // window colour = page background

type Building = {
  short: string;
  top: number; // highest point where the lifeline post stands
  draw: (c: number) => ReactNode;
};

const rect = (
  x: number,
  y: number,
  w: number,
  h: number,
  fill = 'currentColor',
) => <rect x={x} y={y} width={w} height={h} fill={fill} />;

const grid = (
  x: number,
  y: number,
  cols: number,
  rows: number,
  w: number,
  h: number,
  gx: number,
  gy: number,
) =>
  Array.from({ length: cols * rows }, (_, i) => (
    <rect
      key={i}
      x={x + (i % cols) * gx}
      y={y + Math.floor(i / cols) * gy}
      width={w}
      height={h}
      fill={WIN}
    />
  ));

const buildings: Record<string, Building> = {
  entertainment: {
    short: 'Entertainment',
    top: 123,
    draw: (c) => (
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx={c} cy={185} r={62} strokeWidth={5} />
        <path
          d={`M${c - 62} 185H${c + 62}M${c} 123V247M${c - 44} 141L${c + 44} 229M${c + 44} 141L${c - 44} 229`}
          strokeWidth={3}
        />
        <path d={`M${c - 34} 300L${c} 185L${c + 34} 300`} strokeWidth={5} />
      </g>
    ),
  },
  government: {
    short: 'Government',
    top: 175,
    draw: (c) => (
      <g>
        <polygon
          points={`${c - 66},222 ${c},175 ${c + 66},222`}
          fill="currentColor"
        />
        {rect(c - 58, 222, 116, 78)}
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={c - 42 + i * 28}
            y={234}
            width={10}
            height={54}
            fill={WIN}
          />
        ))}
      </g>
    ),
  },
  factories: {
    short: 'Factories',
    top: 205,
    draw: (c) => (
      <g>
        {rect(c - 62, 230, 124, 70)}
        <polygon
          points={`${c - 62},230 ${c - 62},205 ${c - 21},230 ${c - 21},205 ${c + 20},230 ${c + 20},205 ${c + 62},230`}
          fill="currentColor"
        />
        {rect(c + 40, 200, 16, 40)}
        {grid(c - 48, 252, 4, 1, 16, 26, 30, 0)}
      </g>
    ),
  },
  'oil-offshore': {
    short: 'Oil Offshore',
    top: 120,
    draw: (c) => (
      <g>
        {rect(c - 62, 205, 124, 14)}
        <path
          d={`M${c - 46} 219V300M${c + 46} 219V300M${c - 46} 250L${c + 46} 285M${c + 46} 250L${c - 46} 285`}
          stroke="currentColor"
          strokeWidth={4}
          fill="none"
        />
        <path
          d={`M${c - 20} 205L${c} 120L${c + 20} 205M${c - 14} 175H${c + 14}M${c - 9} 150H${c + 9}`}
          stroke="currentColor"
          strokeWidth={4}
          fill="none"
          strokeLinejoin="round"
        />
        {rect(c + 28, 185, 26, 20)}
      </g>
    ),
  },
  schools: {
    short: 'Schools',
    top: 190,
    draw: (c) => (
      <g>
        {rect(c - 66, 238, 132, 62)}
        {rect(c - 14, 200, 28, 40)}
        <polygon
          points={`${c - 20},200 ${c},182 ${c + 20},200`}
          fill="currentColor"
        />
        <circle cx={c} cy={218} r={7} fill={WIN} />
        {grid(c - 54, 254, 5, 1, 14, 22, 24, 0)}
      </g>
    ),
  },
  'condominium-hotel': {
    short: 'Condo / Hotel',
    top: 100,
    draw: (c) => (
      <g>
        {rect(c - 38, 100, 76, 200)}
        {grid(c - 28, 114, 3, 8, 12, 14, 22, 23)}
        {rect(c - 46, 280, 92, 20)}
      </g>
    ),
  },
  'shopping-center-offices': {
    short: 'Retail / Offices',
    top: 115,
    draw: (c) => (
      <g>
        {rect(c - 58, 160, 50, 140)}
        {rect(c - 2, 115, 52, 185)}
        {grid(c - 50, 172, 3, 6, 10, 12, 15, 21)}
        {grid(c + 6, 128, 3, 8, 10, 12, 15, 21)}
      </g>
    ),
  },
  international: {
    short: 'International',
    top: 135,
    draw: (c) => (
      <g>
        {rect(c - 8, 172, 16, 128)}
        <polygon
          points={`${c - 34},172 ${c + 34},172 ${c + 24},140 ${c - 24},140`}
          fill="currentColor"
        />
        <rect x={c - 20} y={150} width={40} height={9} fill={WIN} />
        {rect(c - 60, 296, 120, 4)}
      </g>
    ),
  },
};

export default function Skyline({ sectors }: { sectors: Sector[] }) {
  const [id, setId] = useState(sectors[0].id);
  const current = sectors.find((s) => s.id === id) ?? sectors[0];
  const W = sectors.length * STEP;

  const pts = sectors.map((s, i) => ({
    s,
    c: STEP / 2 + i * STEP,
    y: (buildings[s.id]?.top ?? 200) - 20,
  }));
  const sel = pts.find((p) => p.s.id === id) ?? pts[0];
  const cable =
    `M6 ${pts[0].y} ` +
    pts.map((p) => `L${p.c} ${p.y}`).join(' ') +
    ` L${W - 6} ${pts[pts.length - 1].y}`;

  return (
    <div>
      <div className="overflow-x-auto rounded-[28px] bg-white">
        <svg
          viewBox={`0 0 ${W} 345`}
          className="mx-auto block w-full min-w-[900px]"
          role="group"
          aria-label="Project sectors. Select a building to see the sector."
        >
          {/* lifeline */}
          <path
            d={cable}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={3}
            strokeDasharray="1 0"
          />
          {pts.map(({ s, c, y }) => (
            <line
              key={s.id}
              x1={c}
              x2={c}
              y1={y}
              y2={y + 20}
              stroke="var(--color-brand)"
              strokeWidth={3}
            />
          ))}

          {/* ground */}
          <rect
            x={0}
            y={GROUND}
            width={W}
            height={4}
            fill="var(--color-navy)"
          />

          {pts.map(({ s, c }) => {
            const b = buildings[s.id];
            if (!b) return null;
            const on = s.id === id;
            return (
              <g
                key={s.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={s.label}
                onClick={() => setId(s.id)}
                onMouseEnter={() => setId(s.id)}
                onFocus={() => setId(s.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setId(s.id);
                  }
                }}
                className={`cursor-pointer transition-colors outline-none ${on ? 'text-brand' : 'text-navy hover:text-navy-2'}`}
              >
                <rect
                  x={c - STEP / 2}
                  y={70}
                  width={STEP}
                  height={275}
                  fill="transparent"
                />
                {b.draw(c)}
                <text
                  x={c}
                  y={332}
                  textAnchor="middle"
                  className={`text-[14px] font-bold ${on ? 'fill-brand-dark' : 'fill-navy'}`}
                >
                  {b.short}
                </text>
              </g>
            );
          })}

          {/* carabiner sliding on the lifeline */}
          <g
            aria-hidden
            className="transition-transform duration-700 ease-[cubic-bezier(.22,.8,.25,1)] motion-reduce:transition-none"
            style={{ transform: `translate(${sel.c}px, ${sel.y}px)` }}
          >
            <rect
              x={-9}
              y={-6}
              width={18}
              height={12}
              rx={6}
              fill="var(--color-brand)"
              stroke="#fff"
              strokeWidth={2}
            />
            <line
              x1={0}
              y1={6}
              x2={0}
              y2={20}
              stroke="var(--color-navy)"
              strokeWidth={2}
            />
            <circle cx={0} cy={24} r={5} fill="var(--color-navy)" />
          </g>
        </svg>
      </div>

      {/* selected sector */}
      <div
        className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]"
        aria-live="polite"
      >
        <div className="rounded-[28px] bg-white p-8">
          <p className="text-brand-dark text-sm font-bold">{current.region}</p>
          <h2 className="text-navy mt-1 text-[clamp(28px,3.2vw,40px)] leading-tight font-extrabold tracking-tight">
            {current.label}
          </h2>
          <p className="text-mute mt-3 max-w-[420px] text-[17px] leading-relaxed">
            {current.blurb}
          </p>
          <Link
            href={sectorHref(current)}
            className="bg-navy hover:bg-navy-2 mt-6 inline-block rounded-full px-6 py-3 text-[15px] font-bold text-white transition-colors"
          >
            See {current.label} projects
          </Link>
        </div>
        <div className="rounded-[28px] bg-white p-3">
          {current.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.image}
              alt=""
              className="aspect-[16/8] w-full rounded-[20px] object-cover"
            />
          ) : (
            <div
              role="img"
              aria-label={`Picture of ${current.label} projects to be added`}
              className="border-navy/25 text-mute grid aspect-[16/8] place-items-center rounded-[20px] border-2 border-dashed text-[15px] font-semibold"
            >
              {current.projects.length
                ? current.projects.join(', ')
                : 'Pictures to be added'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
