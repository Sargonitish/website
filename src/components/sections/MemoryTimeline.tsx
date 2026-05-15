import { motion } from "framer-motion";
import { useDataStore } from "../../data/store";

const fadeSlide = (index: number, isLeft: boolean) => ({
  initial: { opacity: 0, x: isLeft ? -60 : 60, scale: 0.95 },
  whileInView: { opacity: 1, x: 0, scale: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: index * 0.15 },
});

export default function MemoryTimeline() {
  const { data } = useDataStore();

  return (
    <section id="timeline" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">Our Friendship Story</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            Every memory with you is a treasure
          </p>
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute left-4 top-0 h-full w-[2px] bg-gradient-to-b from-warm-coral via-sky-blue via-sunshine to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="relative flex flex-col gap-16">
            {data.memories.map((memory, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={memory.id}
                  {...fadeSlide(i, isLeft)}
                  className={`relative flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`pl-12 md:w-1/2 md:pl-0 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <div className="group relative">
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-warm-coral/5 to-sky-blue/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="relative rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl transition-all duration-500 hover:shadow-xl hover:shadow-warm-coral/20">
                        <span className="font-script text-lg text-warm-coral">
                          {memory.date}
                        </span>
                        <h3 className="mt-1 font-display text-xl font-semibold text-gray-800">
                          {memory.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">
                          {memory.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-4 top-0 flex -translate-x-1/2 items-center justify-center md:relative md:left-auto md:w-0">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-warm-coral to-sky-blue shadow-lg shadow-warm-coral/30 ring-4 ring-white/50">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
