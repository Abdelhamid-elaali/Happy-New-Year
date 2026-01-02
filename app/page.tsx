"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the entry point
    router.replace("/enter")
  }, [router])

  return (
    <main className="w-full h-screen bg-black flex items-center justify-center">
      <div className="text-white/50 text-sm">Redirecting...</div>
    </main>
  )
}
