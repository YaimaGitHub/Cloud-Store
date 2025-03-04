import React from 'react';
import {
  Stack, Image, Heading, Link, Container, HStack, IconButton, Button, Drawer, DrawerOverlay, DrawerHeader, DrawerBody, DrawerContent, useDisclosure, Badge
} from '@chakra-ui/react';
import {
  FaBars, FaWindowClose, FaWhatsapp,
} from 'react-icons/fa';
import NextLink from 'next/link';

function Navbar({ categories, dolarPrice }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack display={['flex', 'flex', 'flex', 'none']} py={3} bg="white" pos="fixed" w="100%" zIndex={100}>
      <Container maxW="container.xl">
        <HStack justifyContent="space-between" alignItems="end">
          <Link href="/">
            <Image src="/images/gecomm-logo.png" px={3} alt="logo" />
          </Link>
          <Button onClick={onOpen} display={['flex', 'flex', 'flex', 'none']}><FaBars /></Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="lg">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader width="100%" borderBottomWidth="1px" justifyContent="end">
                <HStack width="100%" justifyContent="spacer-between" position="relative">
                  <Heading fontSize={20}>CATEGORÍAS</Heading>
                  <IconButton size="sm" position="absolute" right={0} onClick={onClose} alignSelf="end" justifySelf="end" aria-label="Close button" icon={<FaWindowClose />} />
                </HStack>
              </DrawerHeader>
              <DrawerBody>
                {categories.map((category) => <Stack gap={3} key={category}><NextLink href={`/#${encodeURI(category)}`}><Button onClick={onClose} my={3} colorScheme="blue">{category}</Button></NextLink></Stack>)}
                <Link href="https://api.whatsapp.com/send?phone=549444444&message" isExternal>
                  <Button mt={10} width="100%" colorScheme="green" leftIcon={<FaWhatsapp />}>Contactate</Button>
                </Link>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
        <Badge fontSize={11} bg="white" >Cotización del dólar: $ {dolarPrice}</Badge>
      </Container>
    </Stack>
  );
}

export default Navbar;
