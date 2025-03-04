import React from 'react';
import CartItem from './CartItem';

function Cart({ cart, handleRemoveFromCart, handleAddToCart }) {
  return (
    <>
      {cart.map((item) => (
        <CartItem
          key={item.title}
          item={item}
          handleAddToCart={handleAddToCart}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
    </>
  );
}

export default Cart;
