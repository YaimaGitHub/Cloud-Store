import { Flex, Text, Box, Badge } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { selectedCurrency, currencyRates } from "../../recoil/state"
import { formatPrice } from "../../helpers"

export default function OrderItem({ item }) {
  const { qty, title, title1, price, offerPrice } = item
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)

  // Calculate item total in original currency
  const actualPrice = offerPrice || price
  const itemTotal = (actualPrice * qty).toFixed(2)

  // Convert to selected currency
  const convertedItemTotal = formatPrice(itemTotal, currency, rates)
  const convertedUnitPrice = formatPrice(actualPrice, currency, rates)

  return (
    <Box
      w="100%"
      mb="3"
      p="3"
      borderRadius="md"
      bg="white"
      boxShadow="0 1px 3px rgba(0,0,0,0.1)"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <Flex justify="space-between" align="center" mb="1">
        <Flex align="center">
          <Badge variantColor="blue" borderRadius="full" px="2" mr="2">
            {qty}
          </Badge>
          <Text fontWeight="medium" fontSize="sm">
            {title}
          </Text>
        </Flex>
        <Text fontWeight="bold" color="bluex.600">
          {convertedItemTotal} {currency}
        </Text>
      </Flex>

      {title1 && (
        <Text fontSize="xs" color="gray.500" ml="8">
          {title1}
        </Text>
      )}

      <Text fontSize="xs" color="gray.500" ml="8">
        Precio unitario: {convertedUnitPrice} {currency}
      </Text>
    </Box>
  )
}
