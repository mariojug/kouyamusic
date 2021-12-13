/** Based on https://www.youtube.com/watch?v=sqpg1qzJCGQ */
import React, { useState, useRef } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FaPlay, FaPause } from "react-icons/fa";
import { useGlobalPlay } from "../hooks";

import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = (props) => {
  /**
   * Props:
   * - srcUrl (string)
   * - idx (int) (trackcomponent.props.id)
   */
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();

  const { playArray, setPlayArray } = useGlobalPlay();

  React.useEffect(() => {
    if (playArray && isPlaying !== playArray[props.idx]) {
      setIsPlaying(false);

      let newPlayArray = [...playArray];
      newPlayArray[props.idx] = false;

      setPlayArray(newPlayArray);

      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [playArray, isPlaying, setPlayArray, props.idx]);

  const endPlayback = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
  };

  const loadDurationUI = () => {
    const sec = Math.floor(audioPlayer.current.duration);

    setDuration(sec);
    progressBar.current.max = sec;
  };

  const togglePlayPause = () => {
    let newPlayArray;
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);

      newPlayArray = new Array(playArray.length).fill(false);
      newPlayArray[props.idx] = true;

      setPlayArray(newPlayArray);
    } else {
      newPlayArray = [...playArray];
      newPlayArray[props.idx] = false;

      setPlayArray(newPlayArray);
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    setPlayerTimeUI();
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;

    setPlayerTimeUI();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const setPlayerTimeUI = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.currentTime / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <Container fluid>
      <audio
        ref={audioPlayer}
        src={props.srcUrl}
        preload="metadata"
        onPlay={loadDurationUI}
        onLoadedMetadata={loadDurationUI}
        onEnded={endPlayback}
      />
      <Row fluid className={styles.audioPlayer}>
        {/*      play/pause     */}
        <Col xs={2}>
          <button xs={1} onClick={togglePlayPause} className={styles.playPause}>
            {isPlaying ? (
              <FaPause className={styles.pause} />
            ) : (
              <FaPlay className={styles.play} />
            )}
          </button>
        </Col>

        {/**    current time    */}
        <Col xs={3} className={styles.currentTime}>
          {calculateTime(currentTime)}
        </Col>

        {/**    progress bar    */}
        <Col fluid>
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </Col>

        {/**      duration      */}
        <Col xs={3} className={styles.duration}>
          {!isNaN(duration) && calculateTime(duration)}
        </Col>
      </Row>
    </Container>
  );
};

export default AudioPlayer;
