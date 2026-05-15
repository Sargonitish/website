import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDataStore } from "../../data/store";
import { HiX, HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function PhotoGallery() {
  const { data } = useDataStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedIndex = data.photos.findIndex((p) => p.id === selectedId);

  const goNext = () => {
    const next = (selectedIndex + 1) % data.photos.length;
    setSelectedId(data.photos[next].id);
  };

  const goPrev = () => {
    const prev = (selectedIndex - 1 + data.photos.length) % data.photos.length;
    setSelectedId(data.photos[prev].id);
  };

  return (
    <section id="gallery" className="relative px-4 py-24 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gray-800 md:text-5xl">
            <span className="gradient-text">Our Best Moments</span>
          </h2>
          <p className="mt-2 font-body text-base text-gray-500 md:text-lg">
            Snapshots of our favorite times together
          </p>
        </motion.div>

        <div className="mt-16">
          <div className="columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
            {data.photos.map((photo, i) => {
              const rotations = [-2, 1, -1, 2, -3, 0, 2, -1];
              return (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 30, rotate: rotations[i % rotations.length] }}
                  whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                  className="mb-4 break-inside-avoid cursor-pointer md:mb-6"
                  onClick={() => setSelectedId(photo.id)}
                >
                  <div className="overflow-hidden rounded-xl bg-white p-2 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-warm-coral/20">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-h-[90vh] max-w-[90vw]"
            >
              <div className="absolute -top-12 right-0 left-0 flex items-center justify-center gap-4">
                <button
                  onClick={goPrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20"
                >
                  <HiChevronLeft className="text-lg" />
                </button>
                <span className="text-sm text-white/60">
                  {selectedIndex + 1} / {data.photos.length}
                </span>
                <button
                  onClick={goNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20"
                >
                  <HiChevronRight className="text-lg" />
                </button>
              </div>

              <div
                className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  <HiX className="text-base" />
                </button>
                <img
                  src={data.photos[selectedIndex].src}
                  alt={data.photos[selectedIndex].alt}
                  className="max-h-[80vh] w-auto rounded-xl object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
