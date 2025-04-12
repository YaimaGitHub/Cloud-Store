"use client"

import { Select, Flex, Text } from "@chakra-ui/core"
import { useRecoilState } from "recoil"
import { selectedLanguage } from "../../recoil/state"

export default function LanguageSelector() {
  const [language, setLanguage] = useRecoilState(selectedLanguage)

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  return (
    <Flex align="center" mr={4}>
      <Text mr={2} fontSize="sm" fontWeight="medium" display={{ base: "none", md: "block" }}>
        Idioma:
      </Text>
      <Select
        value={language}
        onChange={handleLanguageChange}
        size="sm"
        width={{ base: "80px", md: "100px" }}
        bg="white"
        borderColor="bluex.500"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </Select>
    </Flex>
  )
}
