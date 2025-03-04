import React from 'react';
import {
  Box, FormControl, FormLabel, Input,
} from '@chakra-ui/react';

function ClientFormInput({
  type, label, isRequired, isDisabled, name, setClientInfo, clientInfo,
}) {
  return (
    <Box>
      <FormControl isRequired={isRequired} isDisabled={isDisabled}>
        <FormLabel color="gray.500" fontWeight="regular">{label}</FormLabel>
        <Input
          type={type}
          onChange={(e) => setClientInfo({ ...clientInfo, [name]: e.target.value })}
          name={name}
          value={clientInfo[name]}
          bg="white"
        />
      </FormControl>
    </Box>
  );
}

export default ClientFormInput;
