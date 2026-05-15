import { useRef, useCallback } from "react";

interface TiltOptions {
  scale?: number;
  maxTilt?: number;
  speed?: number;
  glare?: boolean;
}

export function useTilt<T extends HTMLElement>(options: TiltOptions = {}) {
  const { scale = 1.02, maxTilt = 15, glare = true } = options;
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * -maxTilt;

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare) {
        const glareEl = el.querySelector(".glare") as HTMLElement | null;
        if (glareEl) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 60%)`;
          glareEl.style.opacity = "1";
        }
      }
    },
    [scale, maxTilt, glare]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;

    if (glare) {
      const glareEl = el.querySelector(".glare") as HTMLElement | null;
      if (glareEl) {
        glareEl.style.opacity = "0";
      }
    }
  }, [glare]);

  return { ref, handleMouseMove, handleMouseLeave } as const;
}
