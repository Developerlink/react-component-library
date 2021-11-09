import React from "react";
import Card from "./Card";
import Styles from "./Modal.module.css";

// className?
// title
// message
// onClose

const Modal = (props) => {
  const onClickHandler = () => {
    props.onClose();
  };

  return (
    <div>
      <div className={Styles.backdrop} onClick={onClickHandler} />
      <Card className={Styles.modal}>
        <header>
          <h2>Title</h2>
        </header>
        <div>
          <p>Message</p>
        </div>
        <footer>
          <button onClick={onClickHandler}>Ok</button>
        </footer>
      </Card>
    </div>
  );
};

export default Modal;
