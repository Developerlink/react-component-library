import React, { useEffect, useRef, useState, useReducer } from "react";
import styles from "./FormUseReducer.module.css";
import Input from "./Input";

// Every html element has the 'key' and 'ref' prop
const stateReducer = (state, action) => {
  return { ...state, [action.value.name]: action.value.value };
};

const FormUseState = () => {
  const [state, dispatchState] = useReducer(stateReducer, {
    title: "",
    amount: 0,
    date: "",
  });
  const [titleIsValid, setTitleIsValid] = useState("");
  const [amountIsValid, setAmountIsValid] = useState("");
  const [dateIsValid, setDateIsValid] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const validate = (name, value) => {
    if (name === "title") {
      setTitleIsValid(true);
      setTitleErrorMessage("");
      if (value === "") {
        console.log("The title is missing.");
        setTitleErrorMessage(<p>{"The title is missing"}</p>);
        setTitleIsValid(false);
      } else if (10 < value.length) {
        setTitleIsValid(false);
        console.log("The title is too long.");
        setTitleErrorMessage(<p>{"The title is longer than 10 characters"}</p>);
      }
    }
    if (name === "amount") {
      setAmountIsValid(true);
      // The '+' makes it a number if it isn't already
      if (+value < 0 || 10 < +value) {
        setAmountIsValid(false);
        console.log("The amount is not set correctly.");
      }
    }
    if (name === "date") {
      setDateIsValid(true);
      // Min and max value for input already prevents bad data
      // if (value === undefined) {
      //   setDateIsValid(false);
      //   console.log("The date hasn't been set.");
      // }
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    dispatchState({ type: "", value: { name: name, value: value } });
    validate(name, value);
    //console.log(state);
  };

  const onBlurHandler = (event) => {
    const { name, value } = event.target;
    validate(name, value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (titleIsValid && amountIsValid && dateIsValid) {
      // Do something
      console.log("Submitting: ");
      console.log(state);
    } else if (!titleIsValid) {
      titleInputRef.current.focus();
    } else if (!amountIsValid) {
      amountInputRef.current.focus();
    } else {
      dateInputRef.current.focus();
    }
  };

  useEffect(() => {
    console.log(state);
  });

  return (
    <React.Fragment>
      <h2>useReducer</h2>
      <form onSubmit={onSubmitHandler}>
        <Input
          labelText="title"
          name="title"
          type="text"
          value={state.title}
          onChange={onChangeHandler}
          ref={titleInputRef}
          onBlur={onBlurHandler}
          isValid={titleIsValid}
        />
        {!titleIsValid && titleErrorMessage}

        <Input
          labelText="Amount"
          name="amount"
          type="number"
          min="1"
          max="10"
          step="1"
          value={state.amount}
          onChange={onChangeHandler}
          ref={amountInputRef}
          onBlur={onBlurHandler}
          isValid={amountIsValid}
        />

        <Input
          labelText="Date"
          name="date"
          type="date"
          min="2019-01-01"
          max="2022-12-31"
          value={state.date}
          onChange={onChangeHandler}
          ref={dateInputRef}
          isValid={dateIsValid}
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default FormUseState;
