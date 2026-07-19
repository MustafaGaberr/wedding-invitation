import { useCountdown } from "@/hooks/useCountdown";
import { wedding } from "@/data/wedding";

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown() {
  const c = useCountdown(wedding.dateISO);
  const units = [
    { label: "Days", value: c.days },
    { label: "Hours", value: c.hours },
    { label: "Minutes", value: c.minutes },
    { label: "Seconds", value: c.seconds },
  ];

  return (
    <section
      className="border-y border-burgundy/10 bg-[#e8aaa5]/10 px-6 py-10 text-burgundy shadow-[inset_0_1px_0_rgba(255,255,255,0.36),inset_0_-1px_0_rgba(105,34,25,0.06)] backdrop-blur-2xl"
      aria-label="Countdown to the wedding day"
    >
      <h2 className="text-center font-script text-4xl leading-none text-burgundy sm:text-5xl">
        Countdown
      </h2>
      {c.done ? (
        <p className="mt-8 text-center font-script text-5xl text-burgundy">Today is the day</p>
      ) : (
        <div
          className="mx-auto mt-5 flex max-w-md items-start justify-center text-center"
          aria-live="off"
        >
          {units.map((u, index) => (
            <div key={u.label} className="flex items-start">
              <div className="w-[4.4rem]">
                <div className="font-countdown-number text-[2.1rem] font-medium leading-none tabular-nums text-burgundy sm:text-[2.75rem]">
                  {pad(u.value)}
                </div>
                <div className="mt-2 font-serif-display text-[10px] font-semibold uppercase tracking-[0.08em] text-burgundy sm:text-xs">
                  {u.label}
                </div>
              </div>
              {index < units.length - 1 && (
                <span className="px-1 pt-0.5 font-countdown-number text-[2rem] font-medium leading-none text-burgundy sm:px-2 sm:text-[2.6rem]">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
