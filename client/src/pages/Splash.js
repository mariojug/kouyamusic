import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../styles/Splash.module.css";
import { GridSpace } from "../utility";

const Splash = () => {
  const PAD_SIZES = {
    xs: 0,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 2,
  };
  return (
    <Container className={styles.splashContainer}>
      <Col className={styles.splashMain} xs={11} md={10} lg={9} xl={8}>
        <Row className={styles.splashTitle}>
          <GridSpace type="col" dim={PAD_SIZES} />
          <Col xs={12} sm={10} md={8}>
            <h1 class="mainTitle" className={styles.titleText}>
              kouya
            </h1>
          </Col>
          <GridSpace type="col" dim={PAD_SIZES} />
          {/* col break */}
          <GridSpace type="col" dim={PAD_SIZES} />
          <Col fluid>
            <i>developer, producer, and musician</i>
          </Col>
          <GridSpace type="col" dim={PAD_SIZES} />
        </Row>
        <Row>
          <h4 className={styles.latestRelease}>latest release</h4>
          <Container className={styles.spotifyContainer}>
            <GridSpace type="col" dim={PAD_SIZES} />

            <Col xs={12} sm={10} md={8}>
              <iframe
                title="kouya - heyy ft. piing"
                src="https://open.spotify.com/embed/track/1LyaJH0bbC1lGsmKcOefba?utm_source=generator"
                width="100%"
                height="80"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </Col>

            <GridSpace type="col" dim={PAD_SIZES} />
          </Container>
        </Row>
      </Col>
    </Container>
  );
};

export default Splash;
