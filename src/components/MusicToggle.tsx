import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause } from "lucide-react";

type MusicState = "idle" | "playing" | "paused";

export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicState, setMusicState] = useState<MusicState>("idle");
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!src) {
      setAvailable(false);
      return;
    }
    const a = new Audio(src);
    a.loop = true;
    a.volume = 0.5;
    a.addEventListener("error", () => setAvailable(false));
    a.addEventListener("pause", () =>
      setMusicState((state) => (state === "playing" ? "paused" : state)),
    );
    a.addEventListener("play", () => setMusicState("playing"));
    audioRef.current = a;
    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, [src]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    try {
      if (musicState === "playing") {
        a.pause();
      } else {
        await a.play();
      }
    } catch {
      setAvailable(false);
    }
  };

  if (!src || !available) return null;

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.04 }}
      aria-label={musicState === "playing" ? "Pause music" : "Play music"}
      aria-pressed={musicState === "playing"}
      className="absolute left-1/2 top-8 z-20 flex h-20 w-36 -translate-x-1/2 items-center justify-center rounded-full text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
    >
      <svg
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-14 w-32 -translate-x-1/2 overflow-visible"
        viewBox="0 0 140 60"
      >
        <defs>
          <path id="music-label-arc" d="M 18 42 Q 70 2 122 42" />
        </defs>
        <text className="fill-white font-serif-display text-[12px] font-medium uppercase tracking-[0.3em]">
          <textPath href="#music-label-arc" startOffset="50%" textAnchor="middle">
            PLAY MUSIC
          </textPath>
        </text>
      </svg>
      {musicState === "playing" ? (
        <Pause className="mt-6 h-6 w-6 fill-white text-white" strokeWidth={2.4} />
      ) : (
        <motion.svg
          data-icon="note"
          className="mt-6 h-6 w-6"
          viewBox="0 0 58.08 58.55"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M57.17.64c-.58-.5-1.34-.73-2.1-.62L18.15,5.3c-1.3.19-2.26,1.3-2.26,2.61v30.91c-1.56-.91-3.37-1.43-5.31-1.43-5.83,0-10.58,4.75-10.58,10.58s4.75,10.58,10.58,10.58,10.58-4.75,10.58-10.58v-27.23l31.64-4.52v17.33c-1.56-.91-3.37-1.43-5.31-1.43-5.83,0-10.58,4.75-10.58,10.58s4.75,10.58,10.58,10.58,10.58-4.75,10.58-10.58V2.64c0-.76-.33-1.49-.91-1.99Z"
            fill="#fff"
          />
        </motion.svg>
      )}
    </motion.button>
  );
}
