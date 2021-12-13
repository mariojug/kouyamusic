import React from "react";
import { CartContext } from "../contexts";
import CartItem from "../templates/CartObject";

const CartProvider = ({ children }) => {
  const [cart, updateCart] = React.useState({});
  const [cartTotal, updateCartTotal] = React.useState(0);

  const leaseOptions = {
    0: { price: 0, descript: "select lease" },
    1: { price: 40, descript: "$ 40 usd | .mp3 lease + stems" },
    2: { price: 85, descript: "$ 85 usd | .wav lease + stems" },
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.kouyaCart);
      if (localCart) {
        updateCart(localCart);
      }
    }
  }, []);

  React.useEffect(() => {
    // save current cart to localstorage
    if (typeof window !== "undefined" && cart) {
      localStorage.kouyaCart = JSON.stringify(cart);
    }
  }, [cart]);

  React.useEffect(() => {
    let tot = 0;
    for (let [key, value] of Object.entries(cart)) {
      tot = tot + leaseOptions[value.type].price;
    }
    updateCartTotal(tot);
  }, [cart, leaseOptions]);

  const addToCart = (id, title, leaseTypeId) => {
    let newCart = { ...cart };
    newCart[id] = CartItem(id, title, leaseTypeId);
    updateCart(newCart);
  };

  const removeFromCart = (id) => {
    let newCart = { ...cart };
    delete newCart[id];
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
  };

  const isInCart = (id) => {
    const truthArr = cart.map((item) => item.id === id);
    return truthArr.some();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        leaseOptions,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
