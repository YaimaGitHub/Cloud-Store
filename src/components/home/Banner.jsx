"use client"

import { Box, Flex, IconButton } from "@chakra-ui/core"
import { useState, useEffect, useCallback } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

const bannerImages = ["/images/logo9.jpg", "/images/banner2.jpg", "/images/banner3.jpg", "/images/banner4.jpg"]

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goToNext = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Match this with the CSS transition duration
  }, [isTransitioning])

  const goToPrev = useCallback(() => {
    if (isTransitioning) return

    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Match this with the CSS transition duration
  }, [isTransitioning])

  // Auto-rotate images
  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(timer)
  }, [goToNext])

  return (
    <Box
      w="100%"
      h={["150px", "200px", "250px", "300px"]}
      position="relative"
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
    >
      {/* Image container */}
      {bannerImages.map((img, index) => (
        <Box
          key={index}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          backgroundImage={`url(${img})`}
          backgroundSize="cover"
          backgroundPosition="center"
          opacity={index === currentIndex ? 1 : 0}
          transform={index === currentIndex ? "scale(1)" : "scale(1.1)"}
          transition="opacity 0.6s ease-in-out, transform 0.6s ease-in-out"
          zIndex={index === currentIndex ? 1 : 0}
        />
      ))}

      {/* Navigation buttons */}
      <Flex position="absolute" width="100%" height="100%" justify="space-between" align="center" px={4} zIndex={2}>
        <IconButton
          icon={BiChevronLeft}
          aria-label="Previous image"
          onClick={goToPrev}
          variant="ghost"
          color="white"
          size="lg"
          fontSize="3xl"
          opacity="0.7"
          _hover={{ opacity: 1, bg: "rgba(0,0,0,0.3)" }}
          isRound
          boxShadow="md"
          bg="rgba(0,0,0,0.2)"
        />
        <IconButton
          icon={BiChevronRight}
          aria-label="Next image"
          onClick={goToNext}
          variant="ghost"
          color="white"
          size="lg"
          fontSize="3xl"
          opacity="0.7"
          _hover={{ opacity: 1, bg: "rgba(0,0,0,0.3)" }}
          isRound
          boxShadow="md"
          bg="rgba(0,0,0,0.2)"
        />
      </Flex>

      {/* Indicators */}
      <Flex position="absolute" bottom="10px" width="100%" justify="center" zIndex={2}>
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            w="10px"
            h="10px"
            borderRadius="50%"
            bg={index === currentIndex ? "white" : "rgba(255,255,255,0.5)"}
            mx={1}
            cursor="pointer"
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true)
                setCurrentIndex(index)
                setTimeout(() => setIsTransitioning(false), 600)
              }
            }}
            transition="background-color 0.3s ease"
            _hover={{ bg: "rgba(255,255,255,0.8)" }}
          />
        ))}
      </Flex>
    </Box>
  )
}
