import { useEffect, useRef, useCallback } from "react";

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  createdAt: number;
}

const emojis = ["⭐", "✨", "🌟", "💫", "🎉"];

export default function FloatingHearts() {
  const heartsRef = useRef<Heart[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number>(0);

  const createHeart = useCallback((x: number, y: number) => {
    heartsRef.current.push({
      id: idRef.current++,
      x,
      y,
      size: Math.random() * 16 + 12,
      opacity: 1,
      rotation: Math.random() * 60 - 30,
      createdAt: Date.now(),
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.08) return;
      createHeart(e.clientX, e.clientY);

      if (heartsRef.current.length > 30) {
        heartsRef.current = heartsRef.current.slice(-30);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [createHeart]);

  useEffect(() => {
    const container = document.createElement("div");
    container.className = "pointer-events-none fixed inset-0 z-50 overflow-hidden";
    container.id = "hearts-container";
    document.body.appendChild(container);

    const render = () => {
      const now = Date.now();
      heartsRef.current = heartsRef.current.filter((h) => now - h.createdAt < 3000);

      container.innerHTML = heartsRef.current
        .map((h) => {
          const elapsed = (now - h.createdAt) / 3000;
          const yOffset = elapsed * -200;
          const xOffset = Math.sin(elapsed * Math.PI * 2) * 30;
          const opacity = 1 - elapsed;
          const emoji = emojis[h.id % emojis.length];
          return `<span style="
            position: fixed;
            left: ${h.x + xOffset}px;
            top: ${h.y + yOffset}px;
            font-size: ${h.size}px;
            opacity: ${opacity};
            transform: rotate(${h.rotation}deg);
            transition: all 0.1s;
            pointer-events: none;
            z-index: 9999;
          ">${emoji}</span>`;
        })
        .join("");

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.remove();
    };
  }, []);

  return null;
}
