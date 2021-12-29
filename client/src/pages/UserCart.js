import React from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { CartWidget } from "../components";
import Hooks from "../hooks";
import { GridSpace } from "../utility";
import styles from "../styles/UserCart.module.css";

// TODO **FIX**: refreshing page clears cart
// TODO **FIX**: removing item crashes

const UserCart = () => {
  const pad = { xs: 0, sm: 1, md: 1, lg: 1, xl: 2 };

  const { cart, leaseOptions, handleSubmitCheckout } = Hooks.useCart();
  const [cartComponents, setCartComponents] = React.useState([]);
  const checkoutBtnRef = React.useRef();
  const [subtotal, setSubtotal] = React.useState();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);

  React.useEffect(() => {
    if (cart.length === 0) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [cart, setSubmitDisabled]);

  React.useEffect(() => {
    let runningTotal = 0;
    for (var key in cart) {
      runningTotal += leaseOptions[cart[key].type].price;
    }
    setSubtotal(runningTotal);
  }, [cart]);

  React.useEffect(() => {
    if (cart) {
      let componentArray = [];
      for (var key in cart) {
        var item = cart[key];
        componentArray.push(<CartWidget id={item.id} type={item.type} />);
      }
      setCartComponents(componentArray);
    }
  }, [cart]);

  return (
    <Container>
      <Row>
        <GridSpace dim={pad} type="col" />
        <Col fluid>
          {cartComponents ? cartComponents : <></>}
          <Row fluid className={styles.component}>
            <Col fluid className={styles.mainContentWrap}>
              <Row fluid className={styles.subTotalContainer}>
                <Col className={styles.priceHeader}>
                  <h3>subtotal</h3>
                </Col>
                <Col className={styles.price}>${subtotal?.toFixed(2)} USD</Col>
              </Row>
              <Row className={styles.toCheckoutRow}>
                <Button
                  disabled={submitDisabled}
                  ref={checkoutBtnRef}
                  variant="dark"
                  className={styles.checkoutBtn}
                  size="md"
                  onClick={handleSubmitCheckout}
                >
                  Continue to checkout
                </Button>
              </Row>
              <Row className={styles.disclaimerRow}>
                <p>
                  <b>
                    <i>kouyamusic.com</i>
                  </b>{" "}
                  makes use of the{" "}
                  <b>
                    <i>©Stripe</i>
                  </b>{" "}
                  checkout system. Upon continuing, you will be redirected to a
                  private checkout session on{" "}
                  <b>
                    <i>Stripe.com</i>
                  </b>{" "}
                  to complete your checkout.{" "}
                  <b>
                    Do not enter any sensitive information (e.g. your credit
                    card, address, etc.) on any website you do not trust.
                  </b>
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <GridSpace dim={pad} type="col" />
      </Row>
    </Container>
  );
};
export default UserCart;
