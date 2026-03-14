"use client";

import type { Options } from "canvas-confetti";

let confettiLoader: Promise<typeof import("canvas-confetti")["default"]> | null = null;

function loadConfetti() {
  if (!confettiLoader) {
    confettiLoader = import("canvas-confetti").then((module) => module.default);
  }
  return confettiLoader;
}

export async function launchCompletionCelebration() {
  if (typeof window === "undefined") return;

  const confetti = await loadConfetti();
  const defaults: Options = {
    ticks: 240,
    gravity: 0.92,
    startVelocity: 52,
    spread: 72,
    scalar: 1.08,
    zIndex: 3000,
    disableForReducedMotion: true,
  };

  const fire = (particleRatio: number, options: Options) => {
    confetti({
      ...defaults,
      ...options,
      particleCount: Math.floor(180 * particleRatio),
    });
  };

  fire(0.22, {
    angle: 60,
    spread: 58,
    origin: { x: 0.18, y: 0.78 },
    colors: ["#2563eb", "#7c3aed", "#ffffff", "#f59e0b"],
  });

  fire(0.22, {
    angle: 120,
    spread: 58,
    origin: { x: 0.82, y: 0.78 },
    colors: ["#2563eb", "#7c3aed", "#ffffff", "#f59e0b"],
  });

  fire(0.18, {
    spread: 88,
    startVelocity: 58,
    scalar: 1.18,
    origin: { x: 0.5, y: 0.56 },
    shapes: ["star"],
    colors: ["#ffffff", "#fef08a", "#bfdbfe"],
  });

  window.setTimeout(() => {
    fire(0.16, {
      angle: 75,
      spread: 76,
      origin: { x: 0.32, y: 0.46 },
      colors: ["#38bdf8", "#a78bfa", "#ffffff"],
    });
  }, 120);

  window.setTimeout(() => {
    fire(0.16, {
      angle: 105,
      spread: 76,
      origin: { x: 0.68, y: 0.46 },
      colors: ["#38bdf8", "#a78bfa", "#ffffff"],
    });
  }, 180);
}
