"use client";

import { useCallback } from "react";

export function useSoundEffects() {
  const playSound = useCallback((type: "nav" | "click" | "pop" | "toggle" | "success") => {
    if (typeof window === "undefined") return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      switch (type) {
        case "nav":
          // Subtle, modern tactile tick (macOS / iOS style)
          const oscNav = ctx.createOscillator();
          const gainNav = ctx.createGain();
          oscNav.connect(gainNav);
          gainNav.connect(ctx.destination);

          oscNav.type = "sine";
          // Fast frequency drop creates a crisp mechanical "thump"
          oscNav.frequency.setValueAtTime(600, now);
          oscNav.frequency.exponentialRampToValueAtTime(120, now + 0.02);

          // Ultra-short envelope for zero resonance
          gainNav.gain.setValueAtTime(0.04, now);
          gainNav.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

          oscNav.start(now);
          oscNav.stop(now + 0.02);
          break;

        case "click":
          const oscClick = ctx.createOscillator();
          const gainClick = ctx.createGain();
          oscClick.connect(gainClick);
          gainClick.connect(ctx.destination);

          oscClick.type = "sine";
          oscClick.frequency.setValueAtTime(800, now);
          oscClick.frequency.exponentialRampToValueAtTime(400, now + 0.03);
          gainClick.gain.setValueAtTime(0.08, now);
          gainClick.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

          oscClick.start(now);
          oscClick.stop(now + 0.03);
          break;

        case "toggle":
          const oscToggle = ctx.createOscillator();
          const gainToggle = ctx.createGain();
          oscToggle.connect(gainToggle);
          gainToggle.connect(ctx.destination);

          oscToggle.type = "triangle";
          oscToggle.frequency.setValueAtTime(400, now);
          oscToggle.frequency.exponentialRampToValueAtTime(800, now + 0.08);
          gainToggle.gain.setValueAtTime(0.06, now);
          gainToggle.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

          oscToggle.start(now);
          oscToggle.stop(now + 0.08);
          break;

        case "success":
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          const gain2 = ctx.createGain();

          osc1.connect(gain1);
          osc2.connect(gain2);
          gain1.connect(ctx.destination);
          gain2.connect(ctx.destination);

          osc1.type = "sine";
          osc2.type = "sine";

          osc1.frequency.setValueAtTime(523.25, now);
          osc2.frequency.setValueAtTime(659.25, now + 0.08);

          gain1.gain.setValueAtTime(0.08, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

          gain2.gain.setValueAtTime(0.08, now + 0.08);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc1.start(now);
          osc1.stop(now + 0.15);
          osc2.start(now + 0.08);
          osc2.stop(now + 0.25);
          break;
      }
    } catch {
      // Graceful fallback if Web Audio API is blocked
    }
  }, []);

  return { playSound };
}

