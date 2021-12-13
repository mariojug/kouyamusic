import React from "react";
import { Container, Row } from "react-bootstrap";

import { GlobalPlayProvider } from "../providers";
import { useGlobalPlay, useSrc } from "../hooks";
import { TrackComponent } from "../components";
import styles from "../styles/BeatCatalog.module.css";

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

  return (
    <GlobalPlayProvider>
      <Container fluid className={styles.listings}>
        <Row className="header-container">
          <Row className="header-text-wrap">
            <h3 className="header-text">beat catalog</h3>
          </Row>
        </Row>
        {beatComponents}
      </Container>
    </GlobalPlayProvider>
  );
};

export default BeatCatalog;
