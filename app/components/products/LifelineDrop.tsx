/* Looping drawing: a worker drops, the cable stretches, the fall is
   arrested, then it resets. Pure CSS, see .fa-* in globals.css. */
export default function LifelineDrop({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 470"
      className={className}
      role="img"
      aria-label="A worker's fall being arrested by a lifeline"
    >
      {/* anchor beam */}
      <rect
        x="30"
        y="14"
        width="140"
        height="14"
        rx="3"
        className="fill-white/90"
      />
      <circle cx="100" cy="21" r="9" className="fill-brand" />
      <circle cx="100" cy="21" r="3.5" className="fill-navy" />
      {/* cable (60 units at rest, stretches with the drop) */}
      <rect
        x="99"
        y="30"
        width="2"
        height="60"
        className="fa-cable fill-brand"
      />
      {/* worker */}
      <g className="fa-fig">
        <circle
          cx="100"
          cy="92"
          r="6"
          className="stroke-brand fill-none stroke-[2.5]"
        />
        <circle cx="109" cy="106" r="10" className="fill-white" />
        <path
          d="M100 112 V176"
          className="stroke-white stroke-[9] [stroke-linecap:round]"
        />
        <path
          d="M100 118 L122 100 M100 124 L84 142"
          className="stroke-white stroke-[5] [stroke-linecap:round]"
        />
        <path
          d="M100 176 L88 222 M100 176 L116 220"
          className="stroke-white stroke-[6] [stroke-linecap:round]"
        />
        <path
          d="M92 116 L108 170 M108 116 L92 170"
          className="stroke-brand stroke-[3]"
        />
      </g>
      {/* result label */}
      <g className="fa-label">
        <text
          x="100"
          y="448"
          textAnchor="middle"
          className="fill-brand text-[13px] font-extrabold tracking-[0.18em]"
        >
          ARRESTED
        </text>
      </g>
    </svg>
  );
}
