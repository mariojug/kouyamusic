import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { SocialIcons, ProfIcons } from "../components";
import styles from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <Container xs={11} md={10} className={styles.mainContainer}>
      <Row className="header-container">
        <Row className="header-text-wrap">
          <h3 className="header-text">contact info</h3>
        </Row>
        <i>MARIO JUGUILON</i>
      </Row>
      <Row fluid>
        <Col fluid className={styles.cardWrap}>
          <Card body className={styles.card}>
            <Card.Title>music inquiries</Card.Title>
            <Card.Text>
              <a href="mailto:kouyahmusic@gmail.com">kouyahmusic@gmail.com</a>
            </Card.Text>
            <Card.Text>
              <h5>social handles</h5>
              <SocialIcons />
            </Card.Text>
          </Card>
        </Col>
        <Col fluid className={styles.cardWrap}>
          <Card body className={styles.card}>
            <Card.Title>programming inquiries</Card.Title>
            <Card.Text>
              <a href="mailto:mariojjuguilon@gmail.com">
                mariojjuguilon@gmail.com
              </a>
            </Card.Text>
            <Card.Text>
              <h5>more links</h5>
              <ProfIcons />
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
