import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/")({
  component: EnvelopePage,
});

function EnvelopePage() {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [flash, setFlash] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    // Preload hero image
    const img = new Image();
    img.src = wedding.hero.image;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const open = () => {
    if (opening) return;
    setOpening(true);
    const dur = reduced ? 400 : 1000;
    window.setTimeout(() => setFlash(true), reduced ? 100 : 500);
    window.setTimeout(() => navigate({ to: "/invitation" }), dur);
  };

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div
        className="absolute inset-0"
        animate={opening ? { scale: reduced ? 1 : 1.03 } : { scale: [1, 1.015, 1] }}
        transition={
          opening
            ? { duration: 1, ease: "easeInOut" }
            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {imgFailed ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-burgundy via-ink to-ink">
            <div className="text-center text-ivory/80">
              <p className="font-script text-6xl text-blush">
                {wedding.couple.first} &amp; {wedding.couple.second}
              </p>
              <p className="mt-4 font-serif-display text-sm tracking-[0.4em]">
                {wedding.displayDate}
              </p>
            </div>
          </div>
        ) : (
          <img
            src={wedding.envelope.image}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
        {/* vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(34,35,28,0.7)_100%)]" />
      </motion.div>

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="cta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute inset-x-0 bottom-16 z-10 flex flex-col items-center text-ivory"
          >
            <p lang="ar" dir="rtl" className="font-arabic text-xl tracking-wide text-ivory">
              اضغط لفتح الدعوة
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-ivory/70">Tap to open</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={open}
        disabled={opening}
        aria-label="Open the wedding invitation"
        className="absolute inset-0 z-20 h-full w-full cursor-pointer bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ivory/70"
      />

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.2 : 0.6 }}
            className="absolute inset-0 z-30 bg-paper"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
