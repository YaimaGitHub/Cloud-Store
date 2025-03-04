import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head'
import theme from "../theme"

function App({ Component, pageProps }) {
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    cuit: '',
    whatsapp: '',
    email: '',
    address: '',
    zipCode: '',
    city: '',
    province: '',
    shipping: true,
  });
  const [productOnHover, setProductOnHover] = useState();

  const [cart, setCart] = useState([]);
  const handleAddToCart = (clickedItem) => {
    setCart((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.title === clickedItem.title);
      if (isItemInCart) {
        return prev.map((item) => (item.title === clickedItem.title
          ? { ...item, amount: item.amount + 1 }
          : item));
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (title) => {
    setCart((prev) => (
      prev.reduce((counter, item) => {
        if (item.title === title) {
          if (item.amount === 1) return counter;
          return [...counter, { ...item, amount: item.amount - 1 }];
        }
        return [...counter, item];
      }, [])
    ));
  };

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Tienda Gecomm</title>
        <meta name="tienda gecomm" content="mayorista en telecomunicaciones" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component
        {...pageProps}
        handleRemoveFromCart={handleRemoveFromCart}
        handleAddToCart={handleAddToCart}
        cart={cart}
        clientInfo={clientInfo}
        setClientInfo={setClientInfo}
        productOnHover={productOnHover}
        setProductOnHover={setProductOnHover}
      />
    </ChakraProvider>
  );
}

export default App;
