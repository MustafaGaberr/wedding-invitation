import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

gsap.registerPlugin(ScrollTrigger);

export function OurStoryTimeline() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pathHeight = 1120;
  const segmentHeight = pathHeight / wedding.story.length;
  const storyPath = wedding.story.reduce((path, _event, i) => {
    const startY = i * segmentHeight;
    const endY = (i + 1) * segmentHeight;
    const bendX = i % 2 === 0 ? 78 : 22;

    return `${path} C ${bendX} ${startY + segmentHeight * 0.28}, ${bendX} ${
      startY + segmentHeight * 0.72
    }, 50 ${endY}`;
  }, "M 50 0");

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const line = rootRef.current!.querySelector<SVGPathElement>("[data-timeline-line]");
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.fromTo(
          line,
          {
            strokeDasharray: length,
            strokeDashoffset: length,
          },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 74%",
              end: "bottom 42%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ivory px-5 pb-24 pt-8 text-ink" ref={rootRef} data-story-section>
      <div className="mx-auto max-w-xl text-center">
        {/* <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">Our Journey</p> */}
        <h2 className="mt-3 font-script text-6xl text-burgundy">Our Story</h2>
      </div>

      <div className="relative mx-auto mt-16 max-w-[560px]">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 z-0 h-full w-32 -translate-x-1/2 overflow-visible sm:w-44"
          viewBox={`0 0 100 ${pathHeight}`}
          preserveAspectRatio="none"
        >
          <path
            d={storyPath}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.4"
            className="text-burgundy/18"
            vectorEffect="non-scaling-stroke"
          />
          <path
            data-timeline-line
            d={storyPath}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.85"
            className="text-burgundy/70 drop-shadow-[0_0_8px_rgba(105,34,25,0.3)]"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ol className="relative z-10 flex flex-col items-center gap-14 sm:gap-[4.5rem]">
          {wedding.story.map((event, i) => (
            <li key={i} className="relative mx-auto w-full max-w-[330px] sm:max-w-[380px]">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy/75 bg-ivory shadow-[0_0_0_5px_rgba(105,34,25,0.08),0_0_16px_rgba(105,34,25,0.28)]"
              />
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-lg border border-paper/70 bg-paper/45 px-5 py-6 text-center shadow-[0_18px_42px_rgba(34,35,28,0.12),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.58),rgba(255,255,255,0.08)_42%,rgba(105,34,25,0.07))]"
                />
                <p className="relative text-[10px] uppercase tracking-[0.35em] text-burgundy/55">
                  {event.date}
                </p>
                <h3 className="relative mt-3 font-serif-display text-2xl text-burgundy">
                  {event.title}
                </h3>
                <p className="relative mx-auto mt-4 max-w-[28ch] text-center font-serif-display text-[15px] leading-relaxed text-ink/80">
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
