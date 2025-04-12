"use client"

import { Box, Flex } from "@chakra-ui/core"
import { useEffect, useRef, useState } from "react"
import Logo from "./Logo"

export default function EnhancedLogo({ width = 100 }) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hovered, setHovered] = useState(false)
  const timeoutRef = useRef(null)
  const logoRef = useRef(null)

  // Trigger animation periodically
  useEffect(() => {
    const triggerAnimation = () => {
      if (!hovered) {
        setIsAnimating(true)

        // Reset animation state after it completes
        timeoutRef.current = setTimeout(() => {
          setIsAnimating(false)

          // Schedule next animation
          timeoutRef.current = setTimeout(triggerAnimation, Math.random() * 8000 + 4000) // Random interval between 4-12s
        }, 3000) // Animation duration
      }
    }

    // Start first animation after a delay
    timeoutRef.current = setTimeout(triggerAnimation, 2000)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [hovered])

  // Handle mouse interactions
  const handleMouseEnter = () => {
    setHovered(true)
    setIsAnimating(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    // Keep animation for a bit after mouse leaves
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false)
    }, 1500)
  }

  return (
    <Box
      position="relative"
      width={width}
      height="60px"
      overflow="visible"
      ref={logoRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="pointer"
    >
      {/* Original Logo */}
      <Box
        position="relative"
        zIndex="2"
        transform={isAnimating ? "scale(1.05)" : "scale(1)"}
        transition="transform 0.5s ease"
      >
        <Logo width={width} />
      </Box>

      {/* Shine Effects */}
      <Box
        className={`shine-container ${isAnimating ? "animate-shine" : ""}`}
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex="3"
        pointerEvents="none"
      >
        {/* Diagonal shine effect */}
        <Box
          className="diagonal-shine"
          position="absolute"
          top="-100%"
          left="-100%"
          width="300%"
          height="300%"
          background="linear-gradient(45deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 70%)"
          opacity="0"
          transform="rotate(25deg)"
        />

        {/* Glow effect */}
        <Box
          className="glow-effect"
          position="absolute"
          top="-50%"
          left="-50%"
          width="200%"
          height="200%"
          borderRadius="50%"
          background="radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)"
          opacity="0"
        />

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            className={`sparkle sparkle-${i + 1}`}
            position="absolute"
            width={`${Math.random() * 6 + 2}px`}
            height={`${Math.random() * 6 + 2}px`}
            borderRadius="50%"
            background="white"
            boxShadow="0 0 10px 2px rgba(255, 215, 0, 0.7)"
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            opacity="0"
          />
        ))}

        {/* Gold dust particles */}
        <Flex className="gold-dust" position="absolute" width="100%" height="100%" overflow="hidden">
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              className={`dust-particle dust-${i + 1}`}
              position="absolute"
              width={`${Math.random() * 3 + 1}px`}
              height={`${Math.random() * 3 + 1}px`}
              borderRadius="50%"
              background={`rgba(255, ${180 + Math.random() * 35}, 0, ${0.4 + Math.random() * 0.6})`}
              boxShadow="0 0 3px 1px rgba(255, 215, 0, 0.3)"
              top={`${Math.random() * 100}%`}
              left={`${Math.random() * 100}%`}
              opacity="0"
            />
          ))}
        </Flex>

        {/* Treasure coins effect */}
        {isAnimating &&
          [...Array(5)].map((_, i) => (
            <Box
              key={`coin-${i}`}
              className={`coin coin-${i + 1}`}
              position="absolute"
              width={`${Math.random() * 8 + 4}px`}
              height={`${Math.random() * 8 + 4}px`}
              borderRadius="50%"
              background="linear-gradient(135deg, #ffd700 0%, #ffcc00 50%, #cca300 100%)"
              boxShadow="0 0 5px 2px rgba(255, 215, 0, 0.5)"
              top={`${Math.random() * 80 + 10}%`}
              left={`${Math.random() * 80 + 10}%`}
              opacity="0"
              zIndex="4"
            />
          ))}
      </Box>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes diagonalShine {
          0% {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%) rotate(25deg);
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateX(100%) translateY(100%) rotate(25deg);
          }
        }
        
        @keyframes glowPulse {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        
        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          20% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          80% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-${Math.random() * 30 + 15}px) translateX(${Math.random() * 30 - 15}px);
            opacity: 0;
          }
        }
        
        @keyframes coinFlip {
          0% {
            opacity: 0;
            transform: scale(0) rotateY(0deg);
          }
          20% {
            opacity: 1;
            transform: scale(1) rotateY(180deg);
          }
          40% {
            transform: scale(1) rotateY(360deg);
          }
          60% {
            transform: scale(1) rotateY(540deg);
          }
          80% {
            opacity: 1;
            transform: scale(1) rotateY(720deg);
          }
          100% {
            opacity: 0;
            transform: scale(0) rotateY(900deg);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
        
        .animate-shine .diagonal-shine {
          animation: diagonalShine 2s ease-in-out forwards;
        }
        
        .animate-shine .glow-effect {
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        .animate-shine .sparkle {
          animation: sparkle 3s ease-out forwards;
        }
        
        .animate-shine .dust-particle {
          animation: float 3s ease-out forwards;
        }
        
        .animate-shine .coin {
          animation: coinFlip 2.5s ease-in-out forwards;
        }
        
        .sparkle-1 { animation-delay: 0.1s !important; }
        .sparkle-2 { animation-delay: 0.3s !important; }
        .sparkle-3 { animation-delay: 0.5s !important; }
        .sparkle-4 { animation-delay: 0.7s !important; }
        .sparkle-5 { animation-delay: 0.9s !important; }
        .sparkle-6 { animation-delay: 1.1s !important; }
        .sparkle-7 { animation-delay: 1.3s !important; }
        .sparkle-8 { animation-delay: 1.5s !important; }
        
        .dust-1 { animation-delay: 0.1s !important; }
        .dust-2 { animation-delay: 0.2s !important; }
        .dust-3 { animation-delay: 0.3s !important; }
        .dust-4 { animation-delay: 0.4s !important; }
        .dust-5 { animation-delay: 0.5s !important; }
        .dust-6 { animation-delay: 0.6s !important; }
        .dust-7 { animation-delay: 0.7s !important; }
        .dust-8 { animation-delay: 0.8s !important; }
        .dust-9 { animation-delay: 0.9s !important; }
        .dust-10 { animation-delay: 1.0s !important; }
        .dust-11 { animation-delay: 1.1s !important; }
        .dust-12 { animation-delay: 1.2s !important; }
        .dust-13 { animation-delay: 1.3s !important; }
        .dust-14 { animation-delay: 1.4s !important; }
        .dust-15 { animation-delay: 1.5s !important; }
        .dust-16 { animation-delay: 1.6s !important; }
        .dust-17 { animation-delay: 1.7s !important; }
        .dust-18 { animation-delay: 1.8s !important; }
        .dust-19 { animation-delay: 1.9s !important; }
        .dust-20 { animation-delay: 2.0s !important; }
        
        .coin-1 { animation-delay: 0.2s !important; }
        .coin-2 { animation-delay: 0.5s !important; }
        .coin-3 { animation-delay: 0.8s !important; }
        .coin-4 { animation-delay: 1.1s !important; }
        .coin-5 { animation-delay: 1.4s !important; }
      `}</style>
    </Box>
  )
}
