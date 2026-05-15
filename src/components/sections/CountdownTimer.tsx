import { motion } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";
import { useDataStore } from "../../data/store";

const units = [
  { label: "Days", key: "days" as const },
  { label: "Hours", key: "hours" as const },
  { label: "Minutes", key: "minutes" as const },
  { label: "Seconds", key: "seconds" as const },
];

export default function CountdownTimer() {
  const { data } = useDataStore();
  const { month, day, year } = data.config.birthday;
  const targetDate = new Date(year, month - 1, day);
  const timeLeft = useCountdown(targetDate);

  return (
    <section id="countdown" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">Counting Down to Your Day</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            The world's about to get a year brighter 🎉
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {units.map((unit, i) => (
            <motion.div
              key={unit.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-warm-coral/10 to-sky-blue/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex flex-col items-center rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-2xl transition-all duration-500 group-hover:shadow-xl group-hover:shadow-warm-coral/20 md:p-8">
                <motion.span
                  key={timeLeft[unit.key]}
                  initial={{ y: -15, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  className="font-display text-5xl font-bold text-gray-800 md:text-7xl tabular-nums"
                >
                  {String(timeLeft[unit.key]).padStart(2, "0")}
                </motion.span>
                <span className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-gray-500">
                  {unit.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
