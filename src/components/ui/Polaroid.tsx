import { motion } from "framer-motion";

interface PolaroidProps {
  src: string;
  alt: string;
  index: number;
  onClick?: () => void;
}

const rotations = [-3, 2, -1, 3, -2, 1, -3, 2];

export default function Polaroid({ src, alt, index, onClick }: PolaroidProps) {
  const rotate = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)",
      }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-lg bg-white p-2 shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  );
}
