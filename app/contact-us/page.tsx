import type { Metadata } from 'next';
import Image from 'next/image';

import ContactForm from '@/app/components/contact/ContactForm';
import { company } from '@/app/lib/nav-data';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact Akrobat Pte Ltd for fall arrest equipment, height safety systems, rope access and inspection services in Singapore.',
};

// Google Maps (no API key needed for the embed)
const mapQuery = `${company.name}, ${company.address.join(', ')}`;
const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
const mapOpenHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
const mapDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;

export default function ContactPage() {
  return (
    <main
      id="enquiry"
      className="bg-navy relative isolate flex min-h-[calc(100svh-96px)] scroll-mt-28 items-center justify-center overflow-hidden px-[22px] py-16"
    >
      {/* background photo + navy tint so the card stays the focus */}
      <Image
        src="/contact-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <span
        aria-hidden
        className="from-navy/80 via-navy/55 to-navy/80 absolute inset-0 -z-10 bg-gradient-to-b"
      />
      <div className="grid w-full max-w-[960px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_60px_rgba(11,31,69,.2)] md:grid-cols-[5fr_6fr]">
        {/* Left: office map */}
        <section aria-label="Office location" className="bg-navy flex flex-col">
          <iframe
            title={`Map showing ${company.name} office location`}
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block min-h-[320px] w-full flex-1 border-0"
          />
          <div className="flex flex-wrap gap-3 p-4">
            <a
              href={mapOpenHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-brand-dark rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors"
            >
              Open in Maps
            </a>
            <a
              href={mapDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-navy rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white"
            >
              Directions
            </a>
          </div>
        </section>

        {/* Right: form */}
        <section className="text-navy p-8 sm:p-11">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight">
            Send us a <span className="text-brand">message</span>
          </h2>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
