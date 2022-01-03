/** Based on https://www.youtube.com/watch?v=sqpg1qzJCGQ */
import React from "react";
import PropTypes from "prop-types";
import { Container, Col, Row } from "react-bootstrap";
import { FaPlay, FaPause } from "react-icons/fa";
import Hooks from "../hooks";

import styles from "../styles/AudioPlayer.module.css";

const AudioPlayer = (props) => {
  // state
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [audioURL, setAudioURL] = React.useState();
  const [audioExpire, setAudioExpire] = React.useState(0);

  const audioExpired = React.useCallback(
    () => audioExpire < Date.now(),
    [audioExpire]
  );

  // references
  const audioPlayer = React.useRef();
  const progressBar = React.useRef();
  const animationRef = React.useRef();

  const { playArray, setPlayArray } = Hooks.useGlobalPlay();
  const { getAudio } = Hooks.useSrc();

  React.useEffect(() => {
    if (!audioURL || !(audioExpire > Date.now()) || audioExpire === 0) {
      getAudio(props.idx).then((res) => {
        setAudioURL(res.data);
        setAudioExpire(res.expiration);
      });
    }
  }, [audioExpire, setAudioURL, props.idx, audioURL, getAudio]);

  React.useEffect(() => {
    if (playArray && isPlaying !== playArray[props.idx]) {
      setIsPlaying(false);

      let newPlayArray = [...playArray];
      newPlayArray[props.idx] = false;

      setPlayArray(newPlayArray);

      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    // cleanup function
    return function cleanup() {
      // setIsPlaying(false);
    };
  }, [playArray, isPlaying, setPlayArray, props.idx]);

  React.useEffect(() => {
    if (isPlaying && audioExpired()) {
      setIsPlaying(false);
    }
  }, [isPlaying, audioExpired]);

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
    if (!audioPlayer || !progressBar) {
      return null;
    }
    audioPlayer.current.currentTime = progressBar.current.value;
    setPlayerTimeUI();
  };

  const whilePlaying = () => {
    if (progressBar?.current) {
      progressBar.current.value = audioPlayer?.current
        ? audioPlayer.current.currentTime
        : 0;
    }

    setPlayerTimeUI();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const setPlayerTimeUI = () => {
    if (progressBar?.current) {
      progressBar.current.style.setProperty(
        "--seek-before-width",
        `${(progressBar.current.currentTime / duration) * 100}%`
      );
      setCurrentTime(progressBar.current.value);
    }
  };

  return (
    <Container fluid>
      <audio
        ref={audioPlayer}
        src={audioURL}
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
AudioPlayer.propTypes = {
  idx: PropTypes.number,
};
