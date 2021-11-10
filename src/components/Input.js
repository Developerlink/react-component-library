import React, { useImperativeHandle } from "react";
import { useRef } from "react/cjs/react.development";
import styles from "./Input.module.css";

// labelText
// name
// type
// value
// onChange
// onBlur
// ref
// min?
// max?
// step?
// isValid?


const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };
 
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
    className={`${styles.control} ${ props.isValid === false ? styles.invalid : ""
    }`}
  >
    <label htmlFor={props.htmlFor}>{props.labelText}</label>
    <input 
    ref={inputRef}
      name={props.name}
      type={props.type}
      value={props.value}
      min={props.min}
      max={props.max}
      step={props.step}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  </div>
  )
});

export default Input;
