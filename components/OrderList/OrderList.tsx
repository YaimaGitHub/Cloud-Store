import {
  Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading,
  HStack, Icon, Stack, useDisclosure, VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import parseCurrency from '../product/parseCurrency';
import Cart from './Cart';
import ProductPriceAR from '../product/ProductPriceAR';

function OrderList({ cart, handleRemoveFromCart, handleAddToCart, dolarPrice }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const getTotalItems = ((items) => items.reduce((counter, item) => counter + item.amount, 0));
  const subtotalPrice = ((items) => items.reduce((counter, item) => counter + item.amount * item.price, 0));
  const subtotalIVA = ((items) => items.reduce((counter, item) => ((counter + (item.amount * item.price) * (item.iva / 100))), 0));
  const totalPrice = ((items) => items.reduce((counter, item) => ((counter + item.amount * item.price + (item.amount * item.price) * (item.iva / 100))), 0));

  return (
    <Flex>
      <VStack width="100vw">
        <Button top={['85vh', '85vh', '85vh', '90vh']} position="absolute" ref={btnRef} colorScheme="teal" px={8} onClick={onOpen}>
          <Icon as={FaShoppingCart} me={5} />
          Tu pedido (
          {getTotalItems(cart)}
          )
        </Button>
      </VStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader alignSelf="center">
            Pedido (
            {getTotalItems(cart)}
            )
          </DrawerHeader>
          <DrawerBody>
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
            />
          </DrawerBody>
          <Divider />
          <DrawerFooter justifyContent="center" flexDirection="column">
            <Stack my={3} spacing={4} width="100%">
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.6}>Subtotal:</Heading>
                <Heading fontSize={18} opacity={0.6}>
                  US
                  {parseCurrency(subtotalPrice(cart))}
                </Heading>
              </HStack>
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.6}>IVA:</Heading>
                <Heading fontSize={18} opacity={0.6}>
                  US
                  {parseCurrency(subtotalIVA(cart))}
                </Heading>
              </HStack>
              <Divider />
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18} opacity={0.5}>Total:</Heading>
                <Heading fontSize={18} opacity={0.5}>
                  US
                  {parseCurrency(totalPrice(cart))}
                </Heading>
              </HStack>
              <HStack width="100%" justifyContent="space-between">
                <Heading fontSize={18}>Total:</Heading>
                <Heading fontSize={18}>
                  AR
                  {parseCurrency(Math.trunc(ProductPriceAR(totalPrice(cart), dolarPrice)))}
                </Heading>
              </HStack>
            </Stack>
            <Link href="/UserForm" passHref>
              <Button width="100%" colorScheme="green">Completar pedido</Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default OrderList;