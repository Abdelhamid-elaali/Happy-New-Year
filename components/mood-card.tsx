"use client"

import { motion } from "framer-motion"
import { Sparkles, Flame, Rocket, Moon, ArrowRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerformance } from "@/hooks/use-performance"

interface MoodCardProps {
  mood: {
    id: string
    name: string
    // emoji removed
    message: string
    description: string
  }
  onSelect: () => void
}

const icons: Record<string, LucideIcon> = {
  ambitious: Flame,
  calm: Sparkles,
  bold: Rocket,
  minimal: Moon,
}

const gradients = {
  ambitious: "from-orange-500 via-red-500 to-amber-500",
  calm: "from-emerald-400 via-teal-500 to-cyan-500",
  bold: "from-[#00D9FF] via-cyan-400 to-blue-500",
  minimal: "from-white via-slate-200 to-gray-400",
}

export default function MoodCard({ mood, onSelect }: MoodCardProps) {
  const Icon = icons[mood.id] || Sparkles
  const gradient = gradients[mood.id as keyof typeof gradients]
  const { isMobile } = usePerformance()

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.button
      onClick={onSelect}
      variants={variants}
      className={cn(
        "group relative w-full p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] text-left",
        "bg-white/5 backdrop-blur-2xl border border-white/10",
        "transition-all duration-700 ease-out",
        "hover:border-white/20 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]",
        "overflow-hidden flex flex-col justify-between",
        "min-h-[280px] md:min-h-[320px] h-full"
      )}
      whileHover={!isMobile ? { y: -12, scale: 1.02 } : {}}
      whileTap={{ scale: 0.98 }}
    >
      {/* Dynamic Background Mesh */}
      <div className={cn(
        "absolute inset-0 transition-opacity duration-700",
        "bg-gradient-to-br",
        gradient,
        isMobile ? "opacity-10" : "opacity-0 group-hover:opacity-10"
      )} />

      {/* Top Section: Icon & Label */}
      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6",
          "bg-white/5 ring-1 ring-white/20",
          "transition-all duration-500",
          isMobile ? "ring-white/40" : "group-hover:ring-white/40 group-hover:scale-110 group-hover:rotate-6",
          "shadow-lg", isMobile ? "shadow-xl" : "group-hover:shadow-xl"
        )}>
          <Icon
            size={isMobile ? 24 : 28}
            className={cn(
              "transition-colors duration-500",
              mood.id === "minimal"
                ? "text-white"
                : (isMobile ? "text-white" : "text-white/80 group-hover:text-white")
            )}
            strokeWidth={1.5}
          />
        </div>

        <h3 className={cn(
          "text-xl md:text-2xl font-bold text-white mb-2 font-[family-name:var(--font-google-sans-code)] tracking-tight transition-all duration-500",
          !isMobile && "group-hover:tracking-normal"
        )}>
          {mood.name}
        </h3>
        <div className={cn(
          "h-1 rounded-full transition-all duration-500",
          "bg-gradient-to-r",
          gradient,
          isMobile ? "w-16 opacity-100" : "w-8 opacity-50 group-hover:w-16 group-hover:opacity-100"
        )} />
      </div>

      {/* Middle Section: Description */}
      <div className="relative z-10 my-4 md:mb-8 md:mt-0">
        <p className={cn(
          "text-sm md:text-base font-medium leading-relaxed transition-colors duration-500",
          isMobile ? "text-gray-200" : "text-gray-400 group-hover:text-gray-200"
        )}>
          {mood.description}
        </p>
      </div>

      {/* Bottom Section: Action */}
      <div className="relative z-10 flex items-center justify-between mt-auto">
        <span className={cn(
          "text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-500",
          isMobile ? "text-white/90" : "text-white/40 group-hover:text-white/90"
        )}>
          {mood.id.toUpperCase()}
        </span>

        <div className="flex items-center gap-2 overflow-hidden">
          <span className={cn(
            "text-sm font-semibold text-white transition-transform duration-500",
            isMobile ? "translate-y-0" : "translate-y-8 group-hover:translate-y-0"
          )}>
            Select
          </span>
          <div className={cn(
            "w-8 h-8 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300",
            (isMobile || "") && "bg-white/20"
          )}>
            <ArrowRight className={cn(
              "w-4 h-4 text-white transition-all duration-500 delay-75",
              isMobile ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            )} />
          </div>
        </div>
      </div>

      {/* Decorative Blur Circle */}
      <div className={cn(
        "absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-[80px] transition-opacity duration-700 pointer-events-none",
        "bg-gradient-to-tr",
        gradient,
        isMobile ? "opacity-30" : "opacity-0 group-hover:opacity-30"
      )} />
    </motion.button>
  )
}
