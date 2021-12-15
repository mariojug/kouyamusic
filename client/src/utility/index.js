import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const GridSpace = (props) => {
  if (typeof props.type !== "string") {
    return null;
  }

  const ref = props.dim;

  if (props.type.toLowerCase() === "row") {
    return (
      <Row xs={ref.xs} sm={ref.sm} md={ref.md} lg={ref.lg} xl={ref.xl}>
        {props.children}
        <></>
      </Row>
    );
  } else if (props.type.toLowerCase() === "col") {
    return (
      <Col xs={ref.xs} sm={ref.sm} md={ref.md} lg={ref.lg} xl={ref.xl}>
        {props.children}
        <></>
      </Col>
    );
  } else {
    return (
      <Container xs={ref.xs} sm={ref.sm} md={ref.md} lg={ref.lg} xl={ref.xl}>
        {props.children}
        <></>
      </Container>
    );
  }
};

const CartItem = (id, title, type) => {
  return {
    id: id,
    title: title,
    type: type,
    timeAdded: Date.now(),
  };
};
export { CartItem, GridSpace };
