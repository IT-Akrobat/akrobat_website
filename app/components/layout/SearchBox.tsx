'use client';

import { searchIndex } from '@/app/lib/nav-data';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const listId = useId();
  const router = useRouter();

  const results = useMemo(() => {
    const v = query.trim().toLowerCase();
    if (!v) return [];
    return searchIndex
      .filter((i) => i.label.toLowerCase().includes(v))
      .slice(0, 7);
  }, [query]);

  const showList = open && query.trim().length > 0;

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setExpanded(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  const reset = () => {
    setOpen(false);
    setExpanded(false);
    setQuery('');
  };

  return (
    <form
      ref={formRef}
      role="search"
      autoComplete="off"
      className="relative flex-none"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) {
          router.push(results[0].href);
          reset();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setOpen(false);
          setExpanded(false);
        }
      }}
    >
      <div
        className={`flex h-12 items-center overflow-hidden rounded-full border-2 bg-[#fffaf3] transition-[width,box-shadow,border-color] duration-300 max-[480px]:h-11 ${
          expanded
            ? 'border-brand w-[min(340px,50vw)] shadow-[0_0_0_4px_rgba(247,134,30,.28)]'
            : 'w-12 border-transparent shadow-[0_2px_8px_rgba(11,31,69,.15)] max-[480px]:w-11'
        }`}
      >
        {expanded && (
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search products, solutions…"
            aria-label="Search"
            aria-controls={listId}
            aria-expanded={showList}
            className="text-navy min-w-0 flex-1 border-0 bg-transparent pl-4 text-[14.5px] outline-0 placeholder:text-[#7b887f]"
          />
        )}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? 'Close search' : 'Open search'}
          className="text-navy grid size-11 flex-none cursor-pointer place-items-center max-[480px]:size-10"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="size-[18px] fill-none stroke-current stroke-2 [stroke-linecap:round]"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
        </button>
      </div>

      {showList && (
        <div
          id={listId}
          className="border-line bg-surf absolute top-[calc(100%+12px)] right-0 max-h-[340px] w-[min(340px,calc(100vw-2rem))] overflow-auto rounded-[20px] border p-2 shadow-[0_20px_44px_rgba(0,0,0,.2)]"
        >
          {results.length ? (
            results.map((r) => (
              <Link
                key={r.href + r.label}
                href={r.href}
                onClick={reset}
                className="group/item text-ink hover:bg-brand flex justify-between gap-3 rounded-xl px-3.5 py-[11px] text-[15px] hover:text-white"
              >
                <span>{r.label}</span>
                <small className="text-brand-dark text-xs font-semibold group-hover/item:text-white">
                  {r.type}
                </small>
              </Link>
            ))
          ) : (
            <p className="text-mute px-3.5 py-3 text-[14.5px]">
              No matching results. Try “lifeline” or “ladder”.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
