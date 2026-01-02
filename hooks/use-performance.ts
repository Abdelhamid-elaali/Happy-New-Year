"use client"

import { useState, useEffect } from 'react'

export function usePerformance() {
    const [isMobile, setIsMobile] = useState(false)
    const [reduceMotion, setReduceMotion] = useState(false)
    const [isLowPower, setIsLowPower] = useState(false)

    useEffect(() => {
        // Mobile detection
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Motion preference
        const checkMotion = () => {
            setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        }

        // Low power detection (heuristic)
        const checkPower = () => {
            // @ts-ignore
            const concurrency = navigator.hardwareConcurrency || 4
            // Assume <= 4 cores on mobile might benefit from lighter effects
            setIsLowPower(concurrency <= 4 && window.innerWidth < 768)
        }

        checkMobile()
        checkMotion()
        checkPower()

        window.addEventListener('resize', checkMobile)
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (motionQuery.addEventListener) {
            motionQuery.addEventListener('change', checkMotion)
        } else {
            // Fallback for older browsers
            motionQuery.addListener(checkMotion)
        }

        return () => {
            window.removeEventListener('resize', checkMobile)
            if (motionQuery.removeEventListener) {
                motionQuery.removeEventListener('change', checkMotion)
            } else {
                motionQuery.removeListener(checkMotion)
            }
        }
    }, [])

    return { isMobile, reduceMotion, isLowPower }
}
