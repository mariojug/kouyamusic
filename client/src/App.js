import logo from "./logo.svg";
import React from "react";
import { Container } from "react-bootstrap";
import { TrackComponent, NavComponent } from "./components";
import { About, BeatCatalog, Contact, Splash } from "./pages";
import { CartProvider, SrcProvider, GlobalPlayProvider } from "./providers";
import "./styles/App.css";

function App() {
  return (
    <CartProvider>
      <SrcProvider>
        <GlobalPlayProvider>
          <NavComponent />
          <Splash />
          <About />
          <Contact />
          <BeatCatalog />
        </GlobalPlayProvider>
      </SrcProvider>
    </CartProvider>
  );
}

export default App;
