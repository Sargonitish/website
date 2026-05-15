import { motion } from "framer-motion";
import { useState } from "react";
import { HiStar } from "react-icons/hi";

interface FlipCardProps {
  id: number;
  text: string;
  index: number;
}

export default function FlipCard({ id, text, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="perspective-1000 h-40 w-full cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <HiStar className="mb-2 text-3xl text-warm-coral" />
          <span className="font-display text-2xl font-bold text-gray-800">
            {id}
          </span>
          <span className="mt-1 text-sm text-gray-500">tap to reveal</span>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center rounded-2xl border border-white/30 bg-gradient-to-br from-warm-coral/20 to-sky-blue/20 p-6 shadow-lg shadow-warm-coral/10 backdrop-blur-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-center font-body text-base font-medium leading-relaxed text-gray-700">
            {text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
