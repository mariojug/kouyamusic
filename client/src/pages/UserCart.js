import React from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { CartWidget } from "../components";
import Hooks from "../hooks";
import { GridSpace } from "../utility";
import styles from "../styles/UserCart.module.css";

const UserCart = () => {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const pad = { xs: 0, sm: 1, md: 1, lg: 1, xl: 2 };

  const { cart, leaseOptions, handleCheckout } = Hooks.useCart();
  const [cartComponents, setCartComponents] = React.useState([]);
  const checkoutBtnRef = React.useRef();
  const [subtotal, setSubtotal] = React.useState();
  const [submitEnabled, setSubmitEnabled] = React.useState(true);
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const emailFormRef = React.useRef();

  React.useEffect(() => {
    if (cart.length > 0 || emailIsValid) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [emailIsValid, cart, setSubmitEnabled]);

  React.useEffect(() => {
    let runningTotal = 0;
    for (var key in cart) {
      runningTotal += leaseOptions[cart[key].type].price;
    }
    setSubtotal(runningTotal);
  }, [cart, leaseOptions]);

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

  const handleEmailUpdate = () => {
    if (validateEmail(emailFormRef.current.value)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const handleSubmitCheckout = () => {
    handleCheckout(emailFormRef.current.value);
  };

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
                <Col className={styles.checkoutCol}>
                  <Form.Group
                    controlId="formBasicEmail"
                    className={styles.checkoutForm}
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      ref={emailFormRef}
                      onKeyPress={handleEmailUpdate}
                    />
                    <Form.Text className="text-muted">
                      Download links will be sent to this email. Your email will
                      not be shared outside this website and its resources.
                    </Form.Text>
                    <Button
                      disabled={!submitEnabled}
                      ref={checkoutBtnRef}
                      variant="dark"
                      className={styles.checkoutBtn}
                      size="md"
                      onClick={handleSubmitCheckout}
                    >
                      Continue to checkout
                    </Button>
                  </Form.Group>
                </Col>
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
