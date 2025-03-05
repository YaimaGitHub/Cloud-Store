import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/core";

function Footer() {
  return (
    <Box as="footer" w="100%" bg="bluex.500" color="white" position="relative" zIndex="1101">
      <Flex w="90%" mx="auto" justify="space-between" align="center" py="6">
        <Text>2025 Todos los Derechos Reservados</Text>

        <Stack isInline>
        <a href="https://www.instagram.com/" class="btn btn-sm btn-white btn-social mr-3">
            <Icon name="link" mx="2" />
            <i class="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/" target="_blank" class="btn btn-sm btn-white btn-social mr-3">
            <Icon name="link" mx="2" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5354690878" target="_blank" class="btn btn-sm btn-white btn-social mr-3" >
            <Icon name="link" mx="2" />
          </a>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Footer;
