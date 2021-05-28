import {Modal, Button} from "react-bootstrap";
import React, {useState} from "react";

const RoomSize = (props) => {
  const {show, setShow, setSize} = props;  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const createLine = (e) => {  
    e.preventDefault();
    const { value } = e.target;
    setSize(value);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        사이즈 재설정
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          가로 길이:
          <input
            name="width"
            type="text"
            onChange={createLine}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomSize;