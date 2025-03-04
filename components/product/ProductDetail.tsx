import React from 'react';
import {
  Heading, Stack, Text, Image, Divider,
} from '@chakra-ui/react';
import Link from 'next/link';

function ProductDetail({ product }) {
  return (
    <Stack bg="gray.100" _hover={{ boxShadow: 'dark-lg' }}>
      <Link href={`/product/${product.id}`}>
        <a>
          <Image src={product.image} h={300} w={300} objectFit="cover" alt={product.title} />
          <Divider />
          <Stack p={5}>
            <Heading fontSize={22} fontWeight={600}>{product.price}</Heading>
            <Text color="gray.600" fontSize={15}>{product.title}</Text>
          </Stack>
        </a>
      </Link>
    </Stack>
  );
}

export default ProductDetail;
