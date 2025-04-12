"use client"

import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  PseudoBox,
  Select,
  Text,
} from "@chakra-ui/core"

import { BiComment, BiMap, BiMapAlt, BiPhone, BiTime, BiUser, BiCalendar } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { formState, deliveryLocation, selectedCurrency, currencyRates } from "../../recoil/state"
import ConfirmAlertModal from "../others/ConfirmAlertModal"
import { useState } from "react"
import { getFormValidations, getLocationFees, formatPrice } from "../../helpers"

function CheckoutForm() {
  const setForm = useSetRecoilState(formState)
  const [location, setLocation] = useRecoilState(deliveryLocation)
  const { register, errors, handleSubmit } = useForm({ mode: "onTouched" })
  const [showModal, setModal] = useState(false)
  const validations = getFormValidations()
  const locationFees = getLocationFees()
  const currency = useRecoilValue(selectedCurrency)
  const rates = useRecoilValue(currencyRates)

  // Get current date and time for min values
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const hours = today.getHours()
  const minutes = today.getMinutes()
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`

  const onSubmit = (formState) => {
    setForm(formState)
    setModal(true)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  return (
    <>
      <Box
        w={["100%", "80%", "46%", "40%"]}
        height="max-content"
        bg="white"
        p="4"
        mx="2"
        order={["1", "1", "0"]}
        mt={["6", "6", "0"]}
      >
        <Heading as="h3" size="md" textAlign="center">
          Información de Entrega
        </Heading>
        <Flex as="form" p="2" direction="column" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup mt="4">
            <InputLeftElement children={<PseudoBox as={BiUser} size="24px" color="bluex.400" />} />
            <Input
              type="text"
              name="name"
              placeholder="Su nombre"
              variant="filled"
              ref={register(validations.name)}
              isInvalid={errors.name ? true : false}
            />
          </InputGroup>
          {errors.name && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.name.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiPhone} size="24px" color="bluex.400" />} />
            <Input
              type="phone"
              name="phone"
              placeholder="Número de teléfono"
              variant="filled"
              ref={register(validations.phone)}
              isInvalid={errors.phone ? true : false}
            />
          </InputGroup>
          {errors.phone && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.phone.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiMap} size="24px" color="bluex.400" />} />
            <Input
              type="text"
              name="address"
              placeholder="Tu dirección"
              variant="filled"
              ref={register(validations.address)}
              isInvalid={errors.address ? true : false}
            />
          </InputGroup>
          {errors.address && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.address.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiMapAlt} size="24px" color="bluex.400" />} />
            <Select
              variant="filled"
              placeholder="-- Lugar de entrega --"
              pl="40px"
              name="city"
              value={location}
              onChange={handleLocationChange}
              ref={register(validations.city)}
              isInvalid={errors.city ? true : false}
            >
              {Object.keys(locationFees).map((city) => {
                // Convert the delivery fee to the selected currency
                const convertedFee = formatPrice(locationFees[city], currency, rates)
                return (
                  <option key={city} value={city}>
                    {city} - {convertedFee} {currency}
                  </option>
                )
              })}
            </Select>
          </InputGroup>
          {errors.city && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.city.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiCalendar} size="24px" color="bluex.400" />} />
            <Input
              type="date"
              name="deliveryDate"
              variant="filled"
              min={formattedDate}
              ref={register(validations.deliveryDate)}
              isInvalid={errors.deliveryDate ? true : false}
            />
          </InputGroup>
          {errors.deliveryDate && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.deliveryDate.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiTime} size="24px" color="bluex.400" />} />
            <Input
              type="time"
              name="deliveryTime"
              variant="filled"
              min={formattedDate === new Date().toISOString().split("T")[0] ? formattedTime : undefined}
              ref={register(validations.deliveryTime)}
              isInvalid={errors.deliveryTime ? true : false}
            />
          </InputGroup>
          {errors.deliveryTime && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.deliveryTime.message}
            </Text>
          )}

          <InputGroup mt="6">
            <InputLeftElement children={<PseudoBox as={BiComment} size="24px" color="bluex.400" />} />
            <Input
              type="text"
              name="comment"
              placeholder="¿Quieres aclararnos algo?"
              variant="filled"
              ref={register(validations.comment)}
              isInvalid={errors.comment ? true : false}
            />
          </InputGroup>
          {errors.comment && (
            <Text as="i" fontSize="xs" color="red.500">
              {errors.comment.message}
            </Text>
          )}

          <Button type="submit" w="100%" variantColor="green" size="lg" mt="6">
            CONFIRMAR
          </Button>
        </Flex>
      </Box>

      {showModal && <ConfirmAlertModal showModal={showModal} setModal={setModal} />}
    </>
  )
}

export default CheckoutForm
