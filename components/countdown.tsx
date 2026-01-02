"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CountdownProps {
  mood: "ambitious" | "calm" | "bold" | "minimal"
  onReached?: () => void
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const MOOD_COLORS = {
  ambitious: "#ff4500",
  calm: "#4a9b7f",
  bold: "#00d9ff",
  minimal: "#ffffff",
}

export default function Countdown({ mood, onReached }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const targetDate = new Date("2026-01-01T00:00:00").getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        onReached?.()
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      const updated = calculateTimeLeft()
      setTimeLeft(updated)
      if (updated.days === 0 && updated.hours === 0 && updated.minutes === 0 && updated.seconds === 0) {
        onReached?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [onReached])

  if (!mounted) {
    return null
  }

  const TimeUnit = ({ value, label, delay }: { value: number; label: string; delay: number }) => (
    <div
      className="flex flex-col items-center group"
    >
      <div className="relative">
        <motion.div
          className="w-24 md:w-32 h-24 md:h-32 flex items-center justify-center rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden mb-4 group-hover:border-white/20 transition-all duration-500"
        >
          <span
            className="text-5xl md:text-7xl font-black tracking-tighter"
            style={{ color: MOOD_COLORS[mood] }}
          >
            {String(value).padStart(2, "0")}
          </span>

          {/* Internal Glow Mesh - Reduced Opacity */}
          <div
            className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${MOOD_COLORS[mood]}, transparent 70%)`
            }}
          />
        </motion.div>
      </div>

      <span
        className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/60 group-hover:text-white/90 transition-colors"
      >
        {label}
      </span>
    </div>
  )

  return (
    <div
      className="flex gap-3 md:gap-6 justify-center items-center flex-wrap max-w-4xl"
    >
      <TimeUnit value={timeLeft.days} label="Days" delay={0.1} />
      <div className="text-3xl font-light text-white/20 mb-8 hidden md:block">/</div>
      <TimeUnit value={timeLeft.hours} label="Hours" delay={0.2} />
      <div className="text-3xl font-light text-white/20 mb-8 hidden md:block">/</div>
      <TimeUnit value={timeLeft.minutes} label="Minutes" delay={0.3} />
      <div className="text-3xl font-light text-white/20 mb-8 hidden md:block">/</div>
      <TimeUnit value={timeLeft.seconds} label="Seconds" delay={0.4} />
    </div>
  )
}
