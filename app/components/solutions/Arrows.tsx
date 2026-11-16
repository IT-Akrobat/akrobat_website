'use client';

/* Round arrow buttons, shared by both carousels. */
export default function Arrows({
  onPrev,
  onNext,
  className = '',
}: {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}) {
  const btn =
    'bg-navy hover:bg-brand grid size-[52px] place-items-center rounded-full text-[20px] text-white shadow-[0_8px_20px_rgba(11,31,69,.18)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]';
  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        type="button"
        aria-label="Previous"
        onClick={onPrev}
        className={btn}
      >
        ←
      </button>
      <button type="button" aria-label="Next" onClick={onNext} className={btn}>
        →
      </button>
    </div>
  );
}
