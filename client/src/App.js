// import logo from "./logo.svg";
import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import {
  About,
  BeatCatalog,
  Checkout,
  Contact,
  Splash,
  UserCart,
  Leases,
} from "./pages";
import {
  CartProvider,
  SrcProvider,
  GlobalPlayProvider,
  ModalProvider,
} from "./providers";
import "./styles/App.css";

const routes = [
  { path: "/", name: "HOME", Component: Splash },
  { path: "/about", name: "ABOUT", Component: About },
  { path: "/contact", name: "CONTACT", Component: Contact },
  { path: "/beat-catalog", name: "BEATS", Component: BeatCatalog },
  { path: "/cart", name: "CART", Component: UserCart },
  { path: "/leases", name: "LEASES", Component: Leases },
  { path: "/checkout", name: "CHECKOUT", Component: Checkout },
];

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
      localStorage.setItem("kouyaSrc", "");
      localStorage.setItem("kouyaSrcExpire", "");
      console.log(
        'localStorage.kouyaCart, .kouyaSrc, and .kouyaSrcExpire set to ""'
      );
    }
  };
  checkLocal();
  return (
    <BrowserRouter>
      <CartProvider>
        <SrcProvider>
          <GlobalPlayProvider>
            <ModalProvider>
              <>
                <Navbar />
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      exact
                      path={route.path}
                      element={
                        <Container className="page">
                          <route.Component />
                        </Container>
                      }
                    />
                  ))}
                </Routes>
              </>
            </ModalProvider>
          </GlobalPlayProvider>
        </SrcProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
