import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
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
      if (playing) {
        a.pause();
        setPlaying(false);
      } else {
        await a.play();
        setPlaying(true);
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
      whileHover={{ scale: 1.05 }}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink/70 text-ivory shadow-lg backdrop-blur-sm ring-1 ring-ivory/20"
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
    </motion.button>
  );
}
