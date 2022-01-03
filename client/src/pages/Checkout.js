import React from "react";
import { useSearchParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { GridSpace } from "../utility";
import styles from "../styles/Checkout.module.css";

const Checkout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pad = { xs: 0, sm: 1, md: 1, lg: 1, xl: 2 };
  // clears localStorage.kouyaCart upon reaching
  if (typeof window !== "undefined" && searchParams.get("success")) {
    localStorage.setItem("kouyaCart", "");
  }

  return (
    <Row>
      {" "}
      <GridSpace dim={pad} type="col" />
      <Col fluid className={styles.content}>
        <h2>Thanks for your purchase!</h2>
        <p>
          An itemized invoice and the links to download your stems have been
          sent to your email. Please contact{" "}
          <a href="mailto:admin@kouyamusic.com">admin@kouyamusic.com</a> or{" "}
          <a href="mailto:mariojjuguilon@gmail.com">mariojjuguilon@gmail.com</a>{" "}
          if you have any questions or concerns regarding your purchase.
        </p>
      </Col>
      <GridSpace dim={pad} type="col" />
    </Row>
  );
};

export default Checkout;
