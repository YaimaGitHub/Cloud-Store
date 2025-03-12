import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from "@chakra-ui/core";
import { useRecoilValue } from "recoil";
import { cart } from "../../recoil/state";
import CartItem from "./CartItem";

function CartList() {
  const cartItems = useRecoilValue(cart);

  if (!Object.keys(cartItems).length) {
    return (
      <Alert status="info" variant="solid" flexDirection="column" justifyContent="center" textAlign="center" height="200px" mt="8">
        <AlertIcon size="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
        No posees productos en el carro de compras.
        </AlertTitle>
        <AlertDescription maxWidth="sm">Adiciona los productos de tu lista de deseos o continúa revisando los productos disponibles en la tienda.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Flex direction="column" align="center" w="100%" mt="4" overflowY="auto" h="calc(100% - 190px)">
      {Object.values(cartItems).map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </Flex>
  );
}

export default CartList;
