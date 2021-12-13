import logo from "./logo.svg";
import React from "react";
import { Container } from "react-bootstrap";
import { TrackComponent, NavComponent } from "./components";
import { About, BeatCatalog, Contact, Splash } from "./pages";
import {
  CartProvider,
  SrcProvider,
  GlobalPlayProvider,
  ModalProvider,
} from "./providers";
import "./styles/App.css";

function App() {
  return (
    <CartProvider>
      <SrcProvider>
        <GlobalPlayProvider>
          <ModalProvider>
            <NavComponent />
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
