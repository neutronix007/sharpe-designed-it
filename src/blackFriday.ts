import { useEffect, useState } from "react";

// Black Friday deal: same GH₵1,200 price, plus bonuses, for anyone who books from 17 to 30 November 2026.
// Ghana is on GMT all year, so these times are Accra time. After the end time the pages go back to normal
// on their own; nothing needs switching off.
export const BF_START = Date.UTC(2026, 10, 17, 0, 0, 0); // 17 Nov 2026, 00:00
export const BF_END = Date.UTC(2026, 11, 1, 0, 0, 0); // end of 30 Nov 2026

export const BF_BONUSES = ["1 extra page, free", "Logo touch-up, free", "2 rounds of changes instead of 1"];

export const isBlackFriday = (now = Date.now()) => now >= BF_START && now < BF_END;

// Live countdown to the end of the deal ("12d 04h 31m"); null once it's over
export function useBlackFridayCountdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!isBlackFriday(now)) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [now]);
  if (!isBlackFriday(now)) return null;
  const mins = Math.floor((BF_END - now) / 60_000);
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  return { d, h, m, label: d > 0 ? `${d}d ${String(h).padStart(2, "0")}h` : `${h}h ${String(m).padStart(2, "0")}m` };
}

// Full project videos come in two sizes: 1280 wide for computers, 854 wide (/sm/...) for phones and tablets
export const videoFor = (src: string) =>
  typeof window !== "undefined" && window.innerWidth < 900 ? `/sm${src}` : src;
