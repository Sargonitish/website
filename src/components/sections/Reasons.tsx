import { motion } from "framer-motion";
import { useDataStore } from "../../data/store";
import { useTilt } from "../../hooks/useTilt";

function ReasonCard({ id, text, index }: { id: number; text: string; index: number }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({ scale: 1.03, maxTilt: 12 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
      className="perspective-1000"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative cursor-pointer rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl transition-all duration-200 hover:shadow-xl hover:shadow-warm-coral/20"
      >
        <div className="glare pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-warm-coral to-sky-blue text-sm font-bold text-white shadow-lg">
            {id}
          </div>
          <p className="pt-1 font-body text-base leading-relaxed text-gray-700">
            {text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reasons() {
  const { data } = useDataStore();

  return (
    <section id="reasons" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">10 Reasons You're the Best</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            Hover over each card ✨
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {data.reasons.map((reason, i) => (
            <ReasonCard key={reason.id} id={reason.id} text={reason.text} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
