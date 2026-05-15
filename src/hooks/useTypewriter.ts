import { useState, useEffect } from "react";

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export function useTypewriter({ text, speed = 80, delay = 1000, loop = false }: TypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    let isDeleting = false;

    const type = () => {
      if (!isDeleting) {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
          if (loop) {
            timeout = setTimeout(() => {
              isDeleting = true;
              timeout = setTimeout(type, speed);
            }, delay);
          }
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex--;
          timeout = setTimeout(type, speed / 2);
        } else {
          isDeleting = false;
          setIsComplete(false);
          timeout = setTimeout(type, delay);
        }
      }
    };

    timeout = setTimeout(type, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, loop]);

  return { displayText, isComplete };
}
