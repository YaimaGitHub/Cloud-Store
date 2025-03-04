import React from 'react';
import {
  Stack, Text, Heading, Icon, Button, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Box, Flex, Link, useClipboard, Badge, HStack, Divider,
} from '@chakra-ui/react';
import {
  FaMapMarkerAlt, FaTruck, FaUniversity, FaArrowLeft, FaDollarSign, FaUserCircle, FaRegCheckCircle, FaWhatsapp,
} from 'react-icons/fa';
import { useRouter } from 'next/router';
import CheckoutCard from '../components/Checkout/CheckoutCard';
import api from '../components/Checkout/api';
import CartItem from '../components/OrderList/CartItem';
import CheckoutStep from '../components/Checkout/CheckoutSteps';
import EmptyCart from '../components/Checkout/EmptyCart';
import NavbarCheckout from '../components/ui/NavbarCheckout';
import parseCurrency from '../components/product/parseCurrency';
import ProductPriceAR from '../components/product/ProductPriceAR';

const uniqueID = String(Date.now());
const transactionDate = new Date().toISOString().slice(0, 10);

function Checkout({
  cart, clientInfo, dolarPrice, handleAddToCart, handleRemoveFromCart, chat_id,
}) {
  const subtotalPrice = ((items) => items.reduce((counter, item) => counter + item.amount * item.price, 0));
  const subtotalIVA = ((items) => items.reduce((counter, item) => ((counter + (item.amount * item.price) * (item.iva / 100))), 0));
  const totalPrice = ((items) => items.reduce((counter, item) => ((counter + item.amount * item.price + (item.amount * item.price) * (item.iva / 100))), 0));
  const totalAR = Math.trunc(ProductPriceAR(totalPrice(cart), dolarPrice))

  const { isOpen, onOpen, onClose } = useDisclosure();
  const CBU = '0170418540000032181234';
  const alias = 'ALIAS.ALIAS.ALIAS';
  const { hasCopied, onCopy } = useClipboard(CBU);
  const router = useRouter();

  const text = cart.reduce((message, product) => message.concat(`* ${product.title} - x${product.amount}\n`), '').concat(`\nTotal: ${parseCurrency(totalAR)}`).concat(`\nCliente: ${clientInfo.name}\nCódigo: ${uniqueID}\nFecha: ${transactionDate}\nEmpresa: ${clientInfo.company}\nCuit: ${clientInfo.cuit}\nEmail: ${clientInfo.email}\nWhatsapp: ${clientInfo.whatsapp}\nDirección: ${clientInfo.address}\nProvincia: ${clientInfo.province}\nCiudad: ${clientInfo.city}\nCódigo Postal: ${clientInfo.zipCode}`);

  const confirmPurchase = () => {
    api.message(chat_id, text);
    api.postDB(clientInfo, transactionDate, uniqueID);
    onOpen();
  };

  return (
    <Stack alignItems="center" bg="gray.100" minH="100vh">
      <NavbarCheckout />
      {(totalAR > 0)
        ? (
          <Box>
            <CheckoutStep value="100" />
            <Stack mt={['80px', '80px', '30px', '30px']} direction={['column', 'column', 'row', 'row']} spacing={10}>
              <Stack>
                <Heading fontSize={25}>Revisá y confirmá tu compra</Heading>
                <Stack>
                  <Heading fontSize={20}>Detalle de entrega</Heading>
                  {clientInfo.shipping === true
                    ? (
                      <CheckoutCard
                        icon={FaTruck}
                        title="Envío a domicilio"
                        text="Flete pago en destino"
                      />
                    )
                    : (
                      <CheckoutCard
                        icon={FaTruck}
                        title="Retiro en el local"
                        text=""
                      />
                    )}
                  {clientInfo.shipping === true
                    ? (
                      <CheckoutCard
                        icon={FaMapMarkerAlt}
                        title={clientInfo.address}
                        text={`${clientInfo.zipCode} - ${clientInfo.province} - ${clientInfo.city}`}
                      />
                    )
                    : (
                      <CheckoutCard
                        icon={FaMapMarkerAlt}
                        title="Calle 1234"
                        text="Santa Fe Capital"
                      />
                    )}
                </Stack>
                <Heading fontSize={20}>Forma de pago</Heading>
                <CheckoutCard
                  icon={FaUniversity}
                  title="Transferencia bancaria"
                  text=""
                />
              </Stack>
              <Stack bg="gray.300" p={5} borderRadius={10}>
                <Heading fontSize={15}>Productos</Heading>
                {cart.map((product) => <CartItem key={product.title} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} item={product} />)}
                <Stack alignItems="end">
                  <Heading color="gray.500" fontSize={15}>
                    Subtotal: US
                    {parseCurrency(subtotalPrice(cart))}
                  </Heading>
                  <Heading color="gray.500" fontSize={15}>
                    IVA: US
                    {parseCurrency(subtotalIVA(cart))}
                  </Heading>
                  <Heading color="gray.500" fontSize={15}>
                    Total: US
                    {parseCurrency(totalPrice(cart))}
                  </Heading>
                  <Heading color="gray.500" fontSize={15}>
                    Cotización del dólar: $
                    {dolarPrice}
                  </Heading>
                  <Heading fontSize={15}>
                    Equivalente en AR
                    {parseCurrency(totalAR)}
                  </Heading>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-around" py={10}>
              <Button onClick={() => router.push('/UserForm')} colorScheme="blue" px={5} size="lg">
                <Icon as={FaArrowLeft} me={3} />
                Volver
              </Button>
              <Button colorScheme="green" px={10} size="lg" onClick={confirmPurchase}>Confirmar compra</Button>
              <Modal closeOnEsc={false} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded="20">
                  <Icon mt={20} alignSelf="center" h={12} w={12} color="green.300" as={FaRegCheckCircle} />
                  <ModalHeader alignSelf="center" roundedTop={20}>Pedido realizado</ModalHeader>
                  <ModalBody roundedBottom={20} pb={6}>
                    <Stack width="100%">
                      <Text>Recibimos su pedido exitosamente</Text>
                      <Flex align="center">
                        <Text me={2}>El código de referencia es:</Text>
                        <Heading fontSize={15}>{uniqueID}</Heading>
                      </Flex>
                      <Stack width="100%" direction="row" align="center">
                        <Icon w={10} h={10} bg="gray.200" p={2} borderRadius="full" as={FaDollarSign} />
                        <Text>Solo te falta pagar</Text>
                        <Badge alignSelf="end" p={2} rounded={10} fontSize="md">{parseCurrency(totalAR)}</Badge>
                      </Stack>
                      <Divider />
                      <HStack>
                        <Icon h={6} w={6} color="gray.400" as={FaUserCircle} />
                        <Heading fontSize={15}>Datos del vendedor</Heading>
                      </HStack>
                      <HStack justifyContent="space-around" alignItems="center" mb={2}>
                        <Stack direction="row" alignItems="center">
                          <Stack>
                            <HStack>
                              <HStack w="100%">
                                <Text me={2}>CBU Nro:</Text>
                                <Button borderRadius="full" size="sm" onClick={onCopy} ml={2}>
                                  {hasCopied ? 'Copiado' : 'Copiar'}
                                </Button>
                                <Badge p={2} rounded={10} fontSize="md">{CBU}</Badge>
                              </HStack>
                            </HStack>
                            <HStack>
                              <Text me={2}>CBU alias:</Text>
                              <Badge fontSize={15} rounded={10} alignSelf="center" fontWeight={500} me={2}>{alias}</Badge>
                            </HStack>
                            <Divider />
                            <Badge alignSelf="center" justifySelf="center" fontSize={15} rounded={10} fontWeight={500} me={2}>(caja de ahorro BBVA)</Badge>
                          </Stack>
                        </Stack>
                      </HStack>
                      <Flex alignItems="center" justifyContent="space-between" mb={2}>
                        <Text me={2}>A nombre de:</Text>
                        <Badge p={2} rounded={10} fontSize="md">Jose Argento</Badge>
                      </Flex>
                      {clientInfo.shipping === false
                        ? (
                          <Stack>
                            <Flex alignItems="center" justifyContent="space-between">
                              <Text>Dirección:</Text>
                              <Badge p={2} rounded={10} fontSize="md">Calle 1234 - Santa Fe Capital</Badge>
                            </Flex>

                          </Stack>
                        )
                        : ''}
                      <Link _hover={{textDecoration:"none"}} pt={10} alignSelf="center" href="https://api.whatsapp.com/send?phone=549444444&message" isExternal>
                        <Button aria-label="whatsapp" colorScheme="green" leftIcon={<FaWhatsapp />}>Consultanos para coordinar</Button>
                      </Link>
                      <Text pt={10} alignSelf="center">¡Muchas gracias por confiar en Gecomm!</Text>
                      <Link alignSelf="center" _hover={{textDecoration: "none"}} href='/'>
                        <Button variant="outline" colorScheme="blue">Volver a la tienda</Button>
                      </Link>
                    </Stack>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </Stack>
          </Box>
        )
        : <EmptyCart />}

    </Stack>
  );
}
export const getStaticProps = async () => {
  const dolarPrice = await api.dolarBlue();
  /* const dolarPrice = await api.dolarMock(); */
  const chat_id = 1367188448;

  return {
    props: {
      dolarPrice,
      chat_id,
    },
  };
};

export default Checkout;