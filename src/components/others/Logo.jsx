"use client"

import { Box, Flex, Image } from "@chakra-ui/core"
import { useEffect, useRef, useState } from "react"

export default function Logo({ width = 100 }) {
  const canvasRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const [isMounted, setIsMounted] = useState(false)

  // Initialize particles
  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const dpr = window.devicePixelRatio || 1

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create particles
    const createParticles = () => {
      const particles = []
      const particleCount = 50
      const colors = ["#2d4052", "#415972", "#192633", "#3498db", "#2ecc71"]

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
          originalX: Math.random() * canvas.width,
          originalY: Math.random() * canvas.height,
        })
      }

      particlesRef.current = particles
    }

    createParticles()

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x / dpr, particle.y / dpr, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update particle position
        if (isHovered) {
          // Move particles away from cursor
          const dx = particle.x / dpr - canvas.width / (2 * dpr)
          const dy = particle.y / dpr - canvas.height / (2 * dpr)
          const distance = Math.sqrt(dx * dx + dy * dy)
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (canvas.width / dpr - distance) / (canvas.width / dpr)
          const directionX = forceDirectionX * force * 2
          const directionY = forceDirectionY * force * 2

          particle.x += directionX
          particle.y += directionY

          // Keep particles within bounds
          if (particle.x < 0 || particle.x > canvas.width) particle.x = particle.originalX
          if (particle.y < 0 || particle.y > canvas.height) particle.y = particle.originalY
        } else {
          // Return to original position
          particle.x += (particle.originalX - particle.x) * 0.05
          particle.y += (particle.originalY - particle.y) * 0.05
        }
      })

      // Draw connections between particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x / dpr - otherParticle.x / dpr
          const dy = particle.y / dpr - otherParticle.y / dpr
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 50) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(45, 64, 82, ${1 - distance / 50})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x / dpr, particle.y / dpr)
            ctx.lineTo(otherParticle.x / dpr, otherParticle.y / dpr)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isMounted, isHovered])

  return (
    <Box position="relative" width={`${width}px`} height="60px">
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <Flex
        position="relative"
        zIndex={2}
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          
         
          width="100%"
          height="100%"
          objectFit="contain"
          className={isHovered ? "pulse" : ""}
          style={{
            filter: isHovered ? "drop-shadow(0 0 8px rgba(45, 64, 82, 0.8))" : "none",
            transition: "filter 0.3s ease",
          }}
        />
      </Flex>
    </Box>
  )
}
