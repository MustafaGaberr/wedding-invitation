import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroSection } from "@/components/HeroSection";
import { RomanticQuote } from "@/components/RomanticQuote";
import { Countdown } from "@/components/Countdown";
import { WelcomeSection } from "@/components/WelcomeSection";
import { OurStoryTimeline } from "@/components/OurStoryTimeline";
import { StoryGallery } from "@/components/StoryGallery";
import { VenueSection } from "@/components/VenueSection";
import { OrderOfDay } from "@/components/OrderOfDay";
import { NoteSection } from "@/components/NoteSection";
import { RSVPForm } from "@/components/RSVPForm";
import { MusicToggle } from "@/components/MusicToggle";
import { wedding } from "@/data/wedding";

export const Route = createFileRoute("/invitation")({
  component: InvitationPage,
});

function InvitationPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "";
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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