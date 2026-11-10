import Image from 'next/image';

import { images } from '@/app/lib/product-data';

/* A picture frame that fills its parent. Until a photo is added in
   product-data.ts it shows a labelled placeholder so we can agree which
   image goes where, e.g. "put FA-03 in the harness slot". */
export default function ImageSlot({
  id,
  hint,
  dark = false,
  className = '',
}: {
  id: string;
  hint: string;
  dark?: boolean;
  className?: string;
}) {
  const src = images[id];
  if (src) {
    return (
      <div className={`relative size-full ${className}`}>
        <Image
          src={src}
          alt={hint}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  const c = dark
    ? 'text-white/60 border-white/40'
    : 'text-navy-2/60 border-navy-2/40';
  const corner = `absolute size-5 ${c}`;
  return (
    <div
      className={`relative size-full ${dark ? 'slot-dark' : 'slot'} ${className}`}
      role="img"
      aria-label={`Image placeholder ${id}: ${hint}`}
    >
      <span className={`${corner} top-4 left-4 border-t-2 border-l-2`} />
      <span className={`${corner} top-4 right-4 border-t-2 border-r-2`} />
      <span className={`${corner} bottom-4 left-4 border-b-2 border-l-2`} />
      <span className={`${corner} right-4 bottom-4 border-r-2 border-b-2`} />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 p-8 text-center ${dark ? 'text-white/70' : 'text-navy-2/70'}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-9 fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round]"
          aria-hidden
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="1.8" />
          <path d="m21 16-5-5-8 8" />
        </svg>
        <span className="font-mono text-[22px] font-bold tracking-wider">
          {id}
        </span>
        <span className="max-w-[260px] text-[13px] leading-snug">{hint}</span>
      </div>
    </div>
  );
}
