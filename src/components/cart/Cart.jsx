"use client"

import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, Heading, Box, Text } from "@chakra-ui/core"
import CartFooter from "./CartFooter"
import CartList from "./CartList"
import { useRecoilValue } from "recoil"
import { cartLength } from "../../recoil/state"

const Cart = ({ showCart = false, setCart }) => {
  const itemsCount = useRecoilValue(cartLength)

  return (
    <Drawer isOpen={showCart} onClose={() => setCart(false)} placement="right" size="md">
      <DrawerOverlay />

      <DrawerContent p="4">
        <Flex
          justify="space-between"
          align="center"
          w="100%"
          mb="4"
          pb="3"
          borderBottom="2px solid"
          borderColor="bluex.500"
        >
          <Flex direction="column">
            <Heading as="h2" size="xl">
              Productos en la cesta
            </Heading>
            <Flex align="center" mt="1">
              <Box
                as="span"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                bg="bluex.500"
                color="white"
                borderRadius="full"
                w="6"
                h="6"
                mr="2"
                fontSize="sm"
                fontWeight="bold"
              >
                {itemsCount}
              </Box>
              <Text color="gray.600">{itemsCount === 1 ? "producto" : "productos"} en tu cesta</Text>
            </Flex>
          </Flex>
          <DrawerCloseButton
            size="lg"
            position="static"
            _hover={{
              bg: "gray.100",
              transform: "rotate(90deg)",
            }}
            transition="all 0.3s ease"
          />
        </Flex>

        <CartList />

        <CartFooter />
      </DrawerContent>
    </Drawer>
  )
}

export default Cart
