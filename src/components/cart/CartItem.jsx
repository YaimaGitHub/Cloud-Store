"use client"

import { Box, CloseButton, Flex, Image, Text } from "@chakra-ui/core"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { refreshCart, selectedCurrency, currencyRates } from "../../recoil/state"
import CounterBtn from "../others/CounterBtn"
import { formatPrice } from "../../helpers"
import { useState, useEffect } from "react"

export default function CartItem({ item }) {
  const { title, title1, price, offerPrice, img, qty } = item
  const setCart = useSetRecoilState(refreshCart)
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)
  const [isRemoving, setIsRemoving] = useState(false)
  const [isNew, setIsNew] = useState(true)

  // Convert prices to selected currency
  const convertedPrice = formatPrice(price, currency, rates)
  const convertedOfferPrice = offerPrice ? formatPrice(offerPrice, currency, rates) : null

  // Calculate item total in selected currency
  const actualPrice = offerPrice || price
  const convertedActualPrice = offerPrice ? convertedOfferPrice : convertedPrice
  const itemTotal = (actualPrice * qty).toFixed(2)
  const convertedItemTotal = formatPrice(itemTotal, currency, rates)

  // Handle entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Handle removal with animation
  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      setCart({ item, n: 0 })
    }, 300)
  }

  return (
    <Flex
      w="100%"
      justify="flex-start"
      align="center"
      position="relative"
      borderTop="1px solid black"
      py="2"
      opacity={isRemoving ? 0 : 1}
      transform={isRemoving ? "translateX(100%)" : isNew ? "translateX(-20px)" : "translateX(0)"}
      transition="all 0.3s ease-in-out"
      bg={isNew ? "rgba(0, 128, 128, 0.05)" : "transparent"}
    >
      <Box w="100px" h="100px" mr="2" overflow="hidden" borderRadius="md">
        <Image
          size="100%"
          objectFit="cover"
          src={`/images/${img}`}
          fallbackSrc="/images/productosinimagen.jpg"
          alt=""
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
      </Box>

      <Box w="80%">
        <Text w="85%" fontSize="sm" fontWeight="medium" transition="color 0.2s ease" _hover={{ color: "bluex.500" }}>
          {title}
        </Text>

        <Text fontSize="sm">
          Precio unitario: {convertedActualPrice} {currency}
        </Text>

        <CounterBtn type="cart" item={item} />
      </Box>

      <Text fontSize="lg" fontWeight="medium" position="absolute" bottom="10px" right="12px" color="bluex.600">
        {convertedItemTotal} {currency}
      </Text>

      <CloseButton
        size="sm"
        position="absolute"
        top="10px"
        right="12px"
        onClick={handleRemove}
        _hover={{
          bg: "red.100",
          color: "red.500",
          transform: "rotate(90deg)",
        }}
        transition="all 0.2s ease"
      />
    </Flex>
  )
}
