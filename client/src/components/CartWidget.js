import React from "react";
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
import PropTypes from "prop-types";
import Hooks from "../hooks";
import styles from "../styles/CartWidget.module.css";

const CartWidget = (props) => {
  const selectFormRef = React.useRef();
  const cartBtnsRef = React.useRef();
  const [inCart, setInCart] = React.useState(true);

  const { cart, leaseOptions, addToCart, removeFromCart } = Hooks.useCart();
  const { handleModalShow } = Hooks.useModal();
  const { getFromSrc, getImage } = Hooks.useSrc();

  const [coverURL, setCoverURL] = React.useState("");
  const [coverExpire, setCoverExpire] = React.useState(0);
  React.useEffect(() => {
    if (!coverURL || !(coverExpire > Date.now()) || coverExpire === 0) {
      getImage(props.id).then((res) => {
        setCoverURL(res.data);
        setCoverExpire(res.expiration);
      });
    }
  }, [coverURL, coverExpire, setCoverExpire, setCoverURL, props.id]);

  const id = props.id;
  const title = getFromSrc(id, "name");

  React.useEffect(() => {
    selectFormRef.current.value = props.type;
  }, [selectFormRef, props.type]);

  const [currentPrice, setCurrentPrice] = React.useState(0);
  React.useEffect(() => {
    if (cart[id]) {
      setCurrentPrice(leaseOptions[cart[id].type].price);
    }
  }, [cart[id], setCurrentPrice]);

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
    addToCart(props.id, title, coll);
  };

  const handleRemoveItem = () => {
    removeFromCart(props.id);
    setInCart(false);
  };

  return (
    <Row className={styles.component}>
      <Col className={styles.mainContentWrap}>
        <Row fluid className={styles.mainContent}>
          <Col fluid xs={12} lg={3}>
            <Image
              fluid
              src={coverURL}
              alt={title + " cover art"}
              className={styles.coverArt}
            />
          </Col>
          <Col fluid className={styles.title} lg={6}>
            <Row>
              <h3 className={styles.titleText}>{title}</h3>
            </Row>

            {inCart ? (
              <Row className={styles.inCartContainer}>
                <Row className={styles.inCartHeader} fluid>
                  <div>IN CART:</div>
                  <div className={styles.inCartText}>
                    {leaseOptions[props.type].descript}
                  </div>
                </Row>
              </Row>
            ) : (
              <></>
            )}
            <Row fluid className={styles.cartFormWrap}>
              <Form.Select ref={selectFormRef} size="sm">
                <option value={0}>{leaseOptions[0].descript}</option>
                <option value={1}>
                  {leaseOptions[1].descript} (${" "}
                  {leaseOptions[1].price.toFixed(2)} USD)
                </option>
                <option value={2}>
                  {leaseOptions[2].descript} (${" "}
                  {leaseOptions[2].price.toFixed(2)} USD)
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
                    update <AddCartIcon />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleRemoveItem}
                    className={styles.cartBtn}
                    size="sm"
                  >
                    remove <RmCartIcon />
                  </Button>
                </ButtonGroup>
              </Container>
            </Row>
          </Col>
          <Col fluid xs={12} lg={3} className={styles.priceContainer}>
            <Row fluid className={styles.priceHeader}>
              {" "}
              <h3>PRICE</h3>
            </Row>
            <Row className={styles.price}>
              <p>${currentPrice.toFixed(2)} USD</p>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default CartWidget;

CartWidget.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
};
