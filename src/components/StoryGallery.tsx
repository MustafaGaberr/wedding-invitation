import { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { wedding } from "@/data/wedding";

function Placeholder({ index }: { index: number }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-paper to-ivory text-ink/50">
      <Camera className="h-8 w-8" strokeWidth={1.2} />
      <p className="mt-3 font-serif-display text-sm tracking-[0.4em]">
        PHOTO {index.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

function Card({
  src,
  index,
  offset,
  onSwipe,
}: {
  src?: string;
  index: number;
  offset: number;
  onSwipe: () => void;
}) {
  const isFront = offset === 0;
  const [failed, setFailed] = useState(false);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500) {
      onSwipe();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 origin-bottom overflow-hidden rounded-md border border-ink/10 bg-paper shadow-xl"
      style={{ touchAction: isFront ? "pan-y" : "none" }}
      drag={isFront ? "x" : false}
      dragElastic={0.6}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      initial={{ scale: 1 - offset * 0.04, y: offset * 12, opacity: offset > 2 ? 0 : 1 }}
      animate={{
        scale: 1 - offset * 0.04,
        y: offset * 12,
        opacity: offset > 2 ? 0 : 1,
        rotate: 0,
      }}
      exit={{ x: 400, opacity: 0, rotate: 20, transition: { duration: 0.4 } }}
      whileDrag={{ rotate: 0 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
    >
      {!src || failed ? (
        <Placeholder index={index + 1} />
      ) : (
        <img
          src={src}
          alt={`Wedding memory ${index + 1}`}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
          loading="lazy"
        />
      )}
    </motion.div>
  );
}

export function StoryGallery() {
  const [index, setIndex] = useState(0);
  const cards = wedding.gallery.length
    ? wedding.gallery.map((src) => ({ src }))
    : Array.from({ length: 8 }, () => ({ src: undefined }));
  const next = () => setIndex((i) => (i + 1) % cards.length);
  const prev = () => setIndex((i) => (i - 1 + cards.length) % cards.length);

  const visible = [0, 1, 2].map((k) => {
    const i = (index + k) % cards.length;
    return { src: cards[i]?.src, i, offset: k };
  });

  return (
    <section className="bg-ivory px-6 pb-24 pt-4 text-ink">
      <div className="mx-auto max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-ink/50">Moments together</p>
        <h2 className="mt-3 font-script text-5xl text-burgundy">A little album</h2>
      </div>

      <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-sm select-none">
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((c) => (
              <Card key={c.i} src={c.src} index={c.i} offset={c.offset} onSwipe={next} />
            ))}
        </AnimatePresence>
      </div>

      <div className="mx-auto mt-6 flex max-w-sm items-center justify-between">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition hover:bg-ink hover:text-ivory"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-[10px] uppercase tracking-[0.35em] text-ink/50">Drag to explore</p>
        <button
          onClick={next}
          aria-label="Next photo"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 text-ink transition hover:bg-ink hover:text-ivory"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
