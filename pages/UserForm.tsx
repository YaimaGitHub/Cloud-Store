import React from 'react';
import { Stack, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ClientInfoForm from '../components/ClientForm/ClientInfoForm';
import ClientAddressForm from '../components/ClientForm/ClientAddressForm';
import CheckoutStep from '../components/Checkout/CheckoutSteps';
import NavbarCheckout from '../components/ui/NavbarCheckout';

function UserForm({ setClientInfo, clientInfo }) {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/checkout');
  };

  return (
    <Stack alignItems="center" bg="gray.100" height="100vh">
      <NavbarCheckout />
      <Stack mt={20} pt={['100px', '0', '0', '0']} alignItems="center">
        <form id="form" onSubmit={handleSubmit}>
          <CheckoutStep value="50" />
          <Stack mb={10} borderRadius={10} p={10} direction={['column', 'column', 'row', 'row']} justifyContent="center" bg="gray.50">
            <ClientInfoForm clientInfo={clientInfo} setClientInfo={setClientInfo} />
            <ClientAddressForm
              setClientInfo={setClientInfo}
              clientInfo={clientInfo}
            />
          </Stack>
        </form>
        <HStack justifyContent="space-around" w="100%" pb={50}>
          <Button width={150} onClick={() => router.push('/')} colorScheme="blue">Atrás</Button>
          <Button type="submit" onSubmit={(e) => handleSubmit(e)} form="form" width={150} colorScheme="green">Siguiente</Button>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default UserForm;
