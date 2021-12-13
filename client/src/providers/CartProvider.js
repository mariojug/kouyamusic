import React from "react";
import { CartContext } from "../contexts";
import CartItem from "../templates/CartObject";

const CartProvider = ({ children }) => {
  const [cart, updateCart] = React.useState({});
  const [cartTotal, updateCartTotal] = React.useState(0);

  const leaseOptions = React.useMemo(() => {
    return [
      { price: 0, descript: "select lease" },
      { price: 40, descript: "$ 40 usd | .mp3 lease + stems" },
      { price: 85, descript: "$ 85 usd | .wav lease + stems" },
    ];
  }, []);

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
    return cart.map((item) => item.id === id).some();
  };

  const exports = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    leaseOptions,
    cartTotal,
  };

  return (
    <CartContext.Provider value={exports}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
