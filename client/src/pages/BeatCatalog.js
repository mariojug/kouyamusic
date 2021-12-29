import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import hooks from "../hooks";
import { TrackWidget } from "../components";
import { GridSpace } from "../utility";
import styles from "../styles/BeatCatalog.module.css";

const BeatCatalog = () => {
  const [beatComponents, setBeatComponents] = React.useState(<span />);
  const { setPlayArray } = hooks.useGlobalPlay();
  const { srcContent, getAudio } = hooks.useSrc();

  React.useEffect(() => {
    getAudio(1);
    let componentArray = [];

    for (const [key, item] of Object.entries(srcContent)) {
      componentArray.push(<TrackWidget id={parseInt(key)} key={key + "bc"} />);
    }
    setBeatComponents(componentArray);
    const newPlayArray = new Array(componentArray.length).fill(false);
    setPlayArray(newPlayArray);
  }, [srcContent, setPlayArray, setBeatComponents]);

  const pad = { xs: 0, sm: 1, md: 1, lg: 1, xl: 2 };

  return (
    <Container fluid className={styles.listings}>
      <Container>
        <Row className="header-container">
          <Row className="header-text-wrap">
            <h3 className="header-text">beat catalog</h3>
          </Row>
        </Row>
        <Row>
          <GridSpace dim={pad} />
          <Col fluid>{beatComponents}</Col>
          <GridSpace dim={pad} />
        </Row>
      </Container>
    </Container>
  );
};

export default BeatCatalog;
