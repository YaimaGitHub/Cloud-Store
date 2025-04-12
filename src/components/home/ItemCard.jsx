"use client"

import { Badge, Box, Flex, Image, Text, useToast, Button } from "@chakra-ui/core"
import { useEffect, useState } from "react"
import useIsInCart from "../../hooks/useIsInCart"
import CounterBtn from "../others/CounterBtn"
import ItemModal from "../others/ItemModal"
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { selectedCurrency, currencyRates } from "../../recoil/state"
import { formatPrice } from "../../helpers"

export default function ItemCard({ item }) {
  const { id, title, title1, price, img, offerPrice, category } = item
  const router = useRouter()
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)

  //HOOKS
  const [showModal, setModal] = useState(false)
  const [isAdded, setAdded] = useState("initial")
  const counter = useIsInCart(item)
  const toast = useToast()

  //effect for handle toast
  useEffect(() => {
    if (counter === 1 && isAdded === "noAdded") {
      toast({
        position: "bottom-left",
        title: "Producto agregado a la cesta de compra.",
        status: "success",
        duration: 1500,
      })
      setAdded("added")
    } else if (counter === 0 && isAdded === "added") {
      toast({
        position: "bottom-left",
        title: "Producto eliminado de la cesta de compra.",
        status: "error",
        duration: 1500,
      })
      setAdded("noAdded")
    } else if (isAdded === "initial" && counter === 0) {
      setAdded("noAdded")
    } else if (isAdded === "initial" && counter > 0) {
      setAdded("added")
    }
  }, [counter])

  const handleViewDetails = () => {
    router.push(`/product/${id}`)
  }

  // Convert price to selected currency
  const convertedPrice = formatPrice(price, currency, rates)
  const convertedOfferPrice = offerPrice ? formatPrice(offerPrice, currency, rates) : null

  return (
    <>
      <Flex
        w="100%"
        h="350px"
        bg="white"
        direction="column"
        justify="space-between"
        align="center"
        position="relative"
        pb="2"
        shadow="lg"
        rounded="md"
        transition="transform 0.3s ease, box-shadow 0.3s ease"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      >
        {offerPrice && (
          <Badge size="" variant="solid" variantColor="red" position="absolute" px="2" top="10px" right="10px">
            Promoción
          </Badge>
        )}

        <Box w="100%" h="50%" onClick={() => setModal(true)} cursor="pointer">
          <Image
            size="100%"
            objectFit="cover"
            src={`/images/${img}`}
            fallbackSrc="/images/productosinimagen.jpg"
            alt={title}
          />
        </Box>

        <Box w="85%" my="3">
          <Flex align="flex-end">
            <Text fontSize="md" fontWeight="bold" color="bluex.600">
              {convertedOfferPrice || convertedPrice} {currency}
            </Text>
            {offerPrice && (
              <Text ml="1" fontSize="sm" fontWeight="medium" as="del" color="gray.400">
                {convertedPrice} {currency}
              </Text>
            )}
          </Flex>

          <Text fontSize="sm" fontWeight="medium" textTransform="capitalize" minHeight="20px" noOfLines={2}>
            {title}
          </Text>
          {title1 && (
            <Text fontSize="xs" color="gray.600">
              {title1}
            </Text>
          )}
          <Badge mt={1} colorScheme="blue" variant="subtle">
            {category}
          </Badge>
        </Box>

        <Flex w="85%" justify="space-between" mb={2}>
          <Button size="sm" variant="outline" colorScheme="blue" onClick={handleViewDetails}>
            Ver detalles
          </Button>
          <CounterBtn item={item} counter={counter} />
        </Flex>
      </Flex>

      <ItemModal showModal={showModal} setModal={setModal} img={img} />
    </>
  )
}
