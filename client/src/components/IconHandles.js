import React from "react";
import {
  SiSpotify as Spotify,
  SiApplemusic as Applemusic,
  SiGithub as Github,
  SiLinkedin as Linkedin,
  SiHandshake as Handshake,
} from "react-icons/si";
import { ImSoundcloud2 as Soundcloud } from "react-icons/im";
import { FaBandcamp as Bandcamp } from "react-icons/fa";
import { RiInstagramFill as Instagram } from "react-icons/ri";
import { Container } from "react-bootstrap";
import styles from "../styles/Icons.module.css";

// TODO: fill out all of these links
const icons = {
  spotify: (
    <a
      href="https://open.spotify.com/artist/6hkz5y5BVt1YkVlFJ8fk4A?si=H4BTfm6XQheprCM5h4XpCw"
      className={styles.spotify}
      target="_blank"
    >
      <Spotify />
    </a>
  ),
  applemusic: (
    <a
      href="https://music.apple.com/us/artist/kouya/id1471742584"
      className={styles.applemusic}
      target="_blank"
    >
      <Applemusic />
    </a>
  ),
  soundcloud: (
    <a
      href="https://soundcloud.com/kouyamusic"
      className={styles.soundcloud}
      target="_blank"
    >
      <Soundcloud />
    </a>
  ),
  bandcamp: (
    <a
      href="https://kouyamusic.bandcamp.com"
      className={styles.bandcamp}
      target="_blank"
    >
      <Bandcamp />
    </a>
  ),
  instagram: (
    <a
      href="https://instagram.com/kouya.j/"
      className={styles.instagram}
      target="_blank"
    >
      <Instagram />
    </a>
  ),
  github: (
    <a
      href="https://github.com/mariojug"
      className={styles.github}
      target="_blank"
    >
      <Github />
    </a>
  ),
  linkedin: (
    <a
      href="https://www.linkedin.com/in/mario-joseph-juguilon/"
      className={styles.linkedin}
      target="_blank"
    >
      <Linkedin />
    </a>
  ),
  handshake: (
    <a
      href="https://utaustin.joinhandshake.com/users/15473187"
      className={styles.handshake}
      target="_blank"
    >
      <Handshake />
    </a>
  ),
};

const SocialIcons = () => {
  return (
    <Container className={styles.iconContainer}>
      {icons.spotify}
      {icons.applemusic}
      {icons.soundcloud}
      {icons.bandcamp}
      {icons.instagram}
    </Container>
  );
};
const ProfIcons = () => {
  return (
    <Container className={styles.iconContainer}>
      {icons.github}
      {icons.linkedin}
      {icons.handshake}
    </Container>
  );
};
const AllIcons = () => {
  return (
    <Container className={styles.iconContainer}>
      {SocialIcons}
      {ProfIcons}
    </Container>
  );
};

export { SocialIcons, ProfIcons, AllIcons };
