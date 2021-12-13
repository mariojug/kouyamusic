import React from "react";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

import { AudioPlayer } from ".";
import { useCart } from "../hooks";
import styles from "../styles/TrackComponent.module.css";

const TrackComponent = (props) => {
  /**
   * Props:
   * - id (int)
   * - name (string)
   * - audioURL (string)
   * - coverURL (string)
   * - tags (String[])
   * - musicKey (string)
   * - bpm (int)
   */
  const { cart, addToCart, removeFromCart, leaseOptions } = useCart();

  const [isShowingDetails, setShowingDetails] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);

  // react reference for form.select element
  const selectFormRef = React.useRef();

  // formats beat tags into a single string with a hashtag in front of each tag
  const getTags = () => props.tags.map((tag) => `#${tag} `);

  // returns a row of two columns given a key-value pair
  const formatDetail = (k, v) => {
    return (
      <Row>
        <Col md={2} className={styles.detailKey}>
          {k}
        </Col>
        <Col>{v}</Col>
      </Row>
    );
  };

  // assembles rows of track details from props
  const formatDetails = () => {
    return (
      <>
        {formatDetail("key", props.musicKey)}
        {formatDetail("tempo", props.bpm + " bpm")}
        {formatDetail("tags", getTags())}
      </>
    );
  };

  const handleAddToCart = () => {
    const coll = parseInt(selectFormRef.current.value);
    //if a value of 1 or 2 is not detected - no selection made
    if (coll !== 1 && coll !== 2) {
      // warning !
      // please select a lease type before continuing.
    }

    const cartVal = cart[props.id];
    // if the item was already in the cart
    if (cartVal) {
      if (cartVal === coll) {
        // "This lease selection has already been added to your cart. Purchases are limited to one lease per beat."
      } else {
        // "A lease selection has already been added to your cart. This action has updated the lease type for this beat. Purchases are limited to one lease per beat.";
      }
    }
    addToCart(props.id, props.name, coll);
  };

  const handleRemoveItem = () => {
    removeFromCart(props.id);
  };

  return (
    <Row className={styles.component}>
      <Col className={styles.mainContentWrap} xs={12} md={9}>
        {/* mainContentWrap takes up 7-8 on desktop, 12 on mobile */}
        <Row className={styles.mainContent}>
          <Col xs={9} md={4} lg={3}>
            <Image
              fluid
              src={props.coverURL}
              alt={props.name + " cover art"}
              className={styles.coverArt}
            />
          </Col>
          <Col
            className={styles.audioTextContent}
            xs={12}
            sm={10}
            md={8}
            lg={9}
          >
            <Row fluid>
              <AudioPlayer srcUrl={props.audioURL} idx={props.id} />
            </Row>
            <Row fluid className={styles.mainTextContent}>
              <h3 className={styles.titleText}>{props.name.toLowerCase()}</h3>
              <text
                className={styles.showMoreInfo}
                onClick={() => {
                  const prev = isShowingDetails;
                  setShowingDetails(!prev);
                }}
              >
                more info
              </text>
              {isShowingDetails ? (
                <Row className={styles.detailContent} fluid>
                  {formatDetails()}
                </Row>
              ) : (
                <></>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className={styles.cartFormWrap} md={4} lg={3}>
        <Row>
          <Form.Select ref={selectFormRef}>
            <option value={0}>{leaseOptions[0].descript}</option>
            <option value={1}>{leaseOptions[1].descript}</option>
            <option value={2}>{leaseOptions[2].descript}</option>
          </Form.Select>
        </Row>
        <Container fluid className={styles.cartBtnsWrap}>
          <ButtonToolbar>
            <Button
              variant="dark"
              onClick={handleAddToCart}
              className={styles.cartBtn}
            >
              add
            </Button>
            <Button
              variant="danger"
              onClick={handleRemoveItem}
              className={styles.cartBtn}
            >
              remove
            </Button>
          </ButtonToolbar>
        </Container>
      </Col>
    </Row>
  );
};

export default TrackComponent;
