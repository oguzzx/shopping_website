import React, { createContext, useEffect, useState } from "react";

//create context
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // total price state
  const [total, setTotal] = useState(0);
  useEffect(()=>{
    const total = cart.reduce((total, item) => total + item.price * item.amount, 0);
    setTotal(total);
  },[cart])

  // update item amount
  useEffect(() => {
    setItemAmount(cart.reduce((total, item) => total + item.amount, 0));
  }, [cart]);

  // add to cart
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    //check if the item is already in the cart
    const isInCart = cart.find((item) => item.id === id);
    if (isInCart) {
      setCart(
        cart.map((item) => {
          return item.id === id
            ? { ...item, amount: item.amount + 1 }
            : { ...item };
        })
      );
    }
    // if not, add it to the cart
    else {
      setCart([...cart, newItem]);
    }
  };

  // remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id) => {
    setCart(
      cart.map((item) => {
        return item.id === id
          ? { ...item, amount: item.amount + 1 }
          : { ...item };
      })
    );
  };

  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) => {
          return item.id === id
            ? { ...item, amount: item.amount - 1 }
            : { ...item };
        })
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
