import React from 'react';
import {
  Stack, Text, Image, Divider, Heading, Badge
} from '@chakra-ui/react';

function ProductCardAside({ product, dolarPrice }) {
  
  return (
    <Stack w="300px" h="100vh" bg="white" _hover={{ boxShadow: 'dark-lg' }} alignItems="center">
      {(product === '')
        ? <Badge py={2} fontSize={11} bg="gray.100" borderBottomRadius={10} px={5} >Cotización del dólar: $ {dolarPrice}</Badge>
        : (
          <Stack>
            <Badge alignSelf="center" py={2} fontSize={11} bg="gray.100" borderBottomRadius={10} px={5} >Cotización del dólar: $ {dolarPrice}</Badge>
            <Image src={product.image} objectFit="scale-down" alt={product.title} />
            <Divider />
            <Stack alignSelf="end" p={5} borderRadius={20}>
              <Heading color="gray.600" fontSize={15}>{product.title}</Heading>
              <Text color="gray.600" fontSize={15}>{product.description}</Text>
            </Stack>
          </Stack>
        )}

    </Stack>
  );
}

export default ProductCardAside;
