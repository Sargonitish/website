import { motion } from "framer-motion";
import { useDataStore } from "../../data/store";

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay },
});

export default function LoveLetter() {
  const { data } = useDataStore();
  const { loveLetter } = data;

  return (
    <section id="letter" className="relative px-4 py-24 md:py-40">
      <div className="relative mx-auto max-w-3xl">
        <motion.div {...fadeIn(0)}>
          <h2 className="text-center font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">A Letter for You</span>
          </h2>
          <p className="mt-2 text-center font-body text-base text-gray-500 md:text-lg">
            Some words straight from the heart
          </p>
        </motion.div>

        <div className="group relative mt-16">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-warm-coral/10 via-sunshine/5 to-sky-blue/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative rounded-3xl border border-white/40 bg-white/25 p-8 shadow-2xl shadow-warm-coral/10 backdrop-blur-2xl transition-all duration-500 hover:shadow-warm-coral/20 md:p-12">
            <motion.p {...fadeIn(0.2)} className="font-script text-2xl text-warm-coral md:text-3xl">
              {loveLetter.greeting}
            </motion.p>

            <div className="mt-2 h-px w-full bg-gradient-to-r from-warm-coral/30 via-sunshine/30 to-transparent" />

            <div className="mt-8 space-y-6">
              {loveLetter.paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  {...fadeIn(0.4 + i * 0.3)}
                  className="font-body text-base leading-relaxed text-gray-700 md:text-lg md:leading-8"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div {...fadeIn(1.2)} className="mt-10 flex flex-col items-end">
              <div className="h-px w-32 bg-gradient-to-l from-warm-coral/50 via-sunshine/30 to-transparent" />
              <p className="mt-4 font-script text-xl text-sky-blue md:text-2xl">
                {loveLetter.closing}
              </p>
              <p className="mt-1 font-script text-xl text-warm-coral md:text-2xl">
                {loveLetter.signature}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
