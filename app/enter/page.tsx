"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import ClickSpark from "@/components/click-spark"
import dynamic from 'next/dynamic'
import { usePerformance } from "@/hooks/use-performance"

const HyperspeedBackground = dynamic(() => import('@/components/hyperspeed-background'), {
    ssr: false
})

export default function EnterPage() {
    const { isLowPower, reduceMotion } = usePerformance()
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [focused, setFocused] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name.trim()) return

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name.trim() }),
            })

            const data = await response.json()

            if (data.success) {
                localStorage.setItem("userId", data.user.id.toString())
                localStorage.setItem("userName", data.user.name)
                router.push("/mood")
            } else {
                setError(data.error || "Failed to register")
                setIsLoading(false)
            }
        } catch (err) {
            console.error("Registration error:", err)
            setError("Something went wrong. Please try again.")
            setIsLoading(false)
        }
    }

    const isValid = name.trim().length > 0 && name.trim().length <= 20
    const showHyperspeed = !isLowPower && !reduceMotion

    return (
        <ClickSpark sparkColor="#ffffff" sparkSize={12} sparkRadius={20} sparkCount={8} duration={500}>
            <main className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
                {/* Hyperspeed Background or Fallback */}
                {showHyperspeed ? (
                    <HyperspeedBackground />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/50 to-blue-950/50" />
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md mx-4"
                >
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl cursor-default">
                        <motion.h1
                            className="text-6xl md:text-7xl font-black text-center mb-2 bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text font-[family-name:var(--font-google-sans-code)] tracking-tighter"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.6 }}
                        >
                            2026
                        </motion.h1>

                        <motion.p
                            className="text-center text-white/60 mb-8 text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            Your Personal Entry
                        </motion.p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <motion.input
                                    type="text"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^[a-zA-Z\s]*$/.test(value)) {
                                            setName(value);
                                        }
                                    }}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    maxLength={20}
                                    className={`w-full px-6 py-4 rounded-xl bg-white/5 border ${focused ? "border-blue-400/50" : "border-white/10"
                                        } text-white placeholder-white/40 focus:outline-none transition-all duration-300 font-[family-name:var(--font-google-sans-code)] tracking-tight`}
                                    initial={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                                    animate={{
                                        borderColor: focused ? "rgba(96, 165, 250, 0.5)" : "rgba(255, 255, 255, 0.1)",
                                    }}
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">
                                    {name.length}/20
                                </div>
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-400 text-sm text-center"
                                >
                                    {error}
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-[family-name:var(--font-google-sans-code)] tracking-tight ${isValid && !isLoading
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                                    : "bg-white/10 text-white/30 cursor-not-allowed"
                                    }`}
                                whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
                                whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
                            >
                                {isLoading ? (
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        Starting your journey...
                                    </motion.span>
                                ) : (
                                    "Begin Your 2026"
                                )}
                            </motion.button>
                        </form>

                        <motion.p
                            className="text-center text-sm text-white/30 mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            One user. One mood. One journey.
                        </motion.p>
                    </div>
                </motion.div>
            </main>
        </ClickSpark>
    )
}
