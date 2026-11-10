'use client';
import {
  isGroup,
  mainMenu,
  subMenus,
  subMeta,
  type NavGroup,
  type SubKey,
} from '@/app/lib/nav-data';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Props = { open: boolean; onClose: () => void };

const delay = (s: number): CSSProperties => ({ ['--d' as string]: `${s}s` });

export default function Sidebar({ open, onClose }: Props) {
  const [activeKey, setActiveKey] = useState<SubKey | null>(null);
  const [groupIdx, setGroupIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, page scroll locked while open, focus moves to the close button
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Reset the sub-menu once the closing animation has finished
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setActiveKey(null);
      setGroupIdx(null);
    }, 1100);
    return () => clearTimeout(t);
  }, [open]);

  const toggleSub = (key: SubKey) => {
    setGroupIdx(null);
    setActiveKey((cur) => (cur === key ? null : key));
  };

  const items = activeKey ? subMenus[activeKey] : [];
  const selected = groupIdx !== null ? items[groupIdx] : undefined;
  const group: NavGroup | null =
    selected && isGroup(selected) ? selected : null;

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`bg-navy/55 fixed inset-0 z-[90] transition-opacity duration-1000 ${
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        id="site-menu"
        aria-label="Site menu"
        data-open={open}
        data-wide={activeKey !== null}
        inert={!open}
        className="drawer border-brand bg-navy fixed inset-y-0 right-0 z-[100] w-[min(430px,100vw)] translate-x-[104%] overflow-x-hidden overflow-y-auto border-t-[6px] px-[26px] pt-[calc(env(safe-area-inset-top,0px)+24px)] pb-9 text-white shadow-[-24px_0_60px_rgba(0,0,0,.22)] data-[open=true]:translate-x-0 data-[wide=true]:w-[min(880px,100vw)] max-[700px]:data-[wide=true]:w-screen min-[701px]:px-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="border-line hover:border-brand hover:bg-brand absolute top-[calc(env(safe-area-inset-top,0px)+20px)] right-6 size-11 cursor-pointer rounded-full border text-[15px] transition duration-300 hover:rotate-90 hover:text-white"
        >
          ✕
        </button>

        <div className="mt-16 grid grid-cols-1 gap-5 min-[701px]:mt-[70px] min-[701px]:grid-cols-[minmax(0,420px)_minmax(0,1fr)] min-[701px]:gap-10">
          {/* Level 1 */}
          <ul className="m-0 list-none p-0">
            {mainMenu.map((m, i) => (
              <li key={m.label}>
                {m.sub ? (
                  <button
                    type="button"
                    className="menu-item"
                    data-active={activeKey === m.sub}
                    aria-expanded={activeKey === m.sub}
                    style={delay(0.45 + i * 0.07)}
                    onClick={() => toggleSub(m.sub!)}
                  >
                    {m.label} <i>→</i>
                  </button>
                ) : (
                  <Link
                    href={m.href!}
                    className="menu-item"
                    style={delay(0.45 + i * 0.07)}
                    onClick={onClose}
                  >
                    {m.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Level 2 / 3. Keyed so the stagger animation replays on every change. */}
          <div className="min-w-0 pt-1.5">
            {activeKey && (
              <ul
                key={`${activeKey}-${groupIdx}`}
                className="m-0 list-none p-0"
              >
                {group ? (
                  <>
                    <li className="sub-item" style={delay(0.05)}>
                      <button
                        type="button"
                        className="sub-link !text-brand justify-start gap-2.5 pb-3.5 !text-sm font-semibold"
                        onClick={() => setGroupIdx(null)}
                      >
                        <span aria-hidden>←</span> {subMeta[activeKey].label}
                      </button>
                    </li>
                    <li
                      className="sub-item border-line mb-1.5 border-b pb-3 text-xl leading-tight font-bold"
                      style={delay(0.12)}
                    >
                      {group.label}
                    </li>
                    {group.children.map((c, i) => (
                      <li
                        key={c.href}
                        className="sub-item"
                        style={delay(0.2 + i * 0.07)}
                      >
                        <Link
                          href={c.href}
                          className="sub-link"
                          onClick={onClose}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                    <li
                      className="sub-item"
                      style={delay(0.2 + group.children.length * 0.07)}
                    >
                      <Link
                        href={group.href}
                        className="view-all"
                        onClick={onClose}
                      >
                        View all {group.label}
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    {items.map((it, i) => (
                      <li
                        key={it.href}
                        className="sub-item"
                        style={delay(0.2 + i * 0.07)}
                      >
                        {isGroup(it) ? (
                          <button
                            type="button"
                            className="sub-link justify-between"
                            onClick={() => setGroupIdx(i)}
                          >
                            {it.label} <span className="text-brand">→</span>
                          </button>
                        ) : (
                          <Link
                            href={it.href}
                            className="sub-link"
                            onClick={onClose}
                          >
                            {it.label}
                          </Link>
                        )}
                      </li>
                    ))}
                    <li
                      className="sub-item"
                      style={delay(0.2 + items.length * 0.07)}
                    >
                      <Link
                        href={subMeta[activeKey].href}
                        className="view-all"
                        onClick={onClose}
                      >
                        View all
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
