"use client"

import { Select, Flex, Text } from "@chakra-ui/core"
import { useRecoilState } from "recoil"
import { selectedCurrency } from "../../recoil/state"

export default function CurrencySelector() {
  const [currency, setCurrency] = useRecoilState(selectedCurrency)

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
  }

  return (
    <Flex align="center">
      <Text mr={2} fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>
        Moneda:
      </Text>
      <Select
        value={currency}
        onChange={handleCurrencyChange}
        size="sm"
        width={{ base: "80px", md: "100px" }}
        bg="white"
        borderColor="bluex.500"
      >
        <option value="CUP">CUP</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="MLC">MLC</option>
      </Select>
    </Flex>
  )
}
