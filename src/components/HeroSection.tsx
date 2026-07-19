import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding } from "@/data/wedding";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink text-ivory">
      <img
        src={wedding.hero.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 30%" }}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/55 to-ink/90" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
        style={{ textShadow: "0 2px 24px rgba(0, 0, 0, 0.65)" }}
      >
        <p className="mb-6 text-xs uppercase tracking-[0.4em] text-ivory/80">
          Together with their families
        </p>
        <h1 className="font-script text-7xl leading-none text-ivory sm:text-8xl">
          {wedding.couple.first}
        </h1>
        <span className="my-2 font-serif-display text-3xl italic text-blush">&amp;</span>
        <h1 className="font-script text-7xl leading-none text-ivory sm:text-8xl">
          {wedding.couple.second}
        </h1>
        <div className="mt-10 flex items-center gap-4 text-ivory/90">
          <span className="h-px w-10 bg-ivory/50" />
          <div className="text-center">
            <p className="font-serif-display text-lg tracking-widest">{wedding.displayDate}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-ivory/70">
              {wedding.displayTime}
            </p>
          </div>
          <span className="h-px w-10 bg-ivory/50" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 z-10 flex flex-col items-center text-ivory/80"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll down</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="mt-2 h-5 w-5" strokeWidth={1.2} />
        </motion.div>
      </motion.div>
    </section>
  );
}
