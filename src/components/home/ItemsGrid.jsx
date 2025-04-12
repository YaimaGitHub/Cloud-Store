"use client"

import { Alert, AlertDescription, AlertIcon, AlertTitle, Grid, Box, Flex, Button, Text, Select } from "@chakra-ui/core"
import ItemCard from "./ItemCard"
import { useRecoilValueLoadable, useRecoilState } from "recoil"
import { itemsList, itemsPerPage, currentPage } from "../../recoil/state"
import SkeletonGrid from "./SkeletonGrid"

export default function ItemsGrid() {
  const data = useRecoilValueLoadable(itemsList)
  const [perPage, setPerPage] = useRecoilState(itemsPerPage)
  const [page, setPage] = useRecoilState(currentPage)

  const handlePageChange = (newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePerPageChange = (e) => {
    setPerPage(Number.parseInt(e.target.value))
    setPage(1) // Reset to first page when changing items per page
  }

  if (data.state === "loading") return <SkeletonGrid />

  if (data.state === "hasError") {
    return (
      <Alert
        status="error"
        variant="solid"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
        mt="80px"
        mx="auto"
        w={["100%", "80%"]}
      >
        <AlertIcon size="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          ¡Se produjo un error!
        </AlertTitle>
        <AlertDescription maxWidth="sm">«Conexión perdida. Por favor, revise su conexión a Internet»</AlertDescription>
      </Alert>
    )
  }

  if (!data.contents.length) {
    return (
      <Alert
        status="info"
        variant="solid"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
        mt="80px"
        mx="auto"
        w={["100%", "80%"]}
      >
        <AlertIcon size="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Búsqueda sin resultados
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          No se encontraron productos según el criterio de búsqueda introducido.
        </AlertDescription>
      </Alert>
    )
  }

  // Pagination logic
  const totalItems = data.contents.length
  const totalPages = Math.ceil(totalItems / perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = startIndex + perPage
  const currentItems = data.contents.slice(startIndex, endIndex)

  return (
    <Box>
      <Flex justify="flex-end" mb={4} align="center">
        <Text mr={2}>Productos por página:</Text>
        <Select value={perPage} onChange={handlePerPageChange} w="80px" size="sm">
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
        </Select>
      </Flex>

      <Grid templateColumns="repeat(auto-fill,minmax(220px,1fr))" gap={6} mt="8">
        {currentItems.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
      </Grid>

      {totalPages > 1 && (
        <Flex justify="center" mt={8} mb={4}>
          <Button mr={2} onClick={() => handlePageChange(page - 1)} isDisabled={page === 1} size="sm" variant="outline">
            Anterior
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              mx={1}
              onClick={() => handlePageChange(i + 1)}
              variant={page === i + 1 ? "solid" : "outline"}
              bg={page === i + 1 ? "bluex.500" : "white"}
              color={page === i + 1 ? "white" : "black"}
              size="sm"
            >
              {i + 1}
            </Button>
          ))}

          <Button
            ml={2}
            onClick={() => handlePageChange(page + 1)}
            isDisabled={page === totalPages}
            size="sm"
            variant="outline"
          >
            Siguiente
          </Button>
        </Flex>
      )}

      <Text textAlign="center" color="gray.600" fontSize="sm" mt={2}>
        Mostrando {startIndex + 1}-{Math.min(endIndex, totalItems)} de {totalItems} productos
      </Text>
    </Box>
  )
}
