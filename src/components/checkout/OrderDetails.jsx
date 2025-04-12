import { Box, Divider, Flex, Heading, Text, Badge } from "@chakra-ui/core"
import OrderItem from "./OrderItem"
import { useRecoilValue } from "recoil"
import { orderDetails, selectedCurrency, currencyRates } from "../../recoil/state"
import { formatPrice } from "../../helpers"

function OrderDetails() {
  const { cartItems, subTotal, deliveryLocation, deliveryFee, total } = useRecoilValue(orderDetails)
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)

  // Convert prices to selected currency
  const convertedSubTotal = formatPrice(subTotal, currency, rates)
  const convertedDeliveryFee = formatPrice(deliveryFee, currency, rates)
  const convertedTotal = formatPrice(total, currency, rates)

  return (
    <Box
      w={["100%", "90%", "46%", "35%"]}
      height="max-content"
      p="6"
      mx="2"
      bg="white"
      borderRadius="lg"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top="0" left="0" right="0" height="8px" bg="bluex.500" />

      <Heading as="h3" size="md" textAlign="center" mt="2" mb="4">
        Tu Pedido
      </Heading>

      <Flex
        direction="column"
        align="center"
        p="4"
        mt="2"
        overflowY="auto"
        w="100%"
        maxHeight="400px"
        bg="gray.50"
        borderRadius="md"
      >
        {Object.values(cartItems).map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </Flex>

      <Divider my="4" borderColor="gray.300" />

      <Box p="4" w="100%" bg="gray.50" borderRadius="md">
        <Flex w="100%" justify="space-between" mb="3" align="center">
          <Text fontWeight="medium" color="gray.600">
            Sub Total:
          </Text>
          <Text fontWeight="bold">
            {convertedSubTotal} {currency}
          </Text>
        </Flex>

        <Flex w="100%" justify="space-between" mb="3" align="center">
          <Flex align="center">
            <Text color="gray.600" mr="2">
              Tarifa de entrega:
            </Text>
            {deliveryLocation && (
              <Badge variantColor="blue" variant="subtle" fontSize="xs">
                {deliveryLocation}
              </Badge>
            )}
          </Flex>
          <Text fontWeight="bold">
            {convertedDeliveryFee} {currency}
          </Text>
        </Flex>

        <Divider my="3" borderColor="gray.300" />

        <Flex w="100%" justify="space-between" p="3" bg="bluex.500" color="white" borderRadius="md" mt="2">
          <Text fontSize="lg" fontWeight="bold">
            Total:
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {convertedTotal} {currency}
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default OrderDetails
