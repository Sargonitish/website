import { motion } from "framer-motion";

interface TimelineItemProps {
  date: string;
  title: string;
  caption: string;
  index: number;
}

export default function TimelineItem({ date, title, caption, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`relative flex w-full flex-col items-center md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
        <div className="rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-warm-coral/20">
          <span className="mb-1 inline-block font-script text-lg text-warm-coral">
            {date}
          </span>
          <h3 className="font-display text-xl font-semibold text-gray-800">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {caption}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-warm-coral to-sky-blue shadow-lg shadow-warm-coral/30">
          <div className="h-2 w-2 rounded-full bg-white" />
        </div>
      </div>

      <div className="hidden w-1/2 md:block" />
    </motion.div>
  );
}
