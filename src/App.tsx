import { useEffect, useState } from "react";
import { DataProvider } from "./data/store";
import Hero from "./components/sections/Hero";
import LoveLetter from "./components/sections/LoveLetter";
import MemoryTimeline from "./components/sections/MemoryTimeline";
import PhotoGallery from "./components/sections/PhotoGallery";
import Reasons from "./components/sections/Reasons";
import BucketList from "./components/sections/BucketList";
import CountdownTimer from "./components/sections/CountdownTimer";
import Surprise from "./components/sections/Surprise";
import FinalMessage from "./components/sections/FinalMessage";
import FloatingHearts from "./components/FloatingHearts";
import ParticleBackground from "./components/ParticleBackground";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";

function MainSite() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <ParticleBackground />
      <FloatingHearts />
      <Navbar />
      <MusicPlayer />

      <section id="hero">
        <Hero />
      </section>
      <LoveLetter />
      <MemoryTimeline />
      <PhotoGallery />
      <Reasons />
      <BucketList />
      <CountdownTimer />
      <Surprise />
      <FinalMessage />

      <footer className="relative z-10 border-t border-white/20 bg-white/10 py-6 text-center backdrop-blur-sm">
        <a
          href="#admin"
          className="text-xs text-gray-400 transition-colors hover:text-warm-coral"
        >
          Admin
        </a>
      </footer>
    </>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash || "#home");

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <DataProvider>
      <main className="relative min-h-screen">
        {route === "#admin" ? <Admin /> : <MainSite />}
      </main>
    </DataProvider>
  );
}
