"use client"

import { Box, Button, Text, Flex } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { cartTotal, selectedCurrency, currencyRates } from "../../recoil/state"
import { useRouter } from "next/router"
import { formatPrice } from "../../helpers"

function CartFooter() {
  const router = useRouter()
  const subTotal = useRecoilValue(cartTotal)
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)

  // Convert subtotal to selected currency
  const convertedSubTotal = formatPrice(subTotal, currency, rates)

  return (
    <Box
      w="100%"
      bg="white"
      py="6"
      position="absolute"
      bottom="0"
      right="0"
      px="4"
      borderTop="1px solid"
      borderColor="gray.200"
      boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.05)"
    >
      <Flex justify="space-between" align="center" mb="4" p="3" bg="gray.50" borderRadius="md">
        <Text fontSize="lg" fontWeight="medium">
          Sub Total:
        </Text>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="bluex.600"
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            bottom: "-4px",
            left: "0",
            width: "100%",
            height: "2px",
            background: "bluex.400",
            borderRadius: "2px",
          }}
        >
          {convertedSubTotal} {currency}
        </Text>
      </Flex>
      <Button
        onClick={() => router.push("/checkout")}
        w="100%"
        variantColor="bluex"
        size="lg"
        disabled={!subTotal}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        transition="all 0.2s"
      >
        Verificar la orden de compra
      </Button>
    </Box>
  )
}

export default CartFooter
