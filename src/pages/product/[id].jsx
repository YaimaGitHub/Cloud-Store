"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Spinner,
  useToast,
} from "@chakra-ui/core"
import Header from "../../components/commons/Header"
import Footer from "../../components/commons/Footer"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { refreshCart, selectedCurrency, currencyRates } from "../../recoil/state"
import data from "../../data"
import Link from "next/link"
import { formatPrice } from "../../helpers"

const ProductDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const setCart = useSetRecoilState(refreshCart)
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)
  const toast = useToast()

  useEffect(() => {
    if (id) {
      // Find product by ID
      const foundProduct = data.find((item) => item.id === id)
      setProduct(foundProduct)
      setLoading(false)
    }
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      setCart({ item: product, n: quantity })
      toast({
        title: "Producto agregado",
        description: `${quantity} ${product.title} agregado a la cesta`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      })
    }
  }

  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Flex justify="center" align="center" minH="60vh">
          <Spinner size="xl" color="bluex.500" />
        </Flex>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <Box textAlign="center" py={10} px={6} minH="60vh">
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Producto no encontrado
          </Heading>
          <Text color="gray.500">El producto que estás buscando no existe o ha sido eliminado.</Text>
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, bluex.400, bluex.500, bluex.600)"
            color="white"
            variant="solid"
            mt="24px"
            onClick={() => router.push("/")}
          >
            Volver a la tienda
          </Button>
        </Box>
        <Footer />
      </>
    )
  }

  // Convert prices to selected currency
  const convertedPrice = formatPrice(product.price, currency, rates)
  const convertedOfferPrice = product.offerPrice ? formatPrice(product.offerPrice, currency, rates) : null

  return (
    <>
      <Header />
      <Box bg="gray.100" minH="calc(100vh - 150px)" py={8}>
        <Box maxW="1200px" mx="auto" px={4}>
          <Breadcrumb separator=">" mb={6} color="bluex.500">
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                Inicio
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{product.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Flex direction={{ base: "column", md: "row" }} bg="white" shadow="md" rounded="lg" overflow="hidden">
            <Box w={{ base: "100%", md: "40%" }} p={6}>
              <Image
                src={`/images/${product.img}`}
                fallbackSrc="/images/productosinimagen.jpg"
                alt={product.title}
                w="100%"
                h="auto"
                objectFit="cover"
                rounded="md"
              />
            </Box>

            <Box w={{ base: "100%", md: "60%" }} p={6}>
              <Flex justify="space-between" align="start">
                <Box>
                  <Heading as="h1" size="xl" mb={2}>
                    {product.title}
                  </Heading>
                  {product.title1 && (
                    <Text fontSize="lg" color="gray.600" mb={4}>
                      {product.title1}
                    </Text>
                  )}
                </Box>
                {product.offerPrice && (
                  <Badge colorScheme="red" variant="solid" p={2} fontSize="md">
                    Promoción
                  </Badge>
                )}
              </Flex>

              <Box my={6}>
                <Flex align="baseline" mt={2}>
                  {product.offerPrice ? (
                    <>
                      <Text fontSize="3xl" fontWeight="bold" color="bluex.600">
                        {convertedOfferPrice} {currency}
                      </Text>
                      <Text fontSize="xl" color="gray.500" textDecoration="line-through" ml={2}>
                        {convertedPrice} {currency}
                      </Text>
                      <Badge colorScheme="green" ml={2} fontSize="md">
                        {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% descuento
                      </Badge>
                    </>
                  ) : (
                    <Text fontSize="3xl" fontWeight="bold" color="bluex.600">
                      {convertedPrice} {currency}
                    </Text>
                  )}
                </Flex>
                <Text mt={2} color={product.stock > 0 ? "green.500" : "red.500"} fontWeight="medium">
                  {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Agotado"}
                </Text>
              </Box>

              <Box my={6}>
                <Text fontSize="lg" fontWeight="medium" mb={2}>
                  Cantidad:
                </Text>
                <Flex align="center" maxW="200px">
                  <Button onClick={decrementQuantity} disabled={quantity <= 1} size="md">
                    -
                  </Button>
                  <Text mx={4} fontSize="xl" fontWeight="bold">
                    {quantity}
                  </Text>
                  <Button onClick={incrementQuantity} disabled={quantity >= product.stock} size="md">
                    +
                  </Button>
                </Flex>
              </Box>

              <Flex mt={8} direction={{ base: "column", sm: "row" }} gap={4}>
                <Button
                  onClick={handleAddToCart}
                  colorScheme="teal"
                  size="lg"
                  w={{ base: "100%", sm: "auto" }}
                  bg="bluex.500"
                  _hover={{ bg: "bluex.600" }}
                  disabled={product.stock <= 0}
                >
                  Añadir a la cesta
                </Button>
                <Button
                  colorScheme="gray"
                  size="lg"
                  w={{ base: "100%", sm: "auto" }}
                  variant="outline"
                  onClick={() => router.push("/checkout")}
                >
                  Comprar ahora
                </Button>
              </Flex>
            </Box>
          </Flex>

          <Box mt={8} bg="white" shadow="md" rounded="lg" p={6}>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab _selected={{ color: "white", bg: "bluex.500" }}>Descripción</Tab>
                <Tab _selected={{ color: "white", bg: "bluex.500" }}>Especificaciones</Tab>
                <Tab _selected={{ color: "white", bg: "bluex.500" }}>Reseñas</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Text fontSize="lg">
                    {product.description || "No hay descripción disponible para este producto."}
                  </Text>
                </TabPanel>
                <TabPanel>
                  <Box>
                    <Flex borderBottom="1px" borderColor="gray.200" py={3}>
                      <Text fontWeight="bold" w="40%">
                        Categoría
                      </Text>
                      <Text w="60%">{product.category}</Text>
                    </Flex>
                    <Flex borderBottom="1px" borderColor="gray.200" py={3}>
                      <Text fontWeight="bold" w="40%">
                        ID del Producto
                      </Text>
                      <Text w="60%">{product.id}</Text>
                    </Flex>
                    <Flex borderBottom="1px" borderColor="gray.200" py={3}>
                      <Text fontWeight="bold" w="40%">
                        Disponibilidad
                      </Text>
                      <Text w="60%">{product.stock} unidades</Text>
                    </Flex>
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Text fontSize="lg" textAlign="center" py={4}>
                    No hay reseñas disponibles para este producto.
                  </Text>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default ProductDetail
