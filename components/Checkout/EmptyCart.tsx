import React from 'react';
import {
  Stack, Image, Link, Button, Heading, Text,
} from '@chakra-ui/react';

function EmptyCart() {
  return (
    <Stack alignItems="center" pt={100}>
      <Image blendMode="hard-light" h={{ base: '150px', sm: '300px' }} w={{ base: '150px', sm: '300px' }} src="/images/emptyCart.png" alt="empty cart" />
      <Heading>Tu carrito está vacío</Heading>
      <Text>Parece que no tienes productos en tu carrito.</Text>
      <Link _hover={{textDecoration: "none"}} href="/">
        <Button borderRadius="full" colorScheme="teal" px={20}>AÑADIR PRODUCTOS</Button>
      </Link>
    </Stack>
  );
}

export default EmptyCart;
