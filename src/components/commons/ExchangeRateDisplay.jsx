"use client"

import { Box, Flex, Text, Heading, Badge, Spinner, Button, useToast } from "@chakra-ui/core"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currencyRates } from "../../recoil/state"

export default function ExchangeRateDisplay() {
  const [rates, setRates] = useRecoilState(currencyRates)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
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
    // Set up auto-refresh every 30 minutes
    const interval = setInterval(fetchRates, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const formatDate = (date) => {
    if (!date) return "No disponible"
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Box bg="white" shadow="md" rounded="lg" p={3} mb={4} position="relative" transition="all 0.3s ease">
      <Flex justify="space-between" align="center" onClick={() => setIsExpanded(!isExpanded)} cursor="pointer">
        <Heading size="sm">Tasas de Cambio Informal</Heading>
        <Flex align="center">
          {loading ? (
            <Spinner size="sm" mr={2} />
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation()
                fetchRates()
              }}
              mr={2}
            >
              Actualizar
            </Button>
          )}
          <Badge colorScheme={isExpanded ? "blue" : "gray"}>{isExpanded ? "▲" : "▼"}</Badge>
        </Flex>
      </Flex>

      {isExpanded && (
        <Box mt={3}>
          <Text fontSize="xs" mb={2}>
            Última actualización: {formatDate(lastUpdated)}
          </Text>

          <Flex justify="space-between" mb={2}>
            <Text fontWeight="bold" width="25%">
              Moneda
            </Text>
            <Text fontWeight="bold" width="37.5%">
              Compra (CUP)
            </Text>
            <Text fontWeight="bold" width="37.5%">
              Venta (CUP)
            </Text>
          </Flex>

          {rates.fullData &&
            Object.entries(rates.fullData).map(([currency, data]) => {
              if (currency === "CUP") return null
              return (
                <Flex
                  key={currency}
                  justify="space-between"
                  mb={1}
                  py={1}
                  borderBottom="1px solid"
                  borderColor="gray.100"
                >
                  <Text width="25%">{currency}</Text>
                  <Text width="37.5%">{data.buy}</Text>
                  <Text width="37.5%">{data.sell}</Text>
                </Flex>
              )
            })}

          <Text fontSize="xs" mt={2} fontStyle="italic">
            Fuente: Basado en tasas informales del mercado cubano
          </Text>
        </Box>
      )}
    </Box>
  )
}
