import fetch from "isomorphic-unfetch"
import { nanoid } from "nanoid"

//fetcher
export const fetcher = (url) => fetch(url).then((r) => r.json())

export const getFormValidations = () => {
  return {
    //name
    name: {
      required: {
        value: true,
        message: "El nombre es obligatorio",
      },
      maxLength: {
        value: 20,
        message: "Longitud máxima 20 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      pattern: {
        value: /^[A-Za-z ]{5,20}$/,
        message: "Nombre incorrecto",
      },
    },

    //phone
    phone: {
      required: {
        value: true,
        message: "Se requiere teléfono",
      },
      maxLength: {
        value: 20,
        message: "Longitud máxima 20 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      pattern: {
        value: /^[0-9]{5,20}$/,
        message: "Teléfono incorrecto",
      },
    },
    //address
    address: {
      required: {
        value: true,
        message: "Se requiere dirección",
      },
      maxLength: {
        value: 25,
        message: "Longitud máxima 25 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      pattern: {
        value: /^[0-9a-zA-Z ]{5,20}$/,
        message: "Dirección incorrecta",
      },
    },
    //city
    city: {
      required: {
        value: true,
        message: "Se requiere el lugar de entrega",
      },
    },
    //delivery date
    deliveryDate: {
      required: {
        value: true,
        message: "Se requiere fecha de entrega",
      },
    },
    //delivery time
    deliveryTime: {
      required: {
        value: true,
        message: "Se requiere hora de entrega",
      },
    },
    //extra comment
    /* Esto es un comentario adicional (controlar la cantidad de caracteres escritos por el usuario maximo 25 por defecto) */
    comment: {
      maxLength: {
        value: 30,
        message: "Longitud máxima 30 caracteres",
      },
    },
  }
}

// Currency conversion helper
export const formatPrice = (price, currency, rates) => {
  const numPrice = Number.parseFloat(price)
  if (isNaN(numPrice)) return "0.00"

  // If currency is CUP or rates not available, return original price
  if (currency === "CUP" || !rates) return numPrice.toFixed(2)

  // Convert price based on exchange rate
  const convertedPrice = numPrice * rates[currency]
  return convertedPrice.toFixed(2)
}

// Location fees
export const getLocationFees = () => {
  return {
    Ferreiro: 250,
    "Santa Bárbara": 300,
    "Vista Alegre": 200,
    Altamira: 350,
    Versalles: 250,
    Chicharrones: 300,
    Pastorita: 250,
    "Distrito Jose Marti (hasta micro 9)": 400,
    "Los cangrejitos": 350,
    "Vista hermosa": 300,
    Portuondo: 250,
    Sorribe: 300,
    "Los olmos": 350,
    "Los pinos": 300,
    "Veguita de Galo": 400,
    Alameda: 250,
    Quintero: 300,
    "Nuevo vista alegre": 350,
    Agüero: 300,
    Modelo: 250,
    "Martí (hasta la iglesia)": 300,
    "Calle 4": 250,
    "30 de Noviembre": 300,
    "Micro 7": 350,
    "Micro 8": 400,
    "Carretera del morro": 450,
    Rajayoja: 400,
    "San Pedrito": 350,
    Marialina: 400,
    "Antonio maceo": 300,
  }
}

//wsp url creator
export function getWspUrl(orderData) {
  const N = process.env.NEXT_PUBLIC_MY_PHONE_NUMBER
  const ID = nanoid(8)
  const { cartItems, subTotal, deliveryLocation, deliveryFee, total, formData, currency } = orderData
  const { name, phone, address, city, deliveryDate, deliveryTime, comment } = formData

  let cartListforUrl = ""
  Object.values(cartItems).forEach((item) => {
    const itemTotal = (item.offerPrice ? item.offerPrice * item.qty : item.price * item.qty).toFixed(2)
    cartListforUrl += `%0A%0A - *(${item.qty})* ${item.title} ${item.title1 || ""} --> _*${itemTotal} ${currency}*_`
  })

  const WSP_URL = `https://api.whatsapp.com/send/?phone=${N}&text=%2A${"Número de Orden"}%3A%2A%20${ID}%0A%0A%2A${"Cliente"}%3A%2A%20${name}%0A%0A%2A${"Teléfono"}%3A%2A%20${phone}%0A%0A%2A${"Dirección"}%3A%2A%20${address}%0A%0A%2A${"Zona de entrega"}%3A%2A%20${city}%0A%0A%2A${"Fecha de entrega"}%3A%2A%20${deliveryDate}%0A%0A%2A${"Hora de entrega"}%3A%2A%20${deliveryTime}%0A%0A%2A${
    comment ? "Comentario Adicional" + "%3A%2A%20" + comment + "%0A%0A%2A" : ""
  }${"Lista de Productos"}%3A%2A${cartListforUrl}%0A%0A%2A${"Sub Total"}%3A%2A%20${subTotal} ${currency}%0A%0A%2A${"Tarifa de Entrega"}%3A%2A%20${deliveryFee} ${currency}%0A%0A%2A${"Total"}%3A%2A%20${total} ${currency}%0A%0A${"Moneda"}%3A%2A%20${currency}%0A%0A`

  return WSP_URL
}
