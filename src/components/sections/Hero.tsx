import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useDataStore } from "../../data/store";
import { useTypewriter } from "../../hooks/useTypewriter";

const floatingShapes = [
  { emoji: "⭐", x: "10%", y: "20%", delay: 0, size: 24 },
  { emoji: "✨", x: "85%", y: "15%", delay: 0.5, size: 20 },
  { emoji: "🌟", x: "75%", y: "70%", delay: 1, size: 28 },
  { emoji: "🎈", x: "20%", y: "75%", delay: 1.5, size: 22 },
  { emoji: "🎉", x: "90%", y: "50%", delay: 0.8, size: 18 },
  { emoji: "💫", x: "50%", y: "10%", delay: 2, size: 16 },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

export default function Hero() {
  const { data } = useDataStore();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { displayText } = useTypewriter({
    text: data.config.herName,
    speed: 120,
    delay: 500,
  });

  const scrollToSurprise = () => {
    document.getElementById("surprise")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0" />

      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0, 20, 0],
            rotate: [0, 10, -10, 5, 0],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        >
          <span className="inline-block text-2xl drop-shadow-lg md:text-3xl">
            {shape.emoji}
          </span>
        </motion.div>
      ))}

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
      >
        <div className="text-center">
          <motion.p {...fadeUp(0.3)} className="font-script text-lg text-warm-coral drop-shadow-sm md:text-2xl">
            ✦ For the most amazing friend I know ✦
          </motion.p>

          <motion.h1
            {...fadeUp(0.6)}
            className="mt-6 font-display text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
          >
            <span className="gradient-text">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="ml-1 text-warm-coral"
            >
              |
            </motion.span>
          </motion.h1>

          <motion.div {...fadeUp(1)} className="mt-10">
            <div className="relative inline-block">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-warm-coral/20 via-sunshine/20 to-sky-blue/20 blur-2xl" />
              <p className="relative font-display text-2xl italic text-gray-600 md:text-4xl">
                {data.config.heroMessage}
              </p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(1.3)} className="mt-8 text-6xl md:text-7xl">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              🎂
            </motion.span>
          </motion.div>

          <motion.div {...fadeUp(1.6)} className="mt-14">
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={scrollToSurprise}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-warm-coral via-sunshine to-sky-blue p-[2px] shadow-2xl shadow-warm-coral/30 transition-all duration-300 hover:shadow-warm-coral/50"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-warm-coral via-sunshine to-sky-blue opacity-50 blur-xl"
              />
              <span className="relative flex items-center gap-3 rounded-full bg-white/90 px-10 py-4 text-lg font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/70 md:px-12 md:py-5 md:text-xl">
                Open Your Surprise
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  🎁
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400">
            Scroll
          </span>
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{ height: [0, 16, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-[1px] bg-gradient-to-b from-warm-coral to-sky-blue"
            />
            <div className="h-2 w-2 rotate-45 border-r-2 border-b-2 border-warm-coral/60" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
