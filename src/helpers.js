import fetch from "isomorphic-unfetch";
import { nanoid } from "nanoid";

//fetcher
export const fetcher = (url) => fetch(url).then((r) => r.json());

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
        value: 20,
        message: "Longitud máxima 20 caracteres",
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
    //schedule
    schedule: {
      required: {
        value: true,
        message: "Se requiere horario",
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
  };
};

//wsp url creator
export function getWspUrl(orderData) {
  const N = process.env.NEXT_PUBLIC_MY_PHONE_NUMBER;
  const ID = nanoid(8);
  const { cartItems, subTotal, withDelivery, shippingCost, total, formData } = orderData;
  const { name, phone, address, city, schedule, comment } = formData;

  let cartListforUrl = "";

  {
    Object.values(cartItems).forEach((item) => {
      const itemTotal = (item.offerPrice ? item.offerPrice * item.qty : item.price * item.qty).toFixed(2);
      cartListforUrl += `%0A%0A - *(${item.qty})* ${item.title} --> _*$${itemTotal}*_`;
    });
  }

  const WSP_URL = `https://api.whatsapp.com/send/?phone=${N}&text=%2A${"Número de Orden"}%3A%2A%20${ID}%0A%0A%2A${"Cliente"}%3A%2A%20${name}%0A%0A%2A${"Teléfono"}%3A%2A%20${phone}%0A%0A%2A${
    withDelivery ? "Dirección" + "%3A%2A%20" + address + " %0A%0A%2A" : ""
  }${withDelivery ? "Domicilio donde vive" + "%3A%2A%20" + city + "%0A%0A%2A" : ""}${
    withDelivery ? "Hora Programada" + "%3A%2A%20" + schedule + "%0A%0A%2A" : ""
  }${comment ? "Comentario Adicional" + "%3A%2A%20" + comment + "%0A%0A%2A" : ""}${"Lista de Artículos"}%3A%2A${cartListforUrl}%0A%0A%2A${
    withDelivery ? "Sub Total" + "%3A%2A%20$" + subTotal + " %0A%0A%2A" : ""
  }${withDelivery ? "Tarifa de Entrega" + "%3A%2A%20$" + shippingCost + " %0A%0A%2A" : ""}${"Total"}%3A%2A%20${total}%0A%0A`;

  return WSP_URL;
}
