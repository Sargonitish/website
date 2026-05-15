import { motion } from "framer-motion";
import { useDataStore } from "../../data/store";
import { useTilt } from "../../hooks/useTilt";

function BucketCard({ title, icon, description, index }: { title: string; icon: string; description: string; index: number }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({ scale: 1.02, maxTilt: 10 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -1 : 1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative cursor-pointer rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl transition-all duration-200 hover:shadow-xl hover:shadow-warm-coral/20 md:p-8"
      >
        <div className="glare pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300" />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          <span className="text-4xl md:text-5xl">{icon}</span>
          <h3 className="mt-4 font-display text-xl font-semibold text-gray-800 md:text-2xl">
            {title}
          </h3>
          <p className="mt-3 font-body text-sm leading-relaxed text-gray-600 md:text-base">
            {description}
          </p>
        </div>

        <div className="absolute bottom-4 right-4 text-2xl opacity-20 transition-all duration-500 group-hover:opacity-40 group-hover:scale-110">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export default function BucketList() {
  const { data } = useDataStore();

  return (
    <section id="bucketlist" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">Our Future Adventures</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            So many more memories waiting to be made 🌟
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {data.bucketList.map((item, i) => (
            <BucketCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              description={item.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
