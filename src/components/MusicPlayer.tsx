import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMusicNote, HiPause } from "react-icons/hi";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="rounded-2xl border border-white/30 bg-white/20 px-5 py-3 shadow-lg backdrop-blur-xl"
          >
            <p className="font-body text-sm font-medium text-gray-700">
              {isPlaying ? "Now Playing" : "Music Paused"}
            </p>
            <p className="font-body text-xs text-gray-500">
              Happy Tunes 🎵
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setShowPlayer(!showPlayer);
          if (!showPlayer) togglePlay();
        }}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-warm-coral to-sky-blue text-white shadow-lg shadow-warm-coral/30 transition-all duration-300 hover:shadow-xl hover:shadow-warm-coral/40"
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : {}}
        >
          {isPlaying ? (
            <HiMusicNote className="text-xl" />
          ) : (
            <HiPause className="text-xl" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
