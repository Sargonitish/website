import type { AppData } from "../types";

export const defaultData: AppData = {
  config: {
    herName: "My Best Friend",
    birthday: { month: 12, day: 25, year: 2026 },
    heroMessage: "Happy Birthday Bestie! 🎉",
  },
  loveLetter: {
    greeting: "Hey Bestie,",
    paragraphs: [
      "Some people come into your life and change everything. You're one of those rare souls who made my world brighter just by being in it. From the random late-night talks to the uncontrollable laughing fits, every moment with you is a memory I cherish deeply.",
      "You've been my rock, my cheerleader, and the person I can always count on. You celebrate with me in the good times and stand by me in the tough ones. That kind of friendship doesn't come around often, and I hope you know how much it means to me.",
      "On your birthday, I just want you to know: you are appreciated, you are loved, and you are one of the most amazing people I know. The world is a better place with you in it. Thank you for being you — always real, always kind, always unforgettable.",
    ],
    closing: "With so much love and gratitude,",
    signature: "Your best friend forever 🌟",
  },
  memories: [
    { id: 1, date: "The Day We Met", title: "When It All Began", caption: "Who knew that one random meeting would lead to the best friendship ever?", image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop" },
    { id: 2, date: "Our First Adventure", title: "Exploring Together", caption: "Every adventure is better with your best friend by your side. This was iconic.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { id: 3, date: "The Funniest Night", title: "Laughing Until We Cried", caption: "The kind of laughter that makes your stomach hurt. I miss nights like these!", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop" },
    { id: 4, date: "Sunset Chats", title: "Deep Talks & Good Views", caption: "From silly jokes to life advice — we solve the world's problems together.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop" },
    { id: 5, date: "Just Being Us", title: "No Filter, Just Vibes", caption: "The best friendships are the ones where you can be your weirdest self.", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop" },
  ],
  reasons: [
    { id: 1, text: "You always know how to make me laugh, even on the worst days" },
    { id: 2, text: "You keep it real and never pretend to be someone you're not" },
    { id: 3, text: "You're the first person I want to tell good news to" },
    { id: 4, text: "You've got my back no matter what — true ride-or-die energy" },
    { id: 5, text: "You give the best advice, even when I don't want to hear it" },
    { id: 6, text: "You're weird in all the right ways and you own it" },
    { id: 7, text: "You celebrate my wins like they're your own" },
    { id: 8, text: "We can talk for hours or sit in silence — both feel perfect" },
    { id: 9, text: "You push me to be a better person, just by being you" },
    { id: 10, text: "Because you're simply the best friend anyone could ask for" },
  ],
  photos: [
    { id: 1, src: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&h=800&fit=crop", alt: "Beautiful moment", width: 600, height: 800 },
    { id: 2, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop", alt: "Adventure time", width: 800, height: 600 },
    { id: 3, src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=900&fit=crop", alt: "Starry night", width: 600, height: 900 },
    { id: 4, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop", alt: "Sunset glow", width: 800, height: 600 },
    { id: 5, src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600&h=800&fit=crop", alt: "Cozy moments", width: 600, height: 800 },
    { id: 6, src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&h=800&fit=crop", alt: "Nature walk", width: 800, height: 800 },
    { id: 7, src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=800&fit=crop", alt: "Tender glance", width: 600, height: 800 },
    { id: 8, src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop", alt: "City lights", width: 800, height: 600 },
  ],
  bucketList: [
    { id: 1, title: "Road Trip Across the Coast", icon: "🚗", description: "Windows down, music loud, and endless conversations. Just us and the open road." },
    { id: 2, title: "Watch the Sunrise Together", icon: "🌅", description: "Coffee in hand, sleepy smiles, and watching the world wake up side by side." },
    { id: 3, title: "Learn Something New", icon: "🎨", description: "Pottery class, cooking challenge, or dancing badly — as long as we do it together." },
    { id: 4, title: "Stargaze in the Middle of Nowhere", icon: "✨", description: "A blanket, some snacks, and a sky full of stars. No plans, just us." },
  ],
};
