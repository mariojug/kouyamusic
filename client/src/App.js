import logo from "./logo.svg";
import React from "react";
import { Container } from "react-bootstrap";
import { Navbar } from "./components";
import { About, BeatCatalog, Contact, Splash } from "./pages";
import {
  CartProvider,
  SrcProvider,
  GlobalPlayProvider,
  ModalProvider,
} from "./providers";
import "./styles/App.css";

function App() {
  const checkLocal = () => {
    /**
     * Checks for existence of localStorage variables:
     * - kouyaCart,
     * - kouyaSrc, and
     * - kouyaSrcExpire
     * If either kouyaSrc/kouyaSrcExpire evaluates to false, sets all to ""
     */
    var kouyaSrc = localStorage.kouyaSrc;
    var kouyaSrcExpire = localStorage.kouyaSrcExpire;
    if (!(kouyaSrc && kouyaSrcExpire)) {
      console.log("Defaulting all local variables...");
      localStorage.setItem("kouyaCart", "");
      localStorage.setItem("kouyaSrc", "");
      localStorage.setItem("kouyaSrcExpire", "");
      console.log(
        'localStorage.kouyaCart, .kouyaSrc, and .kouyaSrcExpire set to ""'
      );
    }
  };
  checkLocal();
  return (
    <CartProvider>
      <SrcProvider>
        <GlobalPlayProvider>
          <ModalProvider>
            <Navbar />
            <Splash />
            <About />
            <Contact />
            <BeatCatalog />
          </ModalProvider>
        </GlobalPlayProvider>
      </SrcProvider>
    </CartProvider>
  );
}

export default App;
