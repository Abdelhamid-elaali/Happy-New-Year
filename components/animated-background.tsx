"use client"

import { motion } from "framer-motion"

interface AnimatedBackgroundProps {
  mood: "ambitious" | "calm" | "bold" | "minimal"
}

const BACKGROUND_CONFIGS = {
  ambitious: {
    gradient: "linear-gradient(135deg, #1a0f08 0%, #2d1810 50%, #1a0f08 100%)",
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    },
    transition: { duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  },
  calm: {
    gradient: "linear-gradient(135deg, #0f1f1d 0%, #1a2f2c 50%, #0f1f1d 100%)",
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    },
    transition: { duration: 12, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  },
  bold: {
    gradient: "linear-gradient(135deg, #0a0e1a 0%, #1a0a2e 50%, #0a0e1a 100%)",
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
    },
    transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  },
  minimal: {
    gradient: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
    animate: {
      opacity: [1, 0.95, 1],
    },
    transition: { duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" as const },
  },
}

export default function AnimatedBackground({ mood }: AnimatedBackgroundProps) {
  const config = BACKGROUND_CONFIGS[mood]

  return (
    <>
      {/* Base gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ background: config.gradient }}
        animate={config.animate}
        transition={config.transition}
      />

      {/* Overlay elements for each mood */}
      {mood === "ambitious" && (
        <>
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ff4500" }}
            animate={{
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "#ffd700" }}
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </>
      )}

      {mood === "calm" && (
        <>
          <motion.div
            className="absolute top-20 left-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: "#4a9b7f" }}
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ background: "#7ec8c2" }}
            animate={{
              x: [0, -30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </>
      )}

      {mood === "bold" && (
        <>
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                #00d9ff 10px,
                #00d9ff 20px
              )`,
            }}
            animate={{
              backgroundPosition: ["0px 0px", "20px 20px"],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl"
            style={{ background: "#00d9ff" }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </>
      )}

      {mood === "minimal" && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 0%, transparent 50%), 
                             radial-gradient(circle at 80% 80%, white 0%, transparent 50%)`,
          }}
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      )}
    </>
  )
}
