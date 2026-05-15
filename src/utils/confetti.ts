import confetti from "canvas-confetti";

export function burstConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: ["#f472b6", "#a78bfa", "#fbbf24", "#ffffff", "#f9a8d4"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: ["#f472b6", "#a78bfa", "#fbbf24", "#ffffff", "#f9a8d4"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
}

export function fireworkBurst() {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0.6,
    decay: 0.94,
    startVelocity: 30,
    colors: ["#f472b6", "#a78bfa", "#fbbf24", "#ffffff", "#f9a8d4"],
  };

  const shoot = () => {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      origin: { x: Math.random(), y: Math.random() * 0.4 + 0.1 },
    });
  };

  setTimeout(shoot, 0);
  setTimeout(shoot, 200);
  setTimeout(shoot, 400);
  setTimeout(shoot, 600);
  setTimeout(shoot, 800);
}
