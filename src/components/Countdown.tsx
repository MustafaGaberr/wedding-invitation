import { useCountdown } from "@/hooks/useCountdown";
import { wedding } from "@/data/wedding";

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const c = useCountdown(wedding.dateISO);

  return (
    <section className="bg-ink px-6 py-20 text-ivory" aria-label="Countdown to the wedding day">
      <h2 className="text-center text-[10px] uppercase tracking-[0.5em] text-ivory/60">
        Counting the days
      </h2>
      {c.done ? (
        <p className="mt-8 text-center font-script text-5xl text-blush">
          Today is the day 🤍
        </p>
      ) : (
        <div
          className="mx-auto mt-8 grid max-w-md grid-cols-4 gap-3 text-center"
          aria-live="off"
        >
          {[
            { label: "Days", value: c.days },
            { label: "Hours", value: c.hours },
            { label: "Minutes", value: c.minutes },
            { label: "Seconds", value: c.seconds },
          ].map((u) => (
            <div
              key={u.label}
              className="rounded-md border border-ivory/15 bg-ivory/5 px-2 py-4"
            >
              <div className="font-serif-display text-3xl tabular-nums text-ivory sm:text-4xl">
                {pad(u.value)}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ivory/60">
                {u.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}