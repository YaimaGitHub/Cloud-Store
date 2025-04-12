"use client"

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Checkbox,
  Stack,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
  Text,
  Box,
} from "@chakra-ui/core"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { selectedCategory } from "../../recoil/state"
import data from "../../data"

export default function FilterPanel() {
  const [category, setCategory] = useRecoilState(selectedCategory)

  // Get unique categories
  const categories = [...new Set(data.map((product) => product.category))]

  // Get min and max prices
  const prices = data.map((product) => product.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)

  const handleCategoryChange = (cat) => {
    setCategory(cat)
  }

  const handlePriceChange = (values) => {
    setPriceRange(values)
  }

  const handleStockChange = () => {
    setInStock(!inStock)
  }

  const handleSaleChange = () => {
    setOnSale(!onSale)
  }

  const applyFilters = () => {
    // In a real app, this would apply all filters together
    // For now, we're just using the category filter which is already applied
  }

  const resetFilters = () => {
    setCategory("all")
    setPriceRange([minPrice, maxPrice])
    setInStock(false)
    setOnSale(false)
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button leftIcon="filter" variant="outline">
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent width="300px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">Filtrar Productos</PopoverHeader>
        <PopoverBody>
          <Box mb={4}>
            <Text fontWeight="medium" mb={2}>
              Categorías
            </Text>
            <Stack spacing={1}>
              <Checkbox isChecked={category === "all"} onChange={() => handleCategoryChange("all")}>
                Todos los productos
              </Checkbox>
              {categories.map((cat) => (
                <Checkbox key={cat} isChecked={category === cat} onChange={() => handleCategoryChange(cat)}>
                  {cat}
                </Checkbox>
              ))}
            </Stack>
          </Box>

          <Box mb={4}>
            <Text fontWeight="medium" mb={2}>
              Rango de Precio
            </Text>
            <RangeSlider min={minPrice} max={maxPrice} step={1} value={priceRange} onChange={handlePriceChange} mb={2}>
              <RangeSliderTrack bg="gray.200">
                <RangeSliderFilledTrack bg="bluex.500" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex justify="space-between">
              <Text>${priceRange[0]}</Text>
              <Text>${priceRange[1]}</Text>
            </Flex>
          </Box>

          <Box mb={4}>
            <Text fontWeight="medium" mb={2}>
              Otras Opciones
            </Text>
            <Stack spacing={1}>
              <Checkbox isChecked={inStock} onChange={handleStockChange}>
                Solo productos en stock
              </Checkbox>
              <Checkbox isChecked={onSale} onChange={handleSaleChange}>
                Solo productos en oferta
              </Checkbox>
            </Stack>
          </Box>

          <Flex justify="space-between" mt={4}>
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Restablecer
            </Button>
            <Button bg="bluex.500" color="white" size="sm" onClick={applyFilters} _hover={{ bg: "bluex.600" }}>
              Aplicar Filtros
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
