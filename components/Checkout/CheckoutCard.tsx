import React from 'react';
import {
  Stack, Icon, Heading, Text, Flex,
} from '@chakra-ui/react';

function CheckoutCard({ icon, title, text }) {
  return (
    <Stack
      direction="row"
      bg="gray.300"
      borderRadius={10}
      px={10}
      py={5}
      alignItems="center"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        borderRadius="full"
        bg="white"
        width={50}
        height={50}
        p={5}
        mx={5}
      >
        <Icon as={icon} height={6} width={6} />
      </Flex>
      <Stack>
        <Heading fontSize={18}>{title}</Heading>
        <Text>{text}</Text>
      </Stack>
    </Stack>
  );
}

export default CheckoutCard;
