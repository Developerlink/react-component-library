import React from "react";
import Styles from "./Button.module.css";


// className?
// type
// onClick

const Button = (props) => {
  return (
    <button
      className={`${Styles.button} ${props.className}`}
      type={props.type || "button"}
      onClick={props.onClick}
    >{props.children}</button>
  );
};

export default Button;
