import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock } from "lucide-react";
import { wedding } from "@/data/wedding";

gsap.registerPlugin(ScrollTrigger);

export function OrderOfDay() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const line = rootRef.current!.querySelector<HTMLElement>("[data-schedule-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: true,
            },
          },
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ivory px-6 py-24 text-ink" ref={rootRef}>
      <div className="mx-auto max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">
          What we have planned for you
        </p>
        <h2 className="mt-3 font-script text-6xl text-burgundy">Order of the Day</h2>
      </div>

      <div className="relative mx-auto mt-14 max-w-md">
        <div
          data-schedule-line
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px origin-top bg-ink/25"
        />
        <ol className="space-y-8">
          {wedding.schedule.map((item) => (
            <li key={item.time} className="relative pl-10">
              <span className="absolute left-[9px] top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-burgundy ring-4 ring-ivory" />
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-ink/60">
                <Clock className="h-3 w-3" strokeWidth={1.4} />
                {item.time}
              </div>
              <h3 className="mt-1 font-serif-display text-xl text-ink">{item.title}</h3>
              {item.note && <p className="mt-0.5 text-sm italic text-ink/60">{item.note}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
