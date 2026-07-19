import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding } from "@/data/wedding";
import { MusicToggle } from "@/components/MusicToggle";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-ink px-5 py-24 text-ivory">
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
      <MusicToggle src={wedding.music} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex w-full max-w-[36rem] flex-col items-center text-center"
        style={{ textShadow: "0 2px 24px rgba(0, 0, 0, 0.65)" }}
      >
        {/* <p className="mb-6 text-xs uppercase tracking-[0.4em] text-ivory/80">
          Together with their families
        </p> */}
        <h1 className="font-script text-[5rem] leading-[0.9] text-ivory sm:text-8xl">
          {wedding.couple.first}
        </h1>
        <span className="my-1.5 font-serif-display text-3xl italic leading-none text-blush">
          &amp;
        </span>
        <h1 className="font-script text-[5rem] leading-[0.9] text-ivory sm:text-8xl">
          {wedding.couple.second}
        </h1>
        <div
          lang="ar"
          dir="rtl"
          className="mt-8 flex max-w-[22rem] flex-col items-center gap-1.5 text-center font-thulth text-[22px] leading-[1.18] text-ivory/95 sm:max-w-sm sm:text-2xl"
        >
          {wedding.heroQuoteAr.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p
            lang="en"
            dir="ltr"
            className="mt-3 font-serif-display text-[13px] font-semibold uppercase tracking-[0.24em] text-ivory"
          >
            {wedding.quoteClosing}
          </p>
        </div>
        <div className="mt-8 flex items-center gap-4 text-ivory/90">
          <img
            src="/line.png"
            alt=""
            className="h-auto w-16 shrink-0 scale-x-[-1] brightness-0 invert opacity-55"
            aria-hidden="true"
          />
          <div className="text-center">
            <p className="font-numeral text-base font-bold tracking-[0.16em]">
              {wedding.displayDate}
            </p>
            <p className="mt-2 font-numeral text-[10px] uppercase tracking-[0.32em] text-ivory/70">
              {wedding.displayTime}
            </p>
          </div>
          <img
            src="/line.png"
            alt=""
            className="h-auto w-16 shrink-0 brightness-0 invert opacity-55"
            aria-hidden="true"
          />
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
