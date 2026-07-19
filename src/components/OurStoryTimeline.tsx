import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

gsap.registerPlugin(ScrollTrigger);

export function OurStoryTimeline() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const line = rootRef.current!.querySelector<HTMLElement>("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      }
      rootRef.current!.querySelectorAll<HTMLElement>("[data-arrow]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ivory px-6 py-24 text-ink" ref={rootRef}>
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">Our Journey</p>
        <h2 className="mt-3 font-script text-6xl text-burgundy">Our Story</h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-xl">
        {/* central line */}
        <div
          data-timeline-line
          className="absolute left-5 top-0 h-full w-px origin-top bg-burgundy/50"
        />
        <ol className="space-y-14">
          {wedding.story.map((event, i) => (
            <li key={i} className="relative pl-14">
              <span className="absolute left-[10px] top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-burgundy ring-4 ring-ivory" />
              {i < wedding.story.length - 1 && (
                <span
                  data-arrow
                  className="absolute left-5 top-8 h-16 w-px origin-top bg-burgundy/30"
                />
              )}
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="rounded-md border border-ink/10 bg-paper p-5 shadow-sm"
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-ink/50">{event.date}</p>
                <h3 className="mt-2 font-serif-display text-2xl text-burgundy">{event.title}</h3>
                <p className="mt-3 font-serif-display text-[15px] leading-relaxed text-ink/85">
                  {event.textParts.map((part, idx) =>
                    part.type === "ar" ? (
                      <span key={idx} lang="ar" dir="rtl" className="font-arabic">
                        {part.value}
                      </span>
                    ) : (
                      <span key={idx}>{part.value}</span>
                    ),
                  )}
                </p>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
