import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Countdown } from "@/components/Countdown";
import { HeroSection } from "@/components/HeroSection";
import { MusicToggle } from "@/components/MusicToggle";
import { NoteSection } from "@/components/NoteSection";
import { OrderOfDay } from "@/components/OrderOfDay";
import { OurStoryTimeline } from "@/components/OurStoryTimeline";
import { RomanticQuote } from "@/components/RomanticQuote";
import { RSVPForm } from "@/components/RSVPForm";
import { StoryGallery } from "@/components/StoryGallery";
import { VenueSection } from "@/components/VenueSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function getRoute() {
  return window.location.pathname === "/invitation" ? "/invitation" : "/";
}

export function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(getRoute());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: "/" | "/invitation") => {
    window.history.pushState({}, "", to);
    setRoute(to);
  };

  return route === "/invitation" ? (
    <InvitationPage />
  ) : (
    <EnvelopePage onOpen={() => navigate("/invitation")} />
  );
}

function EnvelopePage({ onOpen }: { onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [flash, setFlash] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
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
    const duration = reduced ? 400 : 1000;
    window.setTimeout(() => setFlash(true), reduced ? 100 : 500);
    window.setTimeout(onOpen, duration);
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

function InvitationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "";
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-ink text-ivory"
    >
      <div className="mx-auto max-w-[640px] bg-ivory text-ink shadow-2xl">
        <HeroSection />
        <RomanticQuote />
        <Countdown />
        <WelcomeSection />
        <OurStoryTimeline />
        <StoryGallery />
        <VenueSection />
        <OrderOfDay />
        <NoteSection />
        <RSVPForm />
        <footer className="bg-ink px-6 py-12 text-center text-ivory">
          <p className="font-script text-3xl text-blush">
            {wedding.couple.first} &amp; {wedding.couple.second}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-ivory/60">
            {wedding.displayDate}
          </p>
        </footer>
      </div>
      <MusicToggle src={wedding.music} />
    </motion.main>
  );
}
