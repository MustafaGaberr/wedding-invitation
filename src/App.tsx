import { AnimatePresence, motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Globe2, Instagram } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Countdown } from "@/components/Countdown";
import { HeroSection } from "@/components/HeroSection";
import { NoteSection } from "@/components/NoteSection";
import { OrderOfDay } from "@/components/OrderOfDay";
import { OurStoryTimeline } from "@/components/OurStoryTimeline";
import { RSVPForm } from "@/components/RSVPForm";
import { SectionDivider } from "@/components/SectionDivider";
import { VenueSection } from "@/components/VenueSection";
import { WelcomeSection } from "@/components/WelcomeSection";
import { wedding } from "@/data/wedding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const floatingHearts = [
  { left: 7, top: 92, size: 18, duration: 18, delay: 0, drift: 42 },
  { left: 18, top: 74, size: 12, duration: 22, delay: -6, drift: -28 },
  { left: 31, top: 101, size: 15, duration: 20, delay: -13, drift: 36 },
  { left: 44, top: 86, size: 10, duration: 24, delay: -9, drift: -22 },
  { left: 58, top: 96, size: 17, duration: 19, delay: -3, drift: 30 },
  { left: 72, top: 78, size: 13, duration: 23, delay: -16, drift: -38 },
  { left: 88, top: 104, size: 19, duration: 21, delay: -11, drift: 24 },
  { left: 13, top: 118, size: 14, duration: 26, delay: -20, drift: 32 },
  { left: 27, top: 109, size: 11, duration: 17, delay: -2, drift: -18 },
  { left: 39, top: 127, size: 20, duration: 25, delay: -15, drift: 40 },
  { left: 52, top: 113, size: 12, duration: 18, delay: -7, drift: -30 },
  { left: 66, top: 122, size: 16, duration: 22, delay: -18, drift: 20 },
  { left: 81, top: 116, size: 10, duration: 20, delay: -5, drift: -34 },
  { left: 94, top: 131, size: 15, duration: 27, delay: -23, drift: -26 },
  { left: 4, top: 138, size: 13, duration: 19, delay: -12, drift: 22 },
  { left: 23, top: 146, size: 18, duration: 24, delay: -4, drift: -40 },
  { left: 36, top: 154, size: 11, duration: 21, delay: -17, drift: 28 },
  { left: 49, top: 142, size: 14, duration: 23, delay: -8, drift: -24 },
  { left: 63, top: 151, size: 19, duration: 18, delay: -21, drift: 34 },
  { left: 77, top: 145, size: 12, duration: 26, delay: -10, drift: -16 },
  { left: 91, top: 158, size: 16, duration: 22, delay: -1, drift: 30 },
  { left: 10, top: 166, size: 10, duration: 20, delay: -14, drift: -20 },
  { left: 29, top: 173, size: 17, duration: 25, delay: -19, drift: 38 },
  { left: 47, top: 181, size: 13, duration: 19, delay: -6, drift: -32 },
  { left: 69, top: 176, size: 15, duration: 24, delay: -22, drift: 26 },
  { left: 86, top: 187, size: 11, duration: 21, delay: -9, drift: -36 },
] as const;

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
              <p className="mt-4 font-numeral text-sm tracking-[0.35em]">{wedding.displayDate}</p>
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
      </motion.div>

      <AnimatePresence>
        {!opening && (
          <motion.div
            key="cta"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute inset-x-0 top-[63%] z-10 flex -translate-y-1/2 flex-col items-center text-white"
          >
            <p className="text-[11px] font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
              Click to open
            </p>
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
      <div className="relative mx-auto max-w-[640px] overflow-hidden bg-ivory text-ink shadow-2xl">
        <FloatingHearts />
        <HeroSection />
        <Countdown />
        <DividerBand />
        <WelcomeSection />
        <OurStoryTimeline />
        <VenueSection />
        <DividerBand />
        <OrderOfDay />
        <DividerBand />
        <NoteSection />
        <DividerBand />
        <RSVPForm />
        <footer className="bg-ivory px-6 py-12 text-center text-[#5a2e27]">
          <img
            src="/line.png"
            alt=""
            className="mx-auto mb-8 h-auto w-56 max-w-full opacity-75"
            loading="lazy"
          />

          <DesignedByBadge />

          <div className="mt-7 flex items-center justify-center gap-9">
            <FooterIconLink href="https://wa.me/201097158707" label="Contact on WhatsApp">
              <WhatsAppIcon className="size-[25px]" />
            </FooterIconLink>
            <FooterIconLink href="https://instagram.com/mustafagaberr" label="Instagram">
              <Instagram aria-hidden="true" className="size-[21px]" strokeWidth={2.4} />
            </FooterIconLink>
            <FooterIconLink href="https://Gabourr.com" label="Gabour website">
              <Globe2 aria-hidden="true" className="size-[21px]" strokeWidth={2.4} />
            </FooterIconLink>
          </div>

          <p className="mt-6 font-serif-display text-[14px] font-semibold leading-none">
            © 2026 Gabour. all rights reserved
          </p>
        </footer>
      </div>
    </motion.main>
  );
}

function DividerBand() {
  return (
    <div className="relative bg-ivory px-6 py-2">
      <SectionDivider />
    </div>
  );
}

function FloatingHearts() {
  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-1/2 z-30 w-full max-w-[640px] -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      {floatingHearts.map((heart, index) => (
        <span
          key={index}
          className="floating-heart"
          style={
            {
              "--heart-left": `${heart.left}%`,
              "--heart-top": `${heart.top}vh`,
              "--heart-size": `${heart.size}px`,
              "--heart-duration": `${heart.duration}s`,
              "--heart-delay": `${heart.delay}s`,
              "--heart-drift": `${heart.drift}px`,
            } as CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function DesignedByBadge() {
  return (
    <a
      href="https://Gabourr.com"
      target="_blank"
      rel="noreferrer"
      className="relative mx-auto flex h-[31px] w-[286px] max-w-full items-center justify-center font-serif-display text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5a2e27] transition-opacity hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5a2e27]/45"
      aria-label="Designed by Gabour"
    >
      <FooterBadgeFrame className="absolute inset-0 h-full w-full" />
      <span className="relative z-10 translate-y-px">Designed by Gabour</span>
    </a>
  );
}

function FooterIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-7 items-center justify-center text-[#5a2e27] transition-transform hover:scale-110 hover:text-[#692219] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5a2e27]/45"
    >
      {children}
    </a>
  );
}

function FooterBadgeFrame({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 234 25"
      className={className}
      aria-hidden="true"
    >
      <g>
        <path
          d="M229.4,25H4.6C2.1,25,0,22.9,0,20.4V4.6C0,2.1,2.1,0,4.6,0h224.8c2.5,0,4.6,2.1,4.6,4.6v15.8 C234,22.9,231.9,25,229.4,25z M4.6,1C2.6,1,1,2.6,1,4.6v15.8c0,2,1.6,3.6,3.6,3.6h224.8c2,0,3.6-1.6,3.6-3.6V4.6 c0-2-1.6-3.6-3.6-3.6H4.6z"
          fill="currentColor"
        />
      </g>
      <g>
        <path
          d="M214.5,17.9c-0.3-0.3-0.5-0.7-0.5-1.1l0.1-8.6c0-0.9,0.7-1.6,1.6-1.6l8.6,0.1c0.9,0,1.6,0.7,1.6,1.6 l-0.1,8.6c0,0.4-0.2,0.8-0.5,1.1s-0.7,0.5-1.1,0.5l-8.6-0.1C215.2,18.4,214.8,18.2,214.5,17.9z M224.8,7.8 c-0.1-0.1-0.3-0.2-0.4-0.2l-8.6-0.1c-0.3,0-0.6,0.3-0.6,0.6l-0.1,8.6c0,0.3,0.3,0.6,0.6,0.6l8.6,0.1c0.2,0,0.3-0.1,0.4-0.2 c0.1-0.1,0.2-0.3,0.2-0.4l0.1-8.6C225,8.1,224.9,7.9,224.8,7.8z"
          fill="currentColor"
        />
      </g>
      <path d="M221 0H222V6.7H221z" fill="currentColor" />
      <path d="M221 17.7H222V25H221z" fill="currentColor" />
      <path d="M218 0H219V6.7H218z" fill="currentColor" />
      <path d="M218 17.7H219V25H218z" fill="currentColor" />
      <g>
        <path
          d="M8.5,17.9C8.2,17.6,8,17.2,8,16.7l0.1-8.6c0-0.9,0.7-1.6,1.6-1.6l8.6,0.1c0.9,0,1.6,0.7,1.6,1.6l-0.1,8.6 c0,0.4-0.2,0.8-0.5,1.1s-0.7,0.5-1.1,0.5l-8.6-0.1C9.2,18.4,8.8,18.2,8.5,17.9z M18.8,7.8c-0.1-0.1-0.3-0.2-0.4-0.2L9.7,7.5 c-0.3,0-0.6,0.3-0.6,0.6L9,16.8c0,0.3,0.3,0.6,0.6,0.6l8.6,0.1c0.2,0,0.3-0.1,0.4-0.2c0.1-0.1,0.2-0.3,0.2-0.4L19,8.2 C19,8.1,18.9,7.9,18.8,7.8z"
          fill="currentColor"
        />
      </g>
      <path d="M15 0H16V6.7H15z" fill="currentColor" />
      <path d="M15 17.7H16V25H15z" fill="currentColor" />
      <path d="M12 0H13V6.7H12z" fill="currentColor" />
      <path d="M12 17.7H13V25H12z" fill="currentColor" />
      <circle cx="14" cy="12.5" r="2.8" fill="currentColor" />
      <circle cx="220" cy="12.5" r="2.8" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.02 4a11.86 11.86 0 0 0-10.1 18.08L4.62 28l6.05-1.59A11.88 11.88 0 1 0 16.02 4Zm0 2.06a9.8 9.8 0 0 1 8.31 14.99 9.79 9.79 0 0 1-12.9 3.3l-.43-.25-3.6.95.96-3.51-.28-.45A9.8 9.8 0 0 1 16.02 6.06Zm-4.13 4.61c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.08 3.33 5.13 4.54 2.54 1 3.06.8 3.61.75.55-.05 1.78-.73 2.03-1.43.25-.7.25-1.31.17-1.43-.08-.13-.28-.2-.58-.35-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5-.89-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.47.13-.62.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58Z" />
    </svg>
  );
}
