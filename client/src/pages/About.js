import React from "react";
import { Stack, Container, Row, Col } from "react-bootstrap";
import { GridSpace } from "../utility";
import styles from "../styles/About.module.css";

const About = () => {
  const size = { xs: 0, sm: 0, md: 0, lg: 1, xl: 2 };
  return (
    <Container className={styles.aboutContainer}>
      <Stack gap={2}>
        <Row className="header-container">
          <Row className="header-text-wrap">
            <h2 className="header-text">about me</h2>
          </Row>
          <h6>
            <i>MARIO JUGUILON</i>
          </h6>
        </Row>
        <Row className={styles.aboutContent}>
          <GridSpace type="col" dim={size} />
          <Col fluid>
            <p>
              21 y.o fil-am originating from houston, tx. car, music, and tech
              enthusiast.
              <b>
                <i> ut bch + ecs cert c/o '22.</i>
              </b>
            </p>
            <p>
              <b>coding experience:</b> proficient java, javascript, and python.
              intermediate mysql, postgres, mongo, and neo4j.
            </p>
            <p>
              <b> music experience:</b> electronic/trap tracks produced in
              ableton live, fl studio, logic pro. live/session pianist &amp;
              keyboardist since 2014.
            </p>
            <p>
              <b> research+wet lab experience:</b> bch 369l, ut fri nanochem, ut
              project seed.
            </p>
          </Col>
          <GridSpace type="col" dim={size} />
        </Row>
      </Stack>
    </Container>
  );
};

export default About;
