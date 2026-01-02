"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MoodSelector from "@/components/mood-selector"
import ClickSpark from "@/components/click-spark"
import { motion } from "framer-motion"

export default function MoodPage() {
    const router = useRouter()
    const [selectedMood, setSelectedMood] = useState<string | null>(null)
    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const storedUserId = localStorage.getItem("userId")
        const storedUserName = localStorage.getItem("userName")

        if (!storedUserId || !storedUserName) {
            router.push("/enter")
            return
        }

        setUserId(storedUserId)
        setUserName(storedUserName)
    }, [router])

    const handleMoodSelect = async (mood: string) => {
        setSelectedMood(mood)
        localStorage.setItem("selected-mood", mood)

        // Update mood in database
        if (userId) {
            try {
                await fetch(`/api/users/${userId}/mood`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ mood }),
                })
            } catch (error) {
                console.error("Failed to update mood:", error)
            }
        }

        // Trigger transition animation then navigate
        setTimeout(() => {
            router.push("/experience")
        }, 2200)
    }

    if (!isMounted || !userId) {
        return null
    }

    return (
        <ClickSpark
            sparkColor="#ffffff"
            sparkSize={12}
            sparkRadius={20}
            sparkCount={8}
            duration={500}
        >
            <main className="w-full h-screen overflow-hidden">
                {/* Transition overlay with Logo Animation */}
                {selectedMood && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-3xl"
                        style={{
                            backgroundColor: `var(--mood-${selectedMood}-bg)`,
                        }}
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Soft Glow Background */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0.3 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="absolute w-64 h-64 rounded-full blur-[100px]"
                                style={{ backgroundColor: `var(--mood-${selectedMood}-primary)` }}
                            />

                            {/* Animated 2026 Logo */}
                            <motion.h1
                                initial={{ scale: 0.8, opacity: 0, letterSpacing: "1em" }}
                                animate={{ scale: 1, opacity: 1, letterSpacing: "0.2em" }}
                                transition={{
                                    duration: 1.2,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.2
                                }}
                                className="text-8xl md:text-9xl font-black italic text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10"
                            >
                                2026
                            </motion.h1>

                            {/* Subtitle reveal */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.5, y: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="mt-4 text-xs font-bold uppercase tracking-[0.5em] text-white/50"
                            >
                                Preparing {userName}&apos;s experience
                            </motion.p>
                        </div>
                    </motion.div>
                )}

                {/* Landing content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: selectedMood ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                    className={selectedMood ? "pointer-events-none" : ""}
                >
                    <MoodSelector onMoodSelect={handleMoodSelect} />
                </motion.div>
            </main>
        </ClickSpark>
    )
}
