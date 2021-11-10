import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "./Input";

// state is always a snapshot of the lates state.
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // This is a destructuring that is an alias assignment, so a variation of the object destructuring.
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    console.log("EFFECT RUNING");
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("EFFECT CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  // The code below seems to be doing the same thing, so is the destructuring variation really needed?
  //}, [emailState.isValid, passwordState.isValid]);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      dispatchEmail({ type: "USER_INPUT", value: value });
    } else if (name === "password") {
      dispatchPassword({ type: "USER_INPUT", value: value });
    }

    //setFormIsValid(emailState.isValid && passwordState.isValid); // Better to use this in a useEffect so that values are up to date.
  };

  /*
  const emailChangeHandler = (event) => {
    // It's all caps because of convention.
    dispatchEmail({ type: "USER_INPUT", value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };
  */

  const validateHandler = (event) => {
    const { name } = event.target;

    if (name === "email") {
      //console.log("Email input lost focus/blurred");
      dispatchEmail({ type: "INPUT_BLUR" });
    } else if (name === "password") {
      //console.log("Password input lost focus/blurred");
      dispatchPassword({ type: "INPUT_BLUR" });
    }
  };

  /*
  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "PASSWORD_BLUR" });
  };
  */

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      authCtx.onLogIn(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
        ref={emailInputRef}
          isValid={emailState.isValid}
          htmlFor="email"
          labelText="Email"
          name="email"
          type="email"
          value={emailState.value}
          onChange={inputChangeHandler}
          onBlur={validateHandler}
        />
        <Input
        ref={passwordInputRef}
          isValid={passwordState.isValid}
          htmlFor="password"
          labelText="Password"
          name="password"
          type="password"
          value={passwordState.value}
          onChange={inputChangeHandler}
          onBlur={validateHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
