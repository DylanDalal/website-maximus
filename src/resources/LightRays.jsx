// src/components/Rays.jsx
import { motion } from "framer-motion";

export default function Rays({
  colorA = "rgba(212,176,99,0.55)",
  colorB = "rgba(212,176,99,0.35)",
  raysA = 18,
  raysB = 24,
  beamRatioA = 0.18,
  beamRatioB = 0.12,
  speedA = 80,
  speedB = 140,
  angle = -10,
  originX = 0.12,  // 0–1
  originY = -0.35, // negative = above
  blur = 28,
  length = 2.4,
  opacity = 1,
  blendMode = "screen",
  overscan = 0.45,   // <— expand beyond container to hide edge cuts
  seamOffset = 12,   // <— moves the conic “seam” offscreen
}) {
  const ox = `${originX * 100}%`;
  const oy = `${originY * 100}%`;

  const stepA = 360 / raysA;
  const beamA = Math.max(1, stepA * beamRatioA);
  const gA = `repeating-conic-gradient(from ${seamOffset}deg at ${ox} ${oy},
              ${colorA} 0deg ${beamA}deg, transparent ${beamA}deg ${stepA}deg)`;

  const stepB = 360 / raysB;
  const beamB = Math.max(1, stepB * beamRatioB);
  const gB = `repeating-conic-gradient(from ${seamOffset}deg at ${ox} ${oy},
              ${colorB} 0deg ${beamB}deg, transparent ${beamB}deg ${stepB}deg)`;

  const baseStyle = {
    position: "absolute",
    top: `-${overscan * 100}%`,
    right: `-${overscan * 100}%`,
    bottom: `-${overscan * 100}%`,
    left: `-${overscan * 100}%`,
    pointerEvents: "none",
    filter: `blur(${blur}px)`,
    mixBlendMode: blendMode,
    transform: `rotate(${angle}deg) scaleY(${length})`,
    transformOrigin: `${ox} ${oy}`,
    // radial falloff from the light source, avoids straight edge lines
    maskImage: `radial-gradient(180% 140% at ${ox} ${oy},
                 black 0%, black 42%, transparent 86%)`,
    WebkitMaskImage: `radial-gradient(180% 140% at ${ox} ${oy},
                 black 0%, black 42%, transparent 86%)`,
    willChange: "transform",
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ ...baseStyle, background: gA, opacity }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: speedA }}
      />
      <motion.div
        aria-hidden
        style={{ ...baseStyle, background: gB, opacity: opacity * 0.9 }}
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: speedB }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 220px 120px rgba(0,0,0,0.75)",
          borderRadius: "inherit",
        }}
      />
    </>
  );
}
