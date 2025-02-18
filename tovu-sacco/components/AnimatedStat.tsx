"use client";

import type React from "react"
import { useState, useEffect } from "react"

interface AnimatedStatProps {
  end: number
  duration: number
  suffix?: string
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({ end, duration, suffix = "" }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      const currentCount = Math.floor(end * percentage)

      setCount(currentCount)

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <h3 className="text-4xl font-bold text-black-800">
      {count}
      {suffix}
    </h3>
  )
}

