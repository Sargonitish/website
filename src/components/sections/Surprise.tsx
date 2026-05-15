import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";
import { burstConfetti, fireworkBurst } from "../../utils/confetti";

type Stage = "envelope" | "opening" | "confetti" | "message";

export default function Surprise() {
  const [stage, setStage] = useState<Stage>("envelope");

  const handleOpen = useCallback(() => {
    setStage("opening");
    setTimeout(() => {
      setStage("confetti");
      burstConfetti();
      setTimeout(() => fireworkBurst(), 400);
      setTimeout(() => fireworkBurst(), 1000);
      setTimeout(() => setStage("message"), 1500);
    }, 600);
  }, []);

  return (
    <section id="surprise" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">A Little Surprise</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            Something special just for you 🎁
          </p>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <AnimatePresence mode="wait">
            {stage === "envelope" && (
              <motion.div
                key="envelope"
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{
                  opacity: 0,
                  scale: 1.2,
                  rotate: 10,
                  y: -100,
                  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={handleOpen}
                  className="group relative cursor-pointer"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 30px rgba(251,114,133,0.2), 0 0 60px rgba(56,189,248,0.1)",
                        "0 0 50px rgba(251,114,133,0.4), 0 0 90px rgba(56,189,248,0.2)",
                        "0 0 30px rgba(251,114,133,0.2), 0 0 60px rgba(56,189,248,0.1)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative mx-auto h-72 w-52 overflow-hidden rounded-2xl bg-gradient-to-br from-warm-coral to-sky-blue p-1 shadow-2xl transition-all duration-300 md:h-80 md:w-60"
                  >
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex h-full w-full items-center justify-center rounded-xl bg-white/95"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <HiStar className="mx-auto text-5xl text-warm-coral md:text-6xl" />
                        </motion.div>
                        <p className="mt-5 font-display text-xl font-bold text-gray-700 md:text-2xl">
                          Open Me 🎁
                        </p>
                        <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-warm-coral/50 to-sky-blue/50" />
                        <p className="mt-3 text-xs text-gray-400">
                          Click to reveal your surprise
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>

                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-warm-coral/10 via-sunshine/10 to-sky-blue/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                </motion.button>
              </motion.div>
            )}

            {stage === "opening" && (
              <motion.div
                key="opening"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-warm-coral/30 border-t-warm-coral"
                >
                  <HiStar className="text-2xl text-warm-coral" />
                </motion.div>
              </motion.div>
            )}

            {(stage === "confetti" || stage === "message") && (
              <motion.div
                key="message"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-2xl"
              >
                <AnimatePresence>
                  {stage === "message" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="group relative"
                    >
                      <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-warm-coral/10 via-sunshine/5 to-sky-blue/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />

                      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/25 p-8 shadow-2xl shadow-warm-coral/20 backdrop-blur-2xl transition-all duration-500 hover:shadow-warm-coral/30 md:p-14">
                        <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-warm-coral/10 to-sunshine/5 blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-tr from-sky-blue/10 to-warm-coral/5 blur-3xl" />

                        <div className="relative z-10 text-center">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="text-6xl md:text-7xl"
                          >
                            🎉
                          </motion.div>

                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-6 font-display text-3xl font-bold text-gray-800 md:text-4xl"
                          >
                            <span className="gradient-text">You're the Bestie Ever</span>
                          </motion.h3>

                          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-warm-coral/50 via-sunshine/50 to-sky-blue/50" />

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-6 font-body text-lg leading-relaxed text-gray-600 md:text-xl md:leading-8"
                          >
                            From the laughs to the deep talks, from the chaos to the calm —
                            you make life better just by being in it. Thank you for being
                            the most incredible friend anyone could ask for.
                          </motion.p>

                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="mt-8 font-script text-2xl text-warm-coral md:text-3xl"
                          >
                            Happy Birthday, Bestie! 🎂✨
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.2 }}
                            className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400"
                          >
                            <span className="inline-block h-px w-8 bg-gray-300" />
                            made with love
                            <span className="inline-block h-px w-8 bg-gray-300" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
