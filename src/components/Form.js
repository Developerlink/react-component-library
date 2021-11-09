import React, { useState } from "react";
import Styles from "./Form.module.css";

const Form = () => {
  const [state, setState] = useState({
    title: "",
    amount: 0,
    date: "",
  });
  const [stateIsValid, setStateIsValid] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let stateIsValid = true;

    if (state.title === "") {
      alert("The title is missing");
      stateIsValid = false;
    } else if (100 < state.title.length) {
      stateIsValid = false;
      alert("The title is too long");
    }
    if (state.amount === null) {
      alert("The amount is not set correctly");
      stateIsValid = false;      
    } 
    // The '+' makes it a number if it isn't already 
    else if (+state.amount < 0 || 100000 < state.amount) { 
      stateIsValid = false;
      alert("The amount is not set correctly");
    }

    if (stateIsValid) {
      // Do something
    }
    
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitHandler}>
        <label>Title</label>
        <input
          name="title"
          type="text"
          value={state.title}
          onChange={onChangeHandler}
        />

        <label>Amount</label>
        <input
          name="amount"
          type="number"
          min="1"
          step="1"
          value={state.amount}
          onChange={onChangeHandler}
        />

        <label>Date</label>
        <input
          name="date"
          type="date"
          min="2019-01-01"
          max="2022-12-31"
          value={state.date}
          onChange={onChangeHandler}
        />

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default Form;
