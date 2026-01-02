"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import LightRays from "./light-rays"
import BlobCursor from "./blob-cursor"
import Ballpit from "./ballpit"
import SplashCursor from "./splash-cursor"
import { usePerformance } from "@/hooks/use-performance"

type Mood = "ambitious" | "calm" | "bold" | "minimal"

interface ParticleProps {
  mood: Mood | null
  count?: number
}

function Particles({ mood, count = 1000 }: ParticleProps) {
  const ref = useRef<THREE.Points>(null)

  // Generate particles based on mood
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  // Custom visual parameters based on mood
  const { color, size, speedY, speedRot, opacity } = useMemo(() => {
    switch (mood) {
      case "ambitious":
        return { color: "#ff6b35", size: 0.05, speedY: 0.2, speedRot: 0.05, opacity: 0.6 }
      case "calm":
        return { color: "#48e5c2", size: 0.03, speedY: 0.05, speedRot: 0.02, opacity: 0.6 }
      case "bold":
        return { color: "#00D9FF", size: 0.07, speedY: 0.02, speedRot: 0.015, opacity: 0.8 }
      case "minimal":
        return { color: "#ffffff", size: 0.06, speedY: 0.1, speedRot: 0.1, opacity: 0.7 }
      default:
        return { color: "#f8f9fa", size: 0.02, speedY: 0.02, speedRot: 0.01, opacity: 0.4 }
    }
  }, [mood])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x -= delta * speedRot * 0.5
    ref.current.rotation.y -= delta * speedRot

    if (mood === "calm") {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }

    if (mood === "bold") {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.03
      ref.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

function BackgroundContent({ mood, isLowPower }: { mood: Mood | null, isLowPower: boolean }) {
  // Drastically reduce particles on low power
  const particleCount = isLowPower ? 200 : 1000
  const boldCount = isLowPower ? 500 : 2500
  const minimalCount = isLowPower ? 100 : 400

  if (mood === 'bold') {
    return <Particles mood={mood} count={boldCount} />
  }

  if (mood === 'minimal') {
    return <Particles mood={mood} count={minimalCount} />
  }

  return <Particles mood={mood} count={particleCount} />
}

export default function ThreeBackground({ mood, isExperience = false }: { mood: Mood | null; isExperience?: boolean }) {
  const { isLowPower, reduceMotion } = usePerformance()
  const disableHeavyEffects = isLowPower || reduceMotion

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Ballpit Overlay for Ambitious Mood - Only in Experience */}
      {isExperience && mood === 'ambitious' && !disableHeavyEffects && (
        <div className="absolute inset-0 z-10 opacity-70">
          <Ballpit
            count={60} // Reduced count even for desktop default, was 160
            gravity={0.1}
            wallBounce={0.8}
            followCursor={true}
            colors={[0xff6b35, 0xffcc33, 0xffffff, 0xff4d4d]}
          />
        </div>
      )}

      {/* LightRays Overlay for Minimal Mood - Only in Experience */}
      {isExperience && mood === 'minimal' && !disableHeavyEffects && (
        <div className="absolute inset-0 z-10 opacity-60">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.8}
            lightSpread={0.6}
            rayLength={1.5}
            followMouse={true}
            mouseInfluence={0.05}
            noiseAmount={0.05}
            distortion={0.03}
          />
        </div>
      )}

      {/* SplashCursor Overlay for Calm Mood - Only in Experience */}
      {isExperience && mood === 'calm' && !disableHeavyEffects && (
        <div className="absolute inset-0 z-10 opacity-60">
          <SplashCursor
            SPLAT_RADIUS={0.15}
            SPLAT_FORCE={4000}
            CURL={2}
          />
        </div>
      )}

      {/* BlobCursor Overlay for Bold Mood - Only in Experience */}
      {isExperience && mood === 'bold' && !disableHeavyEffects && (
        <div className="absolute inset-0 z-10 opacity-80">
          <BlobCursor
            fillColor="#2ed5ff"
            zIndex={10}
          />
        </div>
      )}

      {/* R3F Canvas for other moods/effects */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={isLowPower ? 1 : [1, 2]} // Lower resolution on low power
          gl={{ antialias: false }}
        >
          <BackgroundContent mood={mood} isLowPower={isLowPower} />
        </Canvas>
      </div>
    </div>
  )
}
