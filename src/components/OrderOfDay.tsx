import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding } from "@/data/wedding";

gsap.registerPlugin(ScrollTrigger);

export function OrderOfDay() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-schedule-line]");
      if (lines.length) {
        gsap.fromTo(
          lines,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            stagger: 0.12,
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
        <h2 className="mt-3 font-script text-6xl text-burgundy">Order of the Day</h2>
        <p className="text-[10px] uppercase tracking-[0.5em] mt-5 text-ink/50">
          What we have planned for you
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-md">
        <ol>
          {wedding.schedule.map((item, index) => (
            <li key={item.time} className="text-center">
              <div className="font-numeral text-sm uppercase tracking-[0.22em] text-ink/65">
                {item.time}
              </div>
              <h3 className="mt-2 font-serif-display text-xl uppercase tracking-[0.16em] text-ink">
                {item.title}
              </h3>
              {item.note && <p className="mt-1 text-sm italic text-ink/60">{item.note}</p>}
              {index < wedding.schedule.length - 1 && (
                <div
                  data-schedule-line
                  className="mx-auto my-9 h-14 w-px origin-top bg-burgundy/45"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
