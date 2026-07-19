import { useState } from "react";
import { MapPin, ScanLine } from "lucide-react";
import { wedding } from "@/data/wedding";

export function VenueSection() {
  const [qrMissing, setQrMissing] = useState(false);
  const { venue } = wedding;

  return (
    <section className="bg-ivory px-8 py-16 text-burgundy">
      <div className="mx-auto max-w-md text-center">
        <img
          src="/line.png"
          alt=""
          className="mx-auto h-auto w-44 opacity-80"
          loading="lazy"
          aria-hidden="true"
        />
        <h2 className="mt-14 flex items-center justify-center gap-2 font-script text-[2.45rem] leading-none text-burgundy sm:text-5xl">
          <span>When</span>
          <span>&amp;</span>
          <span>Where</span>
        </h2>

        <div className="mt-10 flex items-start justify-center">
          <div className="w-20 text-center">
            <p className="font-serif-display text-[1.35rem] font-semibold leading-none">
              {venue.startsAt}
            </p>
            <p className="mt-5 font-serif-display text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
              Starts
            </p>
          </div>
          <img
            src="/line2.png"
            alt=""
            className="mx-1 mt-2.5 h-auto w-32 max-w-[34vw] opacity-80"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="w-20 text-center">
            <p className="font-serif-display text-[1.35rem] font-semibold leading-none">
              {venue.endsAt}
            </p>
            <p className="mt-5 font-serif-display text-[0.65rem] font-semibold uppercase tracking-[0.08em]">
              Ends
            </p>
          </div>
        </div>

        <img
          src="/line.png"
          alt=""
          className="mx-auto mt-14 h-auto w-44 opacity-80"
          loading="lazy"
          aria-hidden="true"
        />

        <div className="mt-12">
          <MapPin className="mx-auto h-5 w-5 text-burgundy/70" strokeWidth={1.4} />
          <p className="mt-3 font-serif-display text-xl tracking-widest">{venue.name}</p>
          {venue.lines.map((l) => (
            <p key={l} className="mt-1 text-xs uppercase tracking-[0.35em] text-burgundy/70">
              {l}
            </p>
          ))}
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-8 block w-full max-w-xs rounded-lg border border-burgundy/15 p-5 text-burgundy shadow-sm transition hover:scale-[1.02]"
          aria-label="Open venue location in Google Maps"
        >
          <div className="grid aspect-square w-full place-items-center overflow-hidden rounded bg-transparent">
            {qrMissing ? (
              <div className="text-center text-burgundy/50">
                <ScanLine className="mx-auto h-10 w-10" strokeWidth={1.2} />
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em]">QR placeholder</p>
              </div>
            ) : (
              <img
                src={venue.qr}
                alt="QR code linking to the venue location on Google Maps"
                className="h-full w-full object-contain"
                loading="lazy"
                onError={() => setQrMissing(true)}
              />
            )}
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-burgundy/70">
            <ScanLine className="h-4 w-4" strokeWidth={1.4} />
            Tap or scan for location
          </div>
        </a>
      </div>
    </section>
  );
}
