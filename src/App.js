import React from "react";
import ChartBar from "./components/ChartBar";
import "./App.css";
import ChartBarExample from "./components/ChartBarExample";
import ModalExample from "./components/ModalExample";
import FormUseState from "./components/FormUseState";
import FormUseReducer from "./components/FormUseReducer";

function App() {
  return (
    <React.Fragment>
      <h1>Component showcase</h1>
      {/* <ChartBarExample /> */}
      {/* <ModalExample /> */}
      {/* <FormUseState /> */}
      <FormUseReducer />
    </React.Fragment>
  );
}

export default App;
