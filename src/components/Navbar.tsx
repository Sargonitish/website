import { motion, useScroll, useTransform } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "letter", label: "Letter" },
  { id: "timeline", label: "Story" },
  { id: "gallery", label: "Photos" },
  { id: "reasons", label: "Reasons" },
  { id: "bucketlist", label: "Future" },
  { id: "countdown", label: "Countdown" },
  { id: "surprise", label: "Surprise" },
];

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const visible = useTransform(scrollYProgress, [0, 0.02, 0.95, 1], [0, 1, 1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        style={{ opacity: bgOpacity }}
        className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-white/20 bg-white/60 backdrop-blur-2xl"
      />

      <motion.nav
        style={{ opacity: visible }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-16 px-4"
      >
        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="relative cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-warm-coral"
            >
              {s.label}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-warm-coral/5 to-sky-blue/5 opacity-0 transition-opacity hover:opacity-100" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="h-1.5 w-1.5 cursor-pointer rounded-full bg-gray-300 transition-colors hover:bg-warm-coral"
              aria-label={s.label}
            />
          ))}
        </div>
      </motion.nav>

      <motion.div className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-gray-200/50">
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
          className="h-full w-full bg-gradient-to-r from-warm-coral via-sunshine to-sky-blue"
        />
      </motion.div>
    </>
  );
}
