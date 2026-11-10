'use client';

import { useEffect, useState } from 'react';

/* Looping story: a technician walks the roof edge clipped to a lifeline,
   loses his footing, the lanyard stretches and he is caught.
   Animation lives in globals.css (.fs-*). It replays every 11 s because
   the key changes, which remounts the SVG and restarts every animation. */
export default function RooftopScene({
  className = '',
}: {
  className?: string;
}) {
  const [run, setRun] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setRun((r) => r + 1), 11000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <svg
        key={run}
        viewBox="0 0 700 540"
        className="fs size-full"
        role="img"
        aria-label="A technician slips off a roof edge and his lanyard arrests the fall"
      >
        <defs>
          <linearGradient id="fs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1f45" />
            <stop offset="1" stopColor="#2a4a8f" />
          </linearGradient>
          <pattern
            id="fs-win"
            width="44"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <rect width="44" height="36" fill="#3a4660" />
            <rect
              x="6"
              y="6"
              width="32"
              height="22"
              rx="2"
              fill="#7fa3d6"
              opacity=".55"
            />
          </pattern>
        </defs>
        <rect width="700" height="540" fill="url(#fs-sky)" />
        {/* distant skyline */}
        <g fill="#fff" opacity=".07">
          <rect x="520" y="230" width="60" height="310" />
          <rect x="585" y="190" width="45" height="350" />
          <rect x="655" y="260" width="45" height="280" />
        </g>
        {/* building wall + roof slab */}
        <rect x="0" y="362" width="516" height="178" fill="url(#fs-win)" />
        <rect x="0" y="350" width="522" height="14" rx="2" fill="#d5dbe8" />
        <rect x="0" y="364" width="522" height="4" fill="#000" opacity=".25" />
        {/* roof clutter */}
        <rect x="250" y="316" width="78" height="34" rx="3" fill="#8e9bb5" />
        <rect x="258" y="322" width="62" height="6" fill="#6b7893" />
        {/* lifeline posts + cable + far tower */}
        <g fill="#e8eaf0">
          <rect x="38" y="140" width="5" height="210" />
          <rect x="278" y="140" width="5" height="210" />
          <rect x="498" y="140" width="5" height="210" />
        </g>
        <rect x="630" y="140" width="20" height="400" fill="#14306b" />
        <rect x="40" y="139" width="600" height="2.5" fill="#f7861e" />
        {[40, 280, 500].map((x) => (
          <circle key={x} cx={x + 2.5} cy="140" r="6" fill="#f7861e" />
        ))}

        {/* lanyard + trolley */}
        <rect
          className="fs-lan"
          x="-1"
          y="140"
          width="2.2"
          height="92"
          fill="#f7861e"
        />
        <rect
          className="fs-trol"
          x="-9"
          y="132"
          width="18"
          height="16"
          rx="4"
          fill="#fff"
          stroke="#f7861e"
          strokeWidth="3"
        />

        {/* ---------- the technician (origin = back D-ring, facing right) ---------- */}
        <g className="fs-man">
          <g transform="translate(9,0)">
            {/* far arm + leg, darker */}
            <g style={{ filter: 'brightness(.7)' }}>
              <g transform="translate(2,-10)">
                <g className="fs-armB">
                  <path
                    d="M0 0V28"
                    stroke="#e9eef7"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  <g transform="translate(0,28)">
                    <g className="fs-elbow">
                      <path
                        d="M0 0V24"
                        stroke="#c68a5e"
                        strokeWidth="7"
                        strokeLinecap="round"
                      />
                      <circle cx="0" cy="27" r="5" fill="#f7861e" />
                    </g>
                  </g>
                </g>
              </g>
              <g transform="translate(2,40)">
                <g className="fs-legB">
                  <path
                    d="M0 0V38"
                    stroke="#2b3a55"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  <g transform="translate(0,38)">
                    <g className="fs-kneeB">
                      <path
                        d="M0 0V38"
                        stroke="#2b3a55"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />
                      <path d="M-5 34h17q5 2 5 7h-22z" fill="#15181f" />
                    </g>
                  </g>
                </g>
              </g>
            </g>

            {/* torso, vest, harness */}
            <g className="fs-bob">
              <path d="M-9 -16Q-13 14 -8 44H11Q15 14 9 -16Z" fill="#d7f02f" />
              <path
                d="M-11 -14Q-3 -22 11 -14L12 -4H-10Z"
                fill="#e9eef7"
                opacity=".0"
              />
              <rect
                x="-9"
                y="14"
                width="19"
                height="3.5"
                fill="#e6e9ef"
                opacity=".85"
              />
              <rect
                x="-9"
                y="28"
                width="19"
                height="3.5"
                fill="#e6e9ef"
                opacity=".85"
              />
              <path
                d="M-7 -15L9 38M9 -15L-7 38"
                stroke="#14171d"
                strokeWidth="3"
              />
              <rect
                x="-10"
                y="38"
                width="22"
                height="5"
                rx="2"
                fill="#14171d"
              />
              <rect x="-2" y="-13" width="9" height="3" fill="#14171d" />
              <circle
                cx="-9"
                cy="0"
                r="4.5"
                fill="none"
                stroke="#f7861e"
                strokeWidth="2.4"
              />
              {/* neck + head + helmet */}
              <rect x="0" y="-30" width="8" height="12" rx="3" fill="#c68a5e" />
              <ellipse cx="5" cy="-40" rx="9" ry="10.5" fill="#c68a5e" />
              <path
                d="M-5 -43Q-4 -62 7 -62Q20 -60 19 -43L25 -42L20 -40H-5Z"
                fill="#fff"
              />
              <path
                d="M-4 -49Q7 -54 18 -48"
                stroke="#f7861e"
                strokeWidth="2.5"
                fill="none"
              />
              <circle cx="12" cy="-38" r="1.3" fill="#1b1b1b" />
              <path
                d="M2 -36L4 -28H10"
                stroke="#14171d"
                strokeWidth="1.3"
                fill="none"
              />
            </g>

            {/* near leg + arm */}
            <g transform="translate(2,40)">
              <g className="fs-legA">
                <path
                  d="M0 0V38"
                  stroke="#34466a"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <rect x="-7" y="8" width="14" height="3.5" fill="#14171d" />
                <g transform="translate(0,38)">
                  <g className="fs-kneeA">
                    <path
                      d="M0 0V38"
                      stroke="#34466a"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <path d="M-5 34h17q5 2 5 7h-22z" fill="#15181f" />
                  </g>
                </g>
              </g>
            </g>
            <g transform="translate(2,-10)">
              <g className="fs-armA">
                <path
                  d="M0 0V28"
                  stroke="#fff"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <g transform="translate(0,28)">
                  <g className="fs-elbow">
                    <path
                      d="M0 0V24"
                      stroke="#c68a5e"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="27" r="5" fill="#f7861e" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>

      <div
        key={`b${run}`}
        className="fs-badge bg-brand absolute bottom-4 left-4 rounded-full px-5 py-2 text-xs font-extrabold tracking-[0.18em] text-white uppercase"
      >
        Fall arrested · back on the roof safely
      </div>
    </div>
  );
}
