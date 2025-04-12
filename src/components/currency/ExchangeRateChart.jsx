"use client"

import { Box, Flex, Heading, Text, Select } from "@chakra-ui/core"
import { useState, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { selectedCurrency, lastRateUpdate } from "../../recoil/state"

export default function ExchangeRateChart() {
  const [chartData, setChartData] = useState([])
  const [timeframe, setTimeframe] = useState("1M") // 1M, 3M, 6M, 1Y
  const currency = useRecoilValue(selectedCurrency)
  const lastUpdate = useRecoilValue(lastRateUpdate)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // In a real implementation, this would fetch data from an API
        // For now, we'll use simulated data
        const response = await fetch("/api/exchange-rates")
        const data = await response.json()

        if (data && data.history && data.history[currency]) {
          let historyData = [...data.history[currency]]

          // Filter based on timeframe
          const now = new Date()
          let cutoffDate

          switch (timeframe) {
            case "1M":
              cutoffDate = new Date(now.setMonth(now.getMonth() - 1))
              break
            case "3M":
              cutoffDate = new Date(now.setMonth(now.getMonth() - 3))
              break
            case "6M":
              cutoffDate = new Date(now.setMonth(now.getMonth() - 6))
              break
            case "1Y":
              cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1))
              break
            default:
              cutoffDate = new Date(now.setMonth(now.getMonth() - 1))
          }

          historyData = historyData.filter((item) => new Date(item.date) >= cutoffDate)
          setChartData(historyData)
        }
      } catch (error) {
        console.error("Error fetching chart data:", error)
      }
    }

    fetchChartData()
  }, [currency, timeframe])

  // Simple chart rendering using divs
  // In a real implementation, you would use a charting library like Chart.js or Recharts
  const renderChart = () => {
    if (!chartData.length) return <Text>No hay datos disponibles</Text>

    const maxRate = Math.max(...chartData.map((item) => item.rate))
    const minRate = Math.min(...chartData.map((item) => item.rate))
    const range = maxRate - minRate

    return (
      <Box height="200px" position="relative" mt={4}>
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {chartData.map((item, index) => {
            const height = range === 0 ? 100 : ((item.rate - minRate) / range) * 100
            return (
              <Box key={index} height={`${height}%`} width="8px" bg="bluex.500" borderRadius="sm" position="relative">
                <Box
                  position="absolute"
                  bottom="-25px"
                  left="50%"
                  transform="translateX(-50%)"
                  fontSize="xs"
                  display={index % Math.ceil(chartData.length / 5) === 0 ? "block" : "none"}
                >
                  {new Date(item.date).toLocaleDateString("es-ES", { month: "short" })}
                </Box>
                <Box
                  position="absolute"
                  top="-20px"
                  left="50%"
                  transform="translateX(-50%)"
                  fontSize="xs"
                  display={index === 0 || index === chartData.length - 1 ? "block" : "none"}
                >
                  {(1 / item.rate).toFixed(0)}
                </Box>
              </Box>
            )
          })}
        </Flex>
      </Box>
    )
  }

  return (
    <Box bg="white" p={4} borderRadius="md" shadow="md">
      <Flex justify="space-between" align="center">
        <Heading size="md">Historial de Tasas: 1 {currency} = ? CUP</Heading>
        <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} size="sm" width="100px">
          <option value="1M">1 Mes</option>
          <option value="3M">3 Meses</option>
          <option value="6M">6 Meses</option>
          <option value="1Y">1 Año</option>
        </Select>
      </Flex>

      <Text fontSize="xs" color="gray.500" mt={1}>
        Última actualización: {new Date(lastUpdate).toLocaleString()}
      </Text>

      {renderChart()}

      <Text fontSize="sm" mt={4} textAlign="center" fontStyle="italic">
        Fuente: ElToque.com (mercado informal)
      </Text>
    </Box>
  )
}
