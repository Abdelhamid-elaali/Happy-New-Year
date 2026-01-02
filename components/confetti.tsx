"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { usePerformance } from "@/hooks/use-performance"

type Mood = "ambitious" | "calm" | "bold" | "minimal"

interface ConfettiProps {
  mood?: Mood | null
}

export default function Confetti({ mood = "minimal" }: ConfettiProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const { isLowPower } = usePerformance()

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  const getColors = () => {
    switch (mood) {
      case "ambitious":
        return ["#ff6b35", "#ffcc33", "#ff4500", "#ffffff"]
      case "calm":
        return ["#4ade80", "#22d3ee", "#a7f3d0", "#ffffff"]
      case "bold":
        return ["#00d9ff", "#a855f7", "#ffffff", "#3b82f6"]
      case "minimal":
      default:
        return ["#ffffff", "#e5e5e5", "#a0a0a0", "#f3f3f3"]
    }
  }

  const colors = getColors()

  // Reduce particles on mobile/low power
  const particleCount = isLowPower ? 50 : 150

  const pieces = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000) - window.innerHeight,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 0.5,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            left: piece.x,
            top: -20, // Start above screen
          }}
          animate={{
            y: windowSize.height + 100,
            rotate: [piece.rotation, piece.rotation + 360],
            x: [piece.x, piece.x + (Math.random() * 100 - 50)],
          }}
          transition={{
            duration: piece.duration,
            ease: "easeOut",
            delay: piece.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
