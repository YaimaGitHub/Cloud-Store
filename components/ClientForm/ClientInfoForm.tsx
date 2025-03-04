import React from 'react';
import { Heading, Stack } from '@chakra-ui/react';
import ClientFormInput from './ClientFormInput';

function ClientInfoForm({ setClientInfo, clientInfo }) {
  return (
    <Stack px={10}>
      <Heading fontSize={20}>Mis Datos</Heading>
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} isDisabled={false} name="name" isRequired type="text" label="Nombre y apellido" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} isDisabled={false} name="company" isRequired type="text" label="Empresa" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} isDisabled={false} name="cuit" isRequired type="number" label="Cuit" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} isDisabled={false} name="email" isRequired type="email" label="Email" />
      <ClientFormInput clientInfo={clientInfo} setClientInfo={setClientInfo} isDisabled={false} name="whatsapp" isRequired type="number" label="Whatsapp" />
    </Stack>
  );
}

export default ClientInfoForm;
