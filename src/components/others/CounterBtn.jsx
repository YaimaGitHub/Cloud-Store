"use client"

import { Button, Flex, IconButton, Text } from "@chakra-ui/core"
import { useSetRecoilState } from "recoil"
import { refreshCart } from "../../recoil/state"
import { useState } from "react"

export default function CounterBtn({ type = "default", counter = 0, item }) {
  const setCart = useSetRecoilState(refreshCart)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleIncrement = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCart({ item, n: type === "cart" ? item.qty + 1 : counter + 1 })
      setIsAnimating(false)
    }, 150)
  }

  const handleDecrement = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setCart({ item, n: type === "cart" ? item.qty - 1 : counter - 1 })
      setIsAnimating(false)
    }, 150)
  }

  //button for cart item (item provided for cart state)
  if (type === "cart") {
    return (
      <Flex
        w="100px"
        bg="bluex.600"
        justify="space-between"
        align="center"
        rounded="md"
        overflow="hidden"
        mt="2"
        position="relative"
        boxShadow="0 2px 4px rgba(0,0,0,0.1)"
      >
        <IconButton
          variantColor="bluex"
          icon="minus"
          size="sm"
          onClick={handleDecrement}
          _hover={{ bg: "bluex.700" }}
          transition="all 0.2s"
        />

        <Text
          fontSize="sm"
          fontWeight="medium"
          color="white"
          position="relative"
          className={isAnimating ? "pulse" : ""}
          style={{
            animation: isAnimating ? "pulse 0.3s ease-in-out" : "none",
          }}
        >
          {item.qty}
        </Text>

        <IconButton
          variantColor="bluex"
          icon="add"
          size="sm"
          onClick={handleIncrement}
          _hover={{ bg: "bluex.700" }}
          transition="all 0.2s"
        />
      </Flex>
    )
  }

  //buttons for main item card(item provided for items state)
  return (
    <>
      {counter < 1 ? (
        <Button
          variantColor="teal"
          size="sm"
          onClick={() => setCart({ item, n: 1 })}
          bg="bluex.500"
          color="white"
          _hover={{ bg: "bluex.600", transform: "translateY(-2px)" }}
          _active={{ transform: "translateY(0)" }}
          transition="all 0.2s"
          boxShadow="0 2px 4px rgba(0,0,0,0.1)"
        >
          Añadir
        </Button>
      ) : (
        <Flex
          w="80px"
          bg="gray.200"
          justify="space-between"
          align="center"
          rounded="md"
          overflow="hidden"
          boxShadow="0 1px 3px rgba(0,0,0,0.1)"
        >
          <IconButton
            variantColor="bluex"
            icon="minus"
            size="xs"
            onClick={handleDecrement}
            _hover={{ bg: "red.100" }}
            transition="all 0.2s"
          />

          <Text
            fontSize="sm"
            fontWeight="medium"
            position="relative"
            className={isAnimating ? "pulse" : ""}
            style={{
              animation: isAnimating ? "pulse 0.3s ease-in-out" : "none",
            }}
          >
            {counter}
          </Text>

          <IconButton
            variantColor="bluex"
            icon="add"
            size="xs"
            onClick={handleIncrement}
            _hover={{ bg: "green.100" }}
            transition="all 0.2s"
          />
        </Flex>
      )}
    </>
  )
}
