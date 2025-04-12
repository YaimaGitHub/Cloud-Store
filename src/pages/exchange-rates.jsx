"use client"

import { Box, Flex, Heading, Text, Grid, Badge, Icon, Button } from "@chakra-ui/core"
import { useState, useEffect } from "react"
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import ExchangeRateChart from "../components/currency/ExchangeRateChart"
import { BiTrendingUp, BiTrendingDown, BiMinus } from "react-icons/bi"

const ExchangeRatesPage = () => {
  const [ratesData, setRatesData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/exchange-rates")
        const data = await response.json()
        setRatesData(data)
      } catch (error) {
        console.error("Error fetching exchange rates:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRates()
  }, [])

  const getTrendIcon = (trend) => {
    if (trend === "up") return <Icon as={BiTrendingUp} color="green.500" ml={1} />
    if (trend === "down") return <Icon as={BiTrendingDown} color="red.500" ml={1} />
    return <Icon as={BiMinus} color="gray.500" ml={1} />
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Header />
      <Box bg="gray.100" minH="calc(100vh - 150px)" py={8}>
        <Box maxW="1200px" mx="auto" px={4}>
          <Heading as="h1" size="xl" mb={6}>
            Tasas de Cambio Actuales
          </Heading>

          {isLoading ? (
            <Flex justify="center" align="center" h="300px">
              <Text>Cargando tasas de cambio...</Text>
            </Flex>
          ) : ratesData ? (
            <>
              <Box bg="white" p={6} borderRadius="md" shadow="md" mb={8}>
                <Flex justify="space-between" align="center" mb={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    Tasas del mercado informal
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Actualizado: {formatDate(ratesData.timestamp)}
                  </Text>
                </Flex>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                  {Object.entries(ratesData.rates)
                    .filter(([code]) => code !== "CUP")
                    .map(([code, data]) => (
                      <Box
                        key={code}
                        p={4}
                        borderRadius="md"
                        border="1px"
                        borderColor="gray.200"
                        onClick={() => setSelectedCurrency(code)}
                        cursor="pointer"
                        bg={selectedCurrency === code ? "bluex.50" : "white"}
                        _hover={{ bg: "bluex.50" }}
                      >
                        <Flex justify="space-between" align="center" mb={2}>
                          <Heading size="md">{code}</Heading>
                          {getTrendIcon(data.trend)}
                          <Badge colorScheme={data.trend === "up" ? "green" : data.trend === "down" ? "red" : "gray"}>
                            {data.trend === "up" ? "Subiendo" : data.trend === "down" ? "Bajando" : "Estable"}
                          </Badge>
                        </Flex>

                        <Flex direction="column" mt={3}>
                          <Flex justify="space-between" mb={1}>
                            <Text>Compra:</Text>
                            <Text fontWeight="bold">
                              1 {code} = {Math.round(1 / data.buy)} CUP
                            </Text>
                          </Flex>
                          <Flex justify="space-between">
                            <Text>Venta:</Text>
                            <Text fontWeight="bold">
                              1 {code} = {Math.round(1 / data.sell)} CUP
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                </Grid>

                <Text fontSize="sm" mt={4} fontStyle="italic">
                  Fuente: ElToque.com (mercado informal)
                </Text>
              </Box>

              <ExchangeRateChart />

              <Box mt={8} textAlign="center">
                <Button
                  onClick={() => (window.location.href = "https://eltoque.com/tasas-de-cambio-de-moneda-en-cuba-hoy")}
                  colorScheme="blue"
                  bg="bluex.500"
                  _hover={{ bg: "bluex.600" }}
                >
                  Ver más información en ElToque.com
                </Button>
              </Box>
            </>
          ) : (
            <Box bg="white" p={6} borderRadius="md" shadow="md" textAlign="center">
              <Text>No se pudieron cargar las tasas de cambio. Intente nuevamente más tarde.</Text>
            </Box>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default ExchangeRatesPage
