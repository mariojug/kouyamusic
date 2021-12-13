import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useGlobalPlay, useSrc } from "../hooks";
import { TrackComponent } from "../components";
import { GridSpace } from "../utility";
import styles from "../styles/BeatCatalog.module.css";

const EmptyCol = (props) => {
  const ref = props.dim;
  return (
    <Col xs={ref.xs} sm={ref.sm} md={ref.md} lg={ref.lg} xl={ref.xl}>
      {props.children}{" "}
    </Col>
  );
};

const BeatCatalog = () => {
  const [beatComponents, setBeatComponents] = React.useState(<span />);
  const { setPlayArray } = useGlobalPlay();
  const { srcContent } = useSrc();

  React.useEffect(() => {
    let componentArray = [];

    for (const [key, item] of Object.entries(srcContent)) {
      componentArray.push(
        <TrackComponent
          id={key}
          audioURL={item.audioURL}
          name={item.name}
          tags={item.tags}
          musicKey={item.musicKey}
          bpm={item.bpm}
          coverURL={item.coverURL}
          key={key + "bc"}
        />
      );
    }
    setBeatComponents(componentArray);
    const newPlayArray = new Array(componentArray.length).fill(false);
    setPlayArray(newPlayArray);
  }, [srcContent, setPlayArray, setBeatComponents]);

  const pad = { xs: 0, sm: 1, md: 1, lg: 1, xl: 2 };

  return (
    <Container fluid className={styles.listings}>
      <Row className="header-container">
        <Row className="header-text-wrap">
          <h3 className="header-text">beat catalog</h3>
        </Row>
      </Row>
      <Row>
        <EmptyCol dim={pad} />
        <Col fluid>{beatComponents}</Col>
        <EmptyCol dim={pad} />
      </Row>
    </Container>
  );
};

export default BeatCatalog;
