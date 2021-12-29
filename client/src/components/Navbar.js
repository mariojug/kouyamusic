import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { About, BeatCatalog, Contact, Splash, UserCart } from "../pages";
import styles from "../styles/NavComponent.module.css";

const routes = [
  { path: "/", name: "HOME", Component: Splash },
  { path: "/about", name: "ABOUT", Component: About },
  { path: "/contact", name: "CONTACT", Component: Contact },
  { path: "/beat-catalog", name: "BEATS", Component: BeatCatalog },
  { path: "/cart", name: "CART", Component: UserCart },
];

const NavComponent = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand
            key={routes[0].path}
            as={NavLink}
            to={routes[0].path}
            className={styles.navTitle}
            activeClassName="active"
            exact
          >
            kouya
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nbdd" />
          <Navbar.Collapse id="nbdd">
            <Nav className="me-auto">
              {routes.slice(1).map((route) => (
                <Nav.Link
                  key={route.path}
                  as={NavLink}
                  to={route.path}
                  activeClassName="active"
                  exact
                >
                  {route.name}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className={styles.empty} />
    </>
  );
};

export default NavComponent;
