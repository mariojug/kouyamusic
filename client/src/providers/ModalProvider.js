import React from "react";
import { Modal } from "react-bootstrap";
import { ModalContext } from "../contexts";

const ModalProvider = ({ children }) => {
  const [show, setShow] = React.useState(false);
  const [header, setModalHeader] = React.useState("");
  const [body, setModalBody] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleModalShow = (header, body) => {
    setModalHeader(header);
    setModalBody(body);
    handleShow();
  };

  const exports = {
    handleModalShow,
  };

  return (
    <ModalContext.Provider value={exports}>
      {children}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;
