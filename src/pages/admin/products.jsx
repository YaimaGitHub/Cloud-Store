"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
  useToast,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/core"
import Header from "../../components/commons/Header"
import Footer from "../../components/commons/Footer"
import data from "../../data"

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [currentProduct, setCurrentProduct] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  // Get unique categories
  const categories = [...new Set(data.map((product) => product.category))]

  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(data)
    setFilteredProducts(data)
  }, [])

  useEffect(() => {
    let results = products

    if (searchTerm) {
      results = results.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (categoryFilter) {
      results = results.filter((product) => product.category === categoryFilter)
    }

    setFilteredProducts(results)
  }, [searchTerm, categoryFilter, products])

  const handleEdit = (product) => {
    setCurrentProduct({ ...product })
    onOpen()
  }

  const handleDelete = (id) => {
    // In a real app, this would be an API call
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)

    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSave = () => {
    // In a real app, this would be an API call
    const updatedProducts = products.map((product) => (product.id === currentProduct.id ? currentProduct : product))

    setProducts(updatedProducts)
    onClose()

    toast({
      title: "Producto actualizado",
      description: "Los cambios han sido guardados correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleAddNew = () => {
    const newId = `new-${Date.now()}`
    setCurrentProduct({
      id: newId,
      title: "",
      title1: "",
      price: 0,
      offerPrice: null,
      stock: 0,
      img: "",
      category: categories[0],
    })
    onOpen()
  }

  const handleCreateNew = () => {
    // In a real app, this would be an API call
    setProducts([...products, currentProduct])
    onClose()

    toast({
      title: "Producto creado",
      description: "El nuevo producto ha sido creado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  }

  const handleNumberChange = (name, value) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  }

  return (
    <>
      <Header />
      <Box bg="gray.100" minH="calc(100vh - 150px)" py={8}>
        <Box maxW="1200px" mx="auto" px={4}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="xl">
              Administrar Productos
            </Heading>
            <Button onClick={handleAddNew} bg="bluex.500" color="white" _hover={{ bg: "bluex.600" }}>
              Añadir Nuevo Producto
            </Button>
          </Flex>

          <Flex mb={6} direction={{ base: "column", md: "row" }} gap={4}>
            <InputGroup>
              <InputLeftElement children={<Box as="i" className="fas fa-search" color="gray.300" />} />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
              />
            </InputGroup>

            <Select
              placeholder="Filtrar por categoría"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              bg="white"
              maxW={{ base: "100%", md: "300px" }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </Flex>

          <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
            <Box overflowX="auto">
              <Table variant="simple">
                <Thead bg="bluex.500">
                  <Tr>
                    <Th color="white">Imagen</Th>
                    <Th color="white">ID</Th>
                    <Th color="white">Nombre</Th>
                    <Th color="white">Categoría</Th>
                    <Th color="white">Precio</Th>
                    <Th color="white">Stock</Th>
                    <Th color="white">Estado</Th>
                    <Th color="white">Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredProducts.map((product) => (
                    <Tr key={product.id}>
                      <Td>
                        <Image
                          src={`/images/${product.img}`}
                          fallbackSrc="/images/productosinimagen.jpg"
                          alt={product.title}
                          boxSize="50px"
                          objectFit="cover"
                        />
                      </Td>
                      <Td>{product.id}</Td>
                      <Td>{product.title}</Td>
                      <Td>{product.category}</Td>
                      <Td>
                        {product.offerPrice ? (
                          <Flex direction="column">
                            <Text as="span" fontWeight="bold">
                              ${product.offerPrice}
                            </Text>
                            <Text as="span" textDecoration="line-through" fontSize="sm" color="gray.500">
                              ${product.price}
                            </Text>
                          </Flex>
                        ) : (
                          <Text>${product.price}</Text>
                        )}
                      </Td>
                      <Td>{product.stock}</Td>
                      <Td>
                        <Badge colorScheme={product.stock > 0 ? "green" : "red"}>
                          {product.stock > 0 ? "En stock" : "Agotado"}
                        </Badge>
                      </Td>
                      <Td>
                        <Flex>
                          <IconButton
                            icon="edit"
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => handleEdit(product)}
                            mr={2}
                          />
                          <IconButton
                            icon="delete"
                            variant="ghost"
                            colorScheme="red"
                            onClick={() => handleDelete(product.id)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Edit/Add Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currentProduct && currentProduct.id.startsWith("new-") ? "Añadir Producto" : "Editar Producto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>ID del Producto</FormLabel>
              <Input
                name="id"
                value={currentProduct?.id || ""}
                onChange={handleInputChange}
                isReadOnly={!currentProduct?.id.startsWith("new-")}
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Nombre del Producto</FormLabel>
              <Input name="title" value={currentProduct?.title || ""} onChange={handleInputChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Descripción Adicional (opcional)</FormLabel>
              <Input name="title1" value={currentProduct?.title1 || ""} onChange={handleInputChange} />
            </FormControl>

            <Flex mb={4} gap={4}>
              <FormControl>
                <FormLabel>Precio Regular</FormLabel>
                <NumberInput
                  min={0}
                  value={currentProduct?.price || 0}
                  onChange={(value) => handleNumberChange("price", Number.parseFloat(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Precio de Oferta (opcional)</FormLabel>
                <NumberInput
                  min={0}
                  value={currentProduct?.offerPrice || ""}
                  onChange={(value) => handleNumberChange("offerPrice", value ? Number.parseFloat(value) : null)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <Flex mb={4} gap={4}>
              <FormControl>
                <FormLabel>Categoría</FormLabel>
                <Select name="category" value={currentProduct?.category || ""} onChange={handleInputChange}>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Stock</FormLabel>
                <NumberInput
                  min={0}
                  value={currentProduct?.stock || 0}
                  onChange={(value) => handleNumberChange("stock", Number.parseInt(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>

            <FormControl mb={4}>
              <FormLabel>Ruta de la Imagen</FormLabel>
              <Input
                name="img"
                value={currentProduct?.img || ""}
                onChange={handleInputChange}
                placeholder="ej: categoria/nombre-producto.jpg"
              />
            </FormControl>

            {currentProduct?.img && (
              <Box mt={4} textAlign="center">
                <Text mb={2}>Vista previa:</Text>
                <Image
                  src={`/images/${currentProduct.img}`}
                  fallbackSrc="/images/productosinimagen.jpg"
                  alt={currentProduct.title}
                  maxH="200px"
                  mx="auto"
                />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bg="bluex.500"
              color="white"
              _hover={{ bg: "bluex.600" }}
              onClick={currentProduct?.id.startsWith("new-") ? handleCreateNew : handleSave}
            >
              {currentProduct?.id.startsWith("new-") ? "Crear" : "Guardar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </>
  )
}

export default AdminProducts
