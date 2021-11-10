import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import Styles from "./Modal.module.css";

// className?
// onClose
// onConfirm

const Modal = (props) => {
  const Backdrop = (props) => {
    return <div className={Styles.backdrop} onClick={props.onClose} />;
  };

  const ModalOverlay = (props) => {
    const onClickHandler = () => {
      props.onConfirm();
    };

    return (
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
    );
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose}/>,
        document.getElementById("backdrop-root"))
      }
      {
        ReactDOM.createPortal(<ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("modal-root"))
      }
    </React.Fragment>
  );
};

export default Modal;
