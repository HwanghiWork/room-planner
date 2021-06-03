import {Modal, Button} from "react-bootstrap";
import React, {useState} from "react";

const RoomScale = (props) => {
  const {scale, setScale} = props;
  const [show, setShow] = useState(false);
  const [size, setSize] = useState(0);
  
  const typeSize = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setSize(value);
  }
  const handleShow = () => setShow(true);
  const handleCancel = () => setShow(false);
  const handleSave = () => {
    setScale(size > 0 ? window.innerWidth * 0.6 / size : scale);
    setShow(false);
  }
  return (
    <>
      <button onClick={handleShow}>
        도면 사이즈 설정
      </button>

      <Modal show={show} onHide={handleCancel} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>초기 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>도면 가로 기준  :  </span> 
          <input
            name="width"
            type="number"
            onChange={typeSize}
          />
          mm
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSave}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomScale;