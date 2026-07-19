import { useState } from "react";
import { MapPin, ScanLine } from "lucide-react";
import { wedding } from "@/data/wedding";

export function VenueSection() {
  const [qrMissing, setQrMissing] = useState(false);
  const { venue } = wedding;

  return (
    <section className="bg-ink px-6 py-24 text-ivory">
      <div className="mx-auto max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-ivory/60">The Details</p>
        <h2 className="mt-3 font-script text-6xl text-blush">When &amp; Where</h2>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-md border border-ivory/15 py-6">
            <p className="font-serif-display text-3xl">{venue.startsAt}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-ivory/60">Starts</p>
          </div>
          <div className="rounded-md border border-ivory/15 py-6">
            <p className="font-serif-display text-3xl">{venue.endsAt}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-ivory/60">Ends</p>
          </div>
        </div>

        <div className="mt-10">
          <MapPin className="mx-auto h-5 w-5 text-blush" strokeWidth={1.4} />
          <p className="mt-3 font-serif-display text-xl tracking-widest">{venue.name}</p>
          {venue.lines.map((l) => (
            <p key={l} className="mt-1 text-xs uppercase tracking-[0.35em] text-ivory/70">
              {l}
            </p>
          ))}
        </div>

        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto mt-8 block w-full max-w-xs rounded-lg border border-ivory/15 p-5 text-ivory shadow-lg transition hover:scale-[1.02]"
          aria-label="Open venue location in Google Maps"
        >
          <div className="grid aspect-square w-full place-items-center overflow-hidden rounded bg-transparent">
            {qrMissing ? (
              <div className="text-center text-ivory/50">
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
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ivory/70">
            <ScanLine className="h-4 w-4" strokeWidth={1.4} />
            Tap or scan for location
          </div>
        </a>
      </div>
    </section>
  );
}
