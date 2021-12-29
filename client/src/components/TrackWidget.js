import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import {
  MdOutlineAddShoppingCart as AddCartIcon,
  MdOutlineRemoveShoppingCart as RmCartIcon,
} from "react-icons/md";

import { AudioPlayer } from ".";
import Hooks from "../hooks";
import styles from "../styles/TrackWidget.module.css";

const TrackWidget = (props) => {
  const { cart, addToCart, removeFromCart, leaseOptions } = Hooks.useCart();
  const { getFromSrc, getImage } = Hooks.useSrc();
  const { handleModalShow } = Hooks.useModal();

  const [isShowingDetails, setShowingDetails] = React.useState(false);
  const [inCart, setInCart] = React.useState(false);

  const [coverURL, setCoverURL] = React.useState("");
  const [coverExpire, setCoverExpire] = React.useState(0);
  React.useEffect(() => {
    if (!coverURL || !(coverExpire > Date.now()) || coverExpire === 0) {
      getImage(props.id).then((res) => {
        console.log("here");
        console.log(res.data);
        setCoverURL(res.data);
        setCoverExpire(res.expiration);
      });
    }
  }, [coverURL, coverExpire, setCoverExpire, setCoverURL, props.id]);

  const trackParams = ["name", "tags", "musicKey", "bpm"];
  const trackDetails = {};
  trackParams.forEach((param) => {
    trackDetails[param] = getFromSrc(props.id, param);
  });

  React.useEffect(() => {
    if (cart[props.id]) {
      setInCart(true);
      selectFormRef.current.value = cart[props.id].type;
    } else {
      setInCart(false);
    }
  }, [cart, props.id]);

  // react reference for form.select element
  const selectFormRef = React.useRef();
  // reference for cart button element group
  const cartBtnsRef = React.useRef();

  // formats beat tags into a single string with a hashtag in front of each tag
  const getTags = () => trackDetails.tags.map((tag) => `#${tag} `);

  // returns a row of two columns given a key-value pair
  const formatDetail = (k, v) => {
    return (
      <Row>
        <Col md={3} className={styles.detailKey}>
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
        {formatDetail("key", trackDetails.musicKey)}
        {formatDetail("tempo", trackDetails.bpm + " bpm")}
        {formatDetail("tags", getTags())}
      </>
    );
  };

  const handleAddToCart = () => {
    const coll = parseInt(selectFormRef.current.value);
    //if a value of 1 or 2 is not detected - no selection made
    if (coll !== 1 && coll !== 2) {
      handleModalShow(
        "warning",
        "please select a lease type before continuing."
      );
      return null;
    }

    const cartVal = cart[props.id];
    // if the item was already in the cart
    if (cartVal) {
      if (cartVal.type === coll) {
        handleModalShow(
          "warning",
          "this selection is already in your cart. purchases are limited to one lease per beat."
        );
      } else {
        handleModalShow(
          "warning",
          "this action updated the lease type in your cart. purchases are limited to one lease per beat."
        );
      }
    }
    setInCart(true);
    addToCart(props.id, trackDetails.name, coll);
  };

  const handleRemoveItem = () => {
    removeFromCart(props.id);
    setInCart(false);
  };

  return (
    <Row className={styles.component}>
      <Col className={styles.mainContentWrap} fluid xs={12} md={8}>
        <Row fluid className={styles.mainContent}>
          <Col xs={12} sm={8} md={4} lg={4} xl={4}>
            <Image
              fluid
              src={coverURL}
              alt={trackDetails.name + " cover art"}
              className={styles.coverArt}
            />
          </Col>
          <Col
            className={styles.audioTextContent}
            xs={12}
            sm={10}
            md={7}
            lg={7}
          >
            <Row fluid>
              <AudioPlayer idx={props.id} />
            </Row>
            <Row fluid className={styles.mainTextContent}>
              <h3 className={styles.titleText}>
                {trackDetails.name.toLowerCase()}
              </h3>
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
                <Container className={styles.detailContent} fluid>
                  {formatDetails()}
                </Container>
              ) : (
                <></>
              )}
            </Row>
          </Col>
        </Row>
      </Col>
      <Col className={styles.cartFormWrap} xs={12} sm={12} md={3} lg={3} xl={3}>
        <Form.Select ref={selectFormRef} size="sm">
          <option value={0}>{leaseOptions[0].descript}</option>
          <option value={1}>
            {leaseOptions[1].descript} ($ {leaseOptions[1].price.toFixed(2)}{" "}
            USD)
          </option>
          <option value={2}>
            {leaseOptions[2].descript}($ {leaseOptions[2].price.toFixed(2)} USD)
          </option>
        </Form.Select>
        <Container fluid className={styles.cartBtnsWrap}>
          <ButtonGroup
            ref={cartBtnsRef}
            fluid
            className={styles.cartBtnToolbar}
          >
            <Button
              variant="dark"
              onClick={handleAddToCart}
              className={styles.cartBtn}
              size="sm"
            >
              add <AddCartIcon />
            </Button>
            {inCart ? (
              <Button
                variant="danger"
                onClick={handleRemoveItem}
                className={styles.cartBtn}
                size="sm"
              >
                remove <RmCartIcon />
              </Button>
            ) : (
              <></>
            )}
          </ButtonGroup>
        </Container>
        {inCart ? (
          <Container className={styles.inCartContainer}>
            <text className={styles.inCartHeader}>IN CART:</text>
            <text className={styles.inCartText}>
              {leaseOptions[cart[props.id].type].descript}
            </text>
          </Container>
        ) : (
          <></>
        )}
      </Col>
    </Row>
  );
};

export default TrackWidget;

TrackWidget.propTypes = {
  id: PropTypes.number.isRequired,
};
