import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "../styles/NavComponent.module.css";

const NavComponent = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/" className={styles.navTitle}>
            kouya
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nbdd" />
          <Navbar.Collapse id="nbdd">
            <Nav className="me-auto">
              <Nav.Link href="/about">ABOUT</Nav.Link>
              <Nav.Link href="/contact">CONTACT</Nav.Link>
              <Nav.Link href="/beat-catalog">BEATS</Nav.Link>
              <Nav.Link href="/cart">CART</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className={styles.empty} />
    </>
  );
};

export default NavComponent;
