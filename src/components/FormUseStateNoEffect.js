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
  const [submitted, setSubmitted] = useState(false);
  const [formSubmitMessage, setFormSubmitMessage] = useState("");
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  let titleIsValid = false;
  let titleErrorMessage = "";
  if (state.title === "") {
    titleIsValid = false;
    titleErrorMessage = (
      <p className={styles.error}>{"The title is missing"}</p>
    );
  } else if (state.title.length > 10) {
    titleIsValid = false;
    titleErrorMessage = (
      <p className={styles.error}>{"The title is longer than 10 characters"}</p>
    );
  } else {
    titleIsValid = true;
  }   
  const titleInputIsInvalid = !titleIsValid && titleIsTouched;

  let amountIsValid = false;
  let amountErrorMessage = "";
  if (+state.amount < 1 || 100 < +state.amount) {
    amountIsValid = false;
    amountErrorMessage = <p className={styles.error}>{"The amount must be between 1 and 100"}</p>;
  } else {
    amountIsValid = true;
  }
  const amountInputIsInvalid = !amountIsValid && amountIsTouched;

  let dateIsValid = false;
  console.log(state.date);
  let dateErrorMessage = "";
  if (state.date === "") {
    dateIsValid = false;
    dateErrorMessage = 
    amountErrorMessage = <p className={styles.error}>{"The date must be filled."}</p>;
  } else {
    dateIsValid = true;
  }
  const dateInputIsInvalid = !dateIsValid && dateIsTouched;

  let formIsValid = false;
  formIsValid = titleIsValid && amountIsValid && dateIsValid;

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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    setTitleIsTouched(true);
    setAmountIsTouched(true);
    setDateIsTouched(true);

    if (formIsValid) {
      // Do something
      setSubmitted(true);
      setFormSubmitMessage(
        <h3 className={styles.success}>Submitted: {JSON.stringify(state)}</h3>
      );
      setState({
        title: "",
        amount: 0,
        date: "",
      });
      setTitleIsTouched(false);
      setAmountIsTouched(false);
      setDateIsTouched(false);
      console.log("Submitting: ");
      console.log(state);
      //This logic is not necessary if button is disabled by formIsValid state.
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
      <h2>useState No effect</h2>
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
        {amountInputIsInvalid && amountErrorMessage}

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
        {dateInputIsInvalid && dateErrorMessage}

        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default FormuseState;
