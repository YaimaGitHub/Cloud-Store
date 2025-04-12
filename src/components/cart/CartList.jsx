import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Box } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { cart } from "../../recoil/state"
import CartItem from "./CartItem"

function CartList() {
  const cartItems = useRecoilValue(cart)

  if (!Object.keys(cartItems).length) {
    return (
      <Alert
        status="info"
        variant="solid"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
        mt="8"
        borderRadius="md"
        bg="bluex.500"
      >
        <AlertIcon size="40px" mr={0} color="white" />
        <AlertTitle mt={4} mb={1} fontSize="lg" color="white">
          No posees productos en la cesta de compra.
        </AlertTitle>
        <AlertDescription maxWidth="sm" color="white" opacity="0.9">
          Adiciona los productos de tu lista de deseos o continúa revisando los productos disponibles en la tienda.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Box
      overflowY="auto"
      h="calc(100% - 190px)"
      className="cart-items-container"
      css={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
    >
      <Flex direction="column" align="center" w="100%" mt="4">
        {Object.values(cartItems).map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </Flex>
    </Box>
  )
}

export default CartList
