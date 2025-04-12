"use client"

import { Image, Modal, ModalCloseButton, ModalContent, ModalOverlay, Button, Flex, Text } from "@chakra-ui/core"
import { useRouter } from "next/router"
import data from "../../data"

export default function ItemModal({ showModal, setModal, img }) {
  const router = useRouter()

  // Find the product by image
  const product = data.find((item) => item.img === img)

  const handleViewDetails = () => {
    setModal(false)
    if (product) {
      router.push(`/product/${product.id}`)
    }
  }

  return (
    <Modal onClose={() => setModal(false)} isOpen={showModal} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Image
          size="100%"
          objectFit="cover"
          src={`/images/${img}`}
          fallbackSrc="/images/productosinimagen.jpg"
          alt=""
        />
        {product && (
          <Flex direction="column" p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              {product.title}
            </Text>
            {product.title1 && (
              <Text fontSize="md" mb={2}>
                {product.title1}
              </Text>
            )}
            <Flex align="center" mb={3}>
              <Text fontSize="lg" fontWeight="bold" color="bluex.600" mr={2}>
                ${product.offerPrice || product.price}
              </Text>
              {product.offerPrice && (
                <Text as="del" color="gray.500">
                  ${product.price}
                </Text>
              )}
            </Flex>
            <Button onClick={handleViewDetails} bg="bluex.500" color="white" _hover={{ bg: "bluex.600" }}>
              Ver detalles completos
            </Button>
          </Flex>
        )}
      </ModalContent>
    </Modal>
  )
}
