import { useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<Position>({ x: -100, y: -100 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return position;
}
