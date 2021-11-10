import React from "react";
import { useState } from "react/cjs/react.development";
import Modal from "./Modal";

const ModalExample = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const confirmModalHandler = () => {
    setShowModal(false);
    // Do something.
  }

  return (
    <React.Fragment>
      <button onClick={openModalHandler}>Open modal</button>
      {showModal && <Modal onClose={closeModalHandler} onConfirm={confirmModalHandler}/>}
    </React.Fragment>
  );
};

export default ModalExample;
