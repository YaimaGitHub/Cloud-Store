import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/core";
import OrderItem from "./OrderItem";
import { useRecoilValue } from "recoil";
import { orderDetails } from "../../recoil/state";

function OrderDetails() {
  const { cartItems, subTotal, withDelivery, shippingCost, total } = useRecoilValue(orderDetails);

  return (
    <Box w={["100%", "90%", "46%", "35%"]} height="max-content" p="4" mx="2">
      <Heading as="h3" size="md" textAlign="center">
       Tu Pedido
      </Heading>

      <Flex direction="column" align="center" p="2" mt="4" overflowY="auto" w="100%" maxHeight="400px">
        {Object.values(cartItems).map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </Flex>

      <Divider my="2" />

      <Flex direction="column" p="2" w="100%">
        <Flex w="100%" justify="space-between" mb="3">
          <Text>Sub Total:</Text>
          <Text>$ {subTotal} CUP</Text>
        </Flex>

        <Flex w="100%" justify="space-between" mb="3">
          <Text>Tarifa de entrega ($500MN):</Text>
          <Text>$ {withDelivery ? shippingCost : "0"} CUP</Text>
        </Flex>

        <Flex w="100%" justify="space-between" mb="3">
          <Text fontSize="lg" fontWeight="medium">
            Total:
          </Text>
          <Text fontSize="lg" fontWeight="medium">
            $ {total} CUP
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default OrderDetails;
