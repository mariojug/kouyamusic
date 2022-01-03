import React from "react";
import { CartContext } from "../contexts";
import { CartItem } from "../utility";
import config from "../config";
import axios from "axios";

var API_URL;

if (config.TESTING) {
  API_URL = "http://localhost:8080/api/beatstore";
} else {
  API_URL = "/api/beatstore";
}
const CartProvider = ({ children }) => {
  const [cart, updateCart] = React.useState({});
  const [cartTotal, updateCartTotal] = React.useState(0);

  const leaseOptions = React.useMemo(() => {
    return [
      { price: 0, descript: "select lease" },
      { price: 40, descript: ".mp3 lease + master track" },
      { price: 85, descript: ".wav lease + stems" },
    ];
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // attempts to read in kouyaCart object and update cart state
        updateCart(JSON.parse(localStorage.kouyaCart));
      } catch (error) {
        console.log("Error reading localStorage.kouyaCart");
        console.log(error);
        localStorage.setItem("kouyaCart", "{}");
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

  const handleCheckout = (email) => {
    // make axios post to /create-checkout-session
    axios.post(API_URL + "/create-checkout-session", {
      email: email,
      cart: cart,
    });
  };

  const exports = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    leaseOptions,
    cartTotal,
    handleCheckout,
  };

  return (
    <CartContext.Provider value={exports}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
