import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { wedding } from "@/data/wedding";

gsap.registerPlugin(ScrollTrigger);

export function OurStoryTimeline() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
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
              trigger: timelineRef.current,
              start: "top 140%",
              end: "bottom 140%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="bg-ivory px-5 pb-24 pt-8 text-ink" ref={rootRef} data-story-section>
      <div className="mx-auto max-w-xl text-center">
        {/* <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">Our Journey</p> */}
        <h2 className="mt-3 font-script text-6xl text-burgundy">Our Story</h2>
      </div>

      <div className="relative isolate mx-auto mt-16 max-w-[560px]" ref={timelineRef}>
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
        <ol className="relative z-20 flex flex-col items-center gap-14 sm:gap-[4.5rem]">
          {wedding.story.map((event, i) => (
            <li key={i} className="relative mx-auto w-full max-w-[360px] sm:max-w-[430px]">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-burgundy/75 bg-ivory shadow-[0_0_0_5px_rgba(105,34,25,0.08),0_0_16px_rgba(105,34,25,0.28)]"
              />
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative isolate overflow-hidden rounded-lg border border-white/60 bg-white/40 px-5 pb-5 pt-6 text-center shadow-[0_20px_48px_rgba(34,35,28,0.14),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-2xl"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,255,255,0.08)_42%,rgba(105,34,25,0.08))]"
                />
                <p className="relative z-10 text-[10px] uppercase tracking-[0.35em] text-burgundy/60">
                  {event.date}
                </p>
                <h3 className="relative z-10 mt-3 font-serif-display text-2xl text-burgundy">
                  {event.title}
                </h3>
                <p className="relative z-10 mx-auto mt-4 max-w-[28ch] text-center font-serif-display text-[15px] leading-relaxed text-ink/82">
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
                <div className="relative z-10 mt-6 rounded-md border border-white/50 bg-white/26 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.62),0_14px_30px_rgba(34,35,28,0.1)] backdrop-blur-xl">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-10 -top-px h-px bg-burgundy/25"
                  />
                  <div
                    className={
                      event.images.length > 1
                        ? "relative grid grid-cols-2 gap-2"
                        : "relative mx-auto w-full max-w-[295px]"
                    }
                  >
                    {event.images.map((image, imageIndex) => (
                      <button
                        key={image}
                        type="button"
                        className="group overflow-hidden rounded-md border border-white/75 bg-paper shadow-[0_10px_24px_rgba(34,35,28,0.14)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(34,35,28,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/45"
                        onClick={() =>
                          setSelectedImage({
                            src: image,
                            alt: `${event.title} memory ${imageIndex + 1}`,
                          })
                        }
                      >
                        <img
                          src={image}
                          alt={`${event.title} memory ${imageIndex + 1}`}
                          className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/82 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-h-full w-full max-w-[560px]"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close image"
                className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-ivory/92 text-burgundy shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition hover:bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
                onClick={() => setSelectedImage(null)}
              >
                <X className="size-5" strokeWidth={2.2} />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="mx-auto max-h-[84svh] w-auto max-w-full rounded-md border border-ivory/30 object-contain shadow-[0_28px_70px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
