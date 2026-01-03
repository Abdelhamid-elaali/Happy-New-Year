"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MoodCard from "./mood-card"
import ShinyText from "./shiny-text"
import dynamic from "next/dynamic"

const ThreeBackground = dynamic(() => import("./three-background"), { ssr: false })

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void
}

const MOODS = [
  {
    id: "ambitious",
    name: "Ambitious",
    message: "2026 – Build. Push. Win.",
    description: "Fast, energetic, powerful",
  },
  {
    id: "calm",
    name: "Calm",
    message: "2026 – Stay calm. Stay focused.",
    description: "Peaceful, breathing, centered",
  },
  {
    id: "bold",
    name: "Bold",
    message: "2026 – No limits.",
    description: "Futuristic, sharp, confident",
  },
  {
    id: "minimal",
    name: "Minimal",
    message: "2026 begins.",
    description: "Simple, poetic, pure",
  },
]

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null)
  const [isTitleHovered, setIsTitleHovered] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  return (
    <>
      <ThreeBackground mood={hoveredMood as any} />

      <div className="relative w-full h-[100svh] flex flex-col items-center justify-start md:justify-center px-4 py-8 overflow-y-auto overflow-x-hidden z-10 scrollbar-hide">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 md:mb-10 text-center space-y-2 md:space-y-3 mt-12 md:mt-0"
        >
          <h1
            className="text-4xl md:text-7xl font-bold drop-shadow-2xl font-[family-name:var(--font-google-sans-code)] whitespace-nowrap tracking-tighter"
            onMouseEnter={() => setIsTitleHovered(true)}
            onMouseLeave={() => setIsTitleHovered(false)}
          >
            <ShinyText
              text="Choose Your Mood"
              disabled={false}
              speed={5}
              className=""
              color={isTitleHovered ? "#ffffffff" : "#d6d6d6ff"} // Lime-200 for 'lime gray' hover, White for default
              shineColor="rgba(255, 255, 255, 1)"
              spread={120}
            />
          </h1>
          <p className="text-sm md:text-lg text-gray-400 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Enter 2026 with intention. Select your energy.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full max-w-7xl perspective-1000 flex-1 items-center pb-8"
        >
          {MOODS.map((mood) => (
            <div
              key={mood.id}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              className="w-full"
            >
              <MoodCard
                mood={mood}
                onSelect={() => onMoodSelect(mood.id)}
              />
            </div>
          ))}
        </motion.div>

        {/* Footer / Caption */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="my-4 md:my-6 text-white/20 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase"
        >
          Design your future
        </motion.div>
      </div>
    </>
  )
}
