"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import ThreeBackground from "@/components/three-background"
import Countdown from "@/components/countdown"
import TextType from "@/components/text-type"
import Confetti from "@/components/confetti"

type Mood = "ambitious" | "calm" | "bold" | "minimal"

const MOOD_MESSAGES = {
  ambitious: {
    celebration: "The year of ambition begins!",
  },
  calm: {
    celebration: "Peace finds you in 2026",
  },
  bold: {
    celebration: "The future is yours",
  },
  minimal: {
    celebration: "✧ 2026 ✧",
  },
}

export default function ExperiencePage() {
  const router = useRouter()
  const [mood, setMood] = useState<Mood | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [hasReached, setHasReached] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const savedMood = localStorage.getItem("selected-mood") as Mood | null
    const storedUserName = localStorage.getItem("userName")
    const storedUserId = localStorage.getItem("userId")

    // Guard: redirect if no user or mood
    if (!storedUserId || !storedUserName) {
      router.push("/enter")
      return
    }
    if (!savedMood) {
      router.push("/mood")
      return
    }

    setMood(savedMood)
    setUserName(storedUserName)
  }, [router])

  if (!isMounted || !mood || !userName) {
    return null
  }

  // Personalized message: "{Name}, your {Mood} 2026 begins."
  const personalizedPrimary = `${userName}, your ${mood.charAt(0).toUpperCase() + mood.slice(1)} 2026 begins.`
  const personalizedSecondary = "Make it unforgettable"

  return (
    <main className="w-full min-h-[100svh] overflow-hidden relative flex flex-col" data-mood={mood}>
      {/* Animated background */}
      <ThreeBackground mood={mood} isExperience={true} />

      {/* Confetti celebration at midnight */}
      {hasReached && <Confetti mood={mood} />}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 pt-24 md:pt-0 max-w-7xl mx-auto">
        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 drop-shadow-2xl font-[family-name:var(--font-google-sans-code)] tracking-tighter min-h-[1.2em]"
            style={{ color: `var(--mood-${mood}-primary)` }}
            animate={
              mood === "ambitious"
                ? { scale: [1, 1.02, 1] }
                : mood === "bold"
                  ? {
                    textShadow: [
                      "0 0 20px rgba(0,217,255,0.2)",
                      "0 0 50px rgba(0,217,255,0.5)",
                      "0 0 20px rgba(0,217,255,0.2)",
                    ],
                  }
                  : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          >
            <TextType
              text={personalizedPrimary}
              typingSpeed={70}
              loop={false}
              showCursor={true}
              cursorCharacter="_"
              initialDelay={800}
            />
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase min-h-[1.5em]"
            style={{ color: `var(--mood-${mood}-accent)`, opacity: 0.6 }}
          >
            <TextType
              text={personalizedSecondary}
              typingSpeed={40}
              loop={false}
              showCursor={false}
              initialDelay={2500}
            />
          </motion.p>
        </motion.div>

        {/* Countdown */}
        <div className="w-full flex justify-center">
          <Countdown mood={mood} onReached={() => setHasReached(true)} />
        </div>

        {/* Celebration message */}
        {hasReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mt-16 text-center"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black italic tracking-tighter"
              style={{ color: `var(--mood-${mood}-primary)` }}
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 20px rgba(255,255,255,0)",
                  "0 0 40px rgba(255,255,255,0.3)",
                  "0 0 20px rgba(255,255,255,0)",
                ]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {MOOD_MESSAGES[mood].celebration}
            </motion.h2>
          </motion.div>
        )}
      </div>

      {/* Back button */}
      <motion.button
        onClick={() => router.push("/mood")}
        className="absolute top-8 left-8 z-50 group flex items-center gap-3 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] backdrop-blur-2xl border transition-all duration-300"
        style={{
          color: `var(--mood-${mood}-primary)`,
          borderColor: `var(--mood-${mood}-primary)30`,
          backgroundColor: `white/5`,
        }}
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderColor: `var(--mood-${mood}-primary)60`,
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="group-hover:scale-110 transition-transform"
        >
          <ArrowLeft size={16} strokeWidth={3} />
        </motion.div>
        <span>Change Mood</span>
      </motion.button>
    </main>
  )
}
