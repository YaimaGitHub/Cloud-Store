"use client"

import { Flex, Text, Icon } from "@chakra-ui/core"
import { useEffect, useState } from "react"

export default function StockChangeIndicator({ change, action }) {
  const [isVisible, setIsVisible] = useState(true)

  // Auto-hide after 5 seconds
  useEffect(() => {
    if (change) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [change])

  if (!change || !isVisible) return null

  const isDecrease = action === "added_to_cart"

  return (
    <Flex
      position="absolute"
      top="10px"
      right="10px"
      bg={isDecrease ? "rgba(255, 86, 48, 0.9)" : "rgba(82, 196, 26, 0.9)"}
      color="white"
      px="3"
      py="2"
      borderRadius="md"
      alignItems="center"
      zIndex="10"
      boxShadow="md"
      animation="fadeIn 0.3s ease-in-out"
      opacity="0.9"
    >
      <Icon name={isDecrease ? "minus" : "add"} mr="1" />
      <Text fontWeight="bold">
        {isDecrease ? "-" : "+"}
        {Math.abs(change)}
      </Text>
    </Flex>
  )
}
