import React, { useEffect, useState } from 'react';
import {
  Radio,
  RadioGroup,
  Stack,
  FormControl,
  FormLabel,
  HStack,
  Text,
} from '@chakra-ui/react';
import ClientFormInput from './ClientFormInput';

function ClientAddressForm({ setClientInfo, clientInfo }) {
  const [shipping, setShipping] = useState('envio');
  useEffect(() => {
    setShipping('envio');
    setClientInfo({ ...clientInfo, shipping: true });
  }, []);

  const shippingOn = () => {
    setClientInfo({ ...clientInfo, shipping: true });
    setShipping('envio');
  };
  const shippingOff = () => {
    setClientInfo({
      ...clientInfo,
      shipping: false,
      address: '',
      zipCode: '',
      city: '',
      province: '',
    });
    setShipping('retiro');
  };
  return (
    <Stack>
      <FormControl as="fieldset">
        <FormLabel as="legend">Tipo de envío</FormLabel>
        <RadioGroup defaultValue={shipping}>
          <HStack spacing="24px">
            <Stack>
              <Radio onChange={() => shippingOn()} value="envio">Envío a domicilio</Radio>
              <Text color="gray.500" alignSelf="start" fontSize={12}>Acordar con el vendedor</Text>
            </Stack>
            <Stack>
              <Radio onChange={() => shippingOff()} value="retiro">Retiro en el local</Radio>
              <Text color="gray.500" alignSelf="end" fontSize={12}>(Santa Fe Capital)</Text>
            </Stack>
          </HStack>
        </RadioGroup>
      </FormControl>
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} name="address" isDisabled={!clientInfo.shipping} isRequired type="text" label="Dirección" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} name="province" isDisabled={!clientInfo.shipping} isRequired type="text" label="Provincia" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} name="city" isDisabled={!clientInfo.shipping} isRequired type="text" label="Ciudad" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} name="zipCode" isDisabled={!clientInfo.shipping} isRequired type="number" label="Código postal" />
    </Stack>
  );
}

export default ClientAddressForm;
