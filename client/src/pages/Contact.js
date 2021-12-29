import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { SocialIcons, ProfIcons } from "../components";
import { GridSpace } from "../utility";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  const CARD_PAD_SIZES = { xs: 0, sm: 0, md: 0, lg: 0, xl: 1 };
  return (
    <Container xs={11} md={10} className={styles.mainContainer}>
      <Row className="header-container">
        <Row className="header-text-wrap">
          <h3 className="header-text">contact info</h3>
        </Row>
        <i>MARIO JUGUILON</i>
      </Row>
      <Row fluid className={styles.cardContainer}>
        <Col fluid className={styles.cardWrap}>
          <Card body className={styles.card}>
            <Card.Title className={styles.cardTitle}>
              music inquiries
            </Card.Title>
            <Card.Text>
              <a href="mailto:kouyahmusic@gmail.com">kouyahmusic@gmail.com</a>
            </Card.Text>
            <Card.Title>
              <h5>social handles</h5>
              <SocialIcons />
            </Card.Title>
          </Card>
        </Col>
        <Col fluid className={styles.cardWrap}>
          <Card body className={styles.card}>
            <Card.Title className={styles.cardTitle}>
              programming inquiries
            </Card.Title>
            <Card.Text>
              <a href="mailto:mariojjuguilon@gmail.com">
                mariojjuguilon@gmail.com
              </a>
            </Card.Text>
            <Card.Title className={styles.cardTitle}>
              <h5>more links</h5>
            </Card.Title>
            <Card.Text>
              <ProfIcons />
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
