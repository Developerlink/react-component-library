import React from "react";
import { useState } from "react/cjs/react.development";
import Modal from "./Modal";

const ModalExample = (props) => {
  const [showModal, setShowModal] = useState(false);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <button onClick={openModalHandler}>Open modal</button>
      {showModal && <Modal onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default ModalExample;
