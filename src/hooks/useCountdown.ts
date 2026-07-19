import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function compute(target: number): Countdown {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: false,
  };
}

export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime();
  const [state, setState] = useState<Countdown>(() => compute(target));
  useEffect(() => {
    setState(compute(target));
    const id = window.setInterval(() => setState(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return state;
}
