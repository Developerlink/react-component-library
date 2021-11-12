import React, { useEffect, useRef, useState } from "react";
import styles from "./FormUseState.module.css";
import Input from "./Input";

// Every html element has the 'key' and 'ref' prop

const FormuseState = () => {
  const [state, setState] = useState({
    title: "",
    amount: 0,
    date: "",
  });
  const [titleIsTouched, setTitleIsTouched] = useState(false);
  const [amountIsTouched, setAmountIsTouched] = useState(false);
  const [dateIsTouched, setDateIsTouched] = useState(false);
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [amountIsValid, setAmountIsValid] = useState(false);
  const [dateIsValid, setDateIsValid] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formSubmitMessage, setFormSubmitMessage] = useState("");
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const titleInputIsInvalid = !titleIsValid && titleIsTouched;
  const amountInputIsInvalid = !amountIsValid && amountIsTouched;
  const dateInputIsInvalid = !dateIsValid && dateIsTouched;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setState((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const onBlurHandler = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitleIsTouched(true);
    } else if (name === "amount") {
      setAmountIsTouched(true);
    } else if (name === "date") {
      setDateIsTouched(true);
    }
  };

  useEffect(() => {
    setTitleIsValid(true);
    setAmountIsValid(true);
    setDateIsValid(true);

    if (state.title === "") {
      //console.log("The title is missing.");
      setTitleIsValid(false);
      setTitleErrorMessage(
        <p className={styles.error}>{"The title is missing"}</p>
      );
    } else if (10 < state.title.length) {
      //console.log("The title is too long.");
      setTitleIsValid(false);
      setTitleErrorMessage(
        <p className={styles.error}>
          {"The title is longer than 10 characters"}
        </p>
      );
    }

    // The '+' makes it a number if it isn't already
    if (+state.amount < 1 || 100 < +state.amount) {
      setAmountIsValid(false);
      //console.log("The amount is not set correctly.");
    }

    if (state.date === "") {
      setDateIsValid(false);
      //console.log("The date hasn't been set.");
    }

    //console.log(state);
    //console.log(dateIsValid);
  }, [state, titleIsTouched, amountIsTouched, dateIsTouched]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setTitleIsTouched(true);
    setAmountIsTouched(true);
    setDateIsTouched(true);

    setFormIsValid(titleIsValid && amountIsValid && dateIsValid);

    if (formIsValid) {
      // Do something
      setSubmitted(true);
      setFormSubmitMessage(<h3 className={styles.success}>Subtmitted: {JSON.stringify(state)}</h3>);
      setState({
        title: "",
        amount: 0,
        date: "",
      });
      setTitleIsTouched(false);
      setAmountIsTouched(false);
      setDateIsTouched(false);
      setTitleIsValid(false);
      setAmountIsValid(false);
      setDateIsValid(false);
      setFormIsValid(false);
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

  return (
    <React.Fragment>
      <h2>useState</h2>
      {submitted && formSubmitMessage}
      <form onSubmit={onSubmitHandler}>
        <Input
          labelText="Title"
          name="title"
          type="text"
          value={state.title}
          onChange={onChangeHandler}
          ref={titleInputRef}
          onBlur={onBlurHandler}
          isValid={!titleInputIsInvalid}
        />
        {titleInputIsInvalid && titleErrorMessage}

        <Input
          labelText="Amount"
          name="amount"
          type="number"
          min="1"
          max="100"
          step="1"
          value={state.amount}
          onChange={onChangeHandler}
          ref={amountInputRef}
          onBlur={onBlurHandler}
          isValid={!amountInputIsInvalid}
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
          isValid={!dateInputIsInvalid}
        />
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default FormuseState;
