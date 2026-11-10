'use client';

import { useState } from 'react';

import { company } from '@/app/lib/nav-data';

const label =
  'text-navy mb-2 block text-xs font-bold tracking-[0.08em] uppercase';
const field =
  'border-line text-navy focus:border-brand w-full rounded-[14px] border-2 bg-[#f6f8fc] px-4 py-3 text-[15px] outline-0 transition placeholder:text-[#8b95a7] focus:bg-white focus:shadow-[0_0_0_4px_rgba(247,134,30,.2)]';

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '').trim();
    const body = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Phone: ${get('phone') || '-'}`,
      '',
      get('message'),
    ].join('\n');
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry from ${get('name')}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className={label}>
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className={label}>
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-phone" className={label}>
          Phone{' '}
          <span className="font-medium tracking-normal text-[#8b95a7] normal-case">
            (optional)
          </span>
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+65"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={label}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          placeholder="How can we help?"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="group bg-navy-2 hover:bg-navy inline-flex cursor-pointer items-center gap-3 rounded-full py-1.5 pr-1.5 pl-7 text-[15px] font-bold text-white transition-colors"
      >
        Send message
        <span className="bg-brand group-hover:bg-brand-dark grid size-[42px] place-items-center rounded-full transition-all duration-300 group-hover:-rotate-45">
          <svg
            viewBox="0 0 24 24"
            className="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>
      {sent && (
        <p role="status" className="text-mute text-sm">
          Your email app should open with the message ready to send.
        </p>
      )}
    </form>
  );
}
