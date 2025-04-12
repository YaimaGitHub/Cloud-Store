"use client"

import { useState, useEffect, useCallback } from "react"
import { Box, Flex, IconButton } from "@chakra-ui/core"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

// Banner images - you can replace these with your actual images
const bannerImages = ["/images/logo9.jpg", "/images/5-plataformas-comerciales.jpg", "/images/concepto-compras.jpg", "/images/bcbb835fd17d9cfc10352f74cf4e4037.webp"]

export default function SlideShowBanner({ interval = 5000 }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Function to go to the next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
  }, [])

  // Function to go to the previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1))
  }, [])

  // Function to go to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Set up automatic slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    // Clean up the timer when component unmounts
    return () => clearInterval(timer)
  }, [interval, nextSlide])

  return (
    <Box
      w="100%"
      h={["150px", "200px", "250px", "300px"]}
      position="relative"
      overflow="hidden"
      borderRadius="md"
      boxShadow="lg"
    >
      {/* Slides */}
      {bannerImages.map((img, index) => (
        <Box
          key={index}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 0.8s ease-in-out"
          zIndex={index === currentSlide ? 1 : 0}
          bgImage={`url(${img})`}
          bgSize="cover"
          bgPosition="center"
        />
      ))}

      {/* Navigation arrows */}
      <IconButton
        icon={() => <Box as={BiChevronLeft} size="40px" />}
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="rgba(255, 255, 255, 0.7)"
        _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
        onClick={prevSlide}
        borderRadius="full"
        aria-label="Previous slide"
      />

      <IconButton
        icon={() => <Box as={BiChevronRight} size="40px" />}
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex="2"
        bg="rgba(255, 255, 255, 0.7)"
        _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
        onClick={nextSlide}
        borderRadius="full"
        aria-label="Next slide"
      />

      {/* Slide indicators */}
      <Flex position="absolute" bottom="10px" left="50%" transform="translateX(-50%)" zIndex="2" gap="2">
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            w="10px"
            h="10px"
            borderRadius="full"
            bg={index === currentSlide ? "white" : "rgba(255, 255, 255, 0.5)"}
            cursor="pointer"
            onClick={() => goToSlide(index)}
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.2)" }}
          />
        ))}
      </Flex>
    </Box>
  )
}
