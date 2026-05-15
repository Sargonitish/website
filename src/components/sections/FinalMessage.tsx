import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  duration: number;
  delay: number;
}

const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  delay: Math.random() * 4,
  duration: Math.random() * 3 + 2,
}));

export default function FinalMessage() {
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newStar: ShootingStar = {
        id: Date.now(),
        x: Math.random() * 60,
        y: Math.random() * 40,
        angle: 25 + Math.random() * 10,
        duration: 1 + Math.random() * 0.5,
        delay: 0,
      };
      setShootingStars((prev) => [...prev.slice(-3), newStar]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-sunshine"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: 300,
            y: 300 * Math.tan((star.angle * Math.PI) / 180),
            opacity: [1, 1, 0],
          }}
          transition={{ duration: star.duration, ease: "easeOut" }}
        >
          <div
            className="h-[2px] w-20"
            style={{
              background: "linear-gradient(to left, transparent, #fbbf24, #fb7185)",
              transform: `rotate(${star.angle}deg)`,
              transformOrigin: "right center",
            }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 8, -8, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl md:text-9xl"
          >
            🌟
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <h2 className="font-display text-4xl font-bold text-gray-800 md:text-6xl lg:text-7xl">
              Thank You
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="mt-2 font-display text-4xl font-bold md:text-6xl lg:text-7xl">
              <span className="gradient-text">For Being You</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8"
          >
            <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-warm-coral/50 to-transparent" />
            <p className="mt-6 font-script text-xl text-gray-500 md:text-2xl">
              Best friends like you make life an amazing adventure
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-20"
          >
            <motion.p
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center gap-2 text-sm text-gray-400"
            >
              <span className="inline-block h-px w-8 bg-gray-300" />
              Made with love and gratitude
              <span className="inline-block h-px w-8 bg-gray-300" />
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
