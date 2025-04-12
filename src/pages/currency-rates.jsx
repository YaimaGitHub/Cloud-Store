"use client"

import { Select } from "@/components/ui/select"

import { useState, useEffect } from "react"
import {
  Box,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Link as ChakraLink,
} from "@chakra-ui/core"
import Header from "../components/commons/Header"
import Footer from "../components/commons/Footer"
import { useRecoilState } from "recoil"
import { currencyRates } from "../recoil/state"
import Link from "next/link"

const CurrencyRates = () => {
  const [rates, setRates] = useRecoilState(currencyRates)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [historicalRates, setHistoricalRates] = useState([])
  const toast = useToast()

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = await response.json()

      setRates({
        USD: data.inverseRates.USD,
        EUR: data.inverseRates.EUR,
        MLC: data.inverseRates.MLC,
        CUP: 1,
        fullData: data.rates,
      })

      setLastUpdated(new Date(data.lastUpdated))

      // Add to historical rates
      setHistoricalRates((prev) => {
        // Only add if the rates are different from the last entry
        if (
          prev.length === 0 ||
          prev[0].rates.USD.sell !== data.rates.USD.sell ||
          prev[0].rates.EUR.sell !== data.rates.EUR.sell ||
          prev[0].rates.MLC.sell !== data.rates.MLC.sell
        ) {
          return [
            {
              timestamp: data.lastUpdated,
              rates: data.rates,
            },
            ...prev.slice(0, 9),
          ] // Keep only the last 10 entries
        }
        return prev
      })

      if (!data.isOffline) {
        toast({
          title: "Tasas actualizadas",
          description: "Las tasas de cambio han sido actualizadas correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      } else {
        toast({
          title: "Modo sin conexión",
          description: "Usando tasas de cambio aproximadas. Compruebe su conexión a Internet.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      toast({
        title: "Error",
        description: "No se pudieron actualizar las tasas de cambio",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()

    // Try to load historical rates from localStorage
    const savedRates = localStorage.getItem("historicalRates")
    if (savedRates) {
      try {
        setHistoricalRates(JSON.parse(savedRates))
      } catch (e) {
        console.error("Error parsing saved rates:", e)
      }
    }

    // Save historical rates to localStorage when they change
    return () => {
      localStorage.setItem("historicalRates", JSON.stringify(historicalRates))
    }
  }, [])

  useEffect(() => {
    // Save to localStorage whenever historical rates change
    if (historicalRates.length > 0) {
      localStorage.setItem("historicalRates", JSON.stringify(historicalRates))
    }
  }, [historicalRates])

  const formatDate = (dateString) => {
    if (!dateString) return "No disponible"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const calculateChange = (currency) => {
    if (historicalRates.length < 2 || !rates.fullData) return { value: 0, isPositive: true }

    const currentRate = rates.fullData[currency].sell
    const previousRate = historicalRates[1]?.rates[currency].sell

    if (!previousRate) return { value: 0, isPositive: true }

    const change = currentRate - previousRate
    const percentChange = (change / previousRate) * 100

    return {
      value: Math.abs(percentChange).toFixed(2),
      isPositive: change >= 0,
    }
  }

  return (
    <>
      <Header />
      <Box bg="gray.100" minH="calc(100vh - 150px)" py={8}>
        <Box maxW="1200px" mx="auto" px={4}>
          <Flex justify="space-between" align="center" mb={6}>
            <Heading as="h1" size="xl">
              Tasas de Cambio Informal
            </Heading>
            <Button onClick={fetchRates} bg="bluex.500" color="white" _hover={{ bg: "bluex.600" }} isLoading={loading}>
              Actualizar Tasas
            </Button>
          </Flex>

          <Text mb={4}>
            Estas tasas son aproximadas y basadas en el mercado informal cubano. Para tasas oficiales, consulte los
            sitios web de los bancos cubanos.
          </Text>

          <Alert status="info" mb={6} rounded="md">
            <AlertIcon />
            <Box>
              <AlertTitle>Información</AlertTitle>
              <AlertDescription>
                Las tasas mostradas son referenciales y pueden variar. Última actualización: {formatDate(lastUpdated)}
              </AlertDescription>
            </Box>
          </Alert>

          <Tabs isFitted variant="enclosed" mb={6}>
            <TabList mb="1em">
              <Tab _selected={{ color: "white", bg: "bluex.500" }}>Tasas Actuales</Tab>
              <Tab _selected={{ color: "white", bg: "bluex.500" }}>Historial</Tab>
              <Tab _selected={{ color: "white", bg: "bluex.500" }}>Calculadora</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
                  <Table variant="simple">
                    <Thead bg="bluex.500">
                      <Tr>
                        <Th color="white">Moneda</Th>
                        <Th color="white">Compra (CUP)</Th>
                        <Th color="white">Venta (CUP)</Th>
                        <Th color="white">Cambio</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {rates.fullData &&
                        Object.entries(rates.fullData).map(([currency, data]) => {
                          if (currency === "CUP") return null

                          const change = calculateChange(currency)

                          return (
                            <Tr key={currency}>
                              <Td fontWeight="bold">{currency}</Td>
                              <Td>{data.buy}</Td>
                              <Td>{data.sell}</Td>
                              <Td>
                                <Badge
                                  colorScheme={change.isPositive ? "green" : "red"}
                                  variant="solid"
                                  px={2}
                                  py={1}
                                  borderRadius="full"
                                >
                                  {change.isPositive ? "▲" : "▼"} {change.value}%
                                </Badge>
                              </Td>
                            </Tr>
                          )
                        })}
                    </Tbody>
                  </Table>
                </Box>

                <Text mt={4} fontSize="sm" fontStyle="italic">
                  Fuente: Basado en tasas informales del mercado cubano, referenciando sitios como{" "}
                  <ChakraLink href="https://eltoque.com" isExternal color="bluex.500">
                    El Toque
                  </ChakraLink>
                </Text>
              </TabPanel>

              <TabPanel>
                <Box bg="white" shadow="md" rounded="lg" overflow="hidden">
                  <Table variant="simple">
                    <Thead bg="bluex.500">
                      <Tr>
                        <Th color="white">Fecha</Th>
                        <Th color="white">USD (Venta)</Th>
                        <Th color="white">EUR (Venta)</Th>
                        <Th color="white">MLC (Venta)</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {historicalRates.map((entry, index) => (
                        <Tr key={index}>
                          <Td>{formatDate(entry.timestamp)}</Td>
                          <Td>{entry.rates.USD.sell}</Td>
                          <Td>{entry.rates.EUR.sell}</Td>
                          <Td>{entry.rates.MLC.sell}</Td>
                        </Tr>
                      ))}
                      {historicalRates.length === 0 && (
                        <Tr>
                          <Td colSpan={4} textAlign="center" py={4}>
                            No hay datos históricos disponibles
                          </Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>

              <TabPanel>
                <CurrencyCalculator rates={rates} />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Box textAlign="center" mt={8}>
            <Button as={Link} href="/" variant="outline">
              Volver a la Tienda
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

const CurrencyCalculator = ({ rates }) => {
  const [amount, setAmount] = useState(100)
  const [fromCurrency, setFromCurrency] = useState("CUP")
  const [toCurrency, setToCurrency] = useState("USD")
  const [result, setResult] = useState(0)

  useEffect(() => {
    if (!rates.fullData) return

    let convertedAmount = 0

    if (fromCurrency === "CUP") {
      // Converting from CUP to another currency
      if (toCurrency === "CUP") {
        convertedAmount = amount
      } else {
        // Use the inverse rate (1/sell rate) to convert from CUP to foreign currency
        convertedAmount = amount * rates[toCurrency]
      }
    } else {
      // Converting from foreign currency to CUP or another currency
      // First convert to CUP
      const amountInCUP = amount * rates.fullData[fromCurrency].sell

      if (toCurrency === "CUP") {
        convertedAmount = amountInCUP
      } else {
        // Then convert from CUP to target currency
        convertedAmount = amountInCUP * rates[toCurrency]
      }
    }

    setResult(convertedAmount)
  }, [amount, fromCurrency, toCurrency, rates])

  return (
    <Box bg="white" shadow="md" rounded="lg" p={6}>
      <Heading as="h3" size="md" mb={4}>
        Calculadora de Divisas
      </Heading>

      <Flex direction={{ base: "column", md: "row" }} gap={4} mb={6}>
        <Box flex="1">
          <Text mb={2}>Cantidad</Text>
          <Flex>
            <Button onClick={() => setAmount((prev) => Math.max(1, prev - 10))} mr={2}>
              -
            </Button>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #E2E8F0",
                borderRadius: "4px",
              }}
            />
            <Button onClick={() => setAmount((prev) => prev + 10)} ml={2}>
              +
            </Button>
          </Flex>
        </Box>

        <Box flex="1">
          <Text mb={2}>De</Text>
          <Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            <option value="CUP">CUP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MLC">MLC</option>
          </Select>
        </Box>

        <Box flex="1">
          <Text mb={2}>A</Text>
          <Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            <option value="CUP">CUP</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MLC">MLC</option>
          </Select>
        </Box>
      </Flex>

      <Box textAlign="center" p={4} bg="gray.100" rounded="md">
        <Text fontSize="lg">
          {amount} {fromCurrency} =
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="bluex.600">
          {result.toFixed(2)} {toCurrency}
        </Text>
        {fromCurrency !== "CUP" && toCurrency !== "CUP" && (
          <Text fontSize="sm" color="gray.600" mt={2}>
            Tasa de cambio: 1 {fromCurrency} = {rates.fullData[fromCurrency].sell} CUP
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default CurrencyRates
