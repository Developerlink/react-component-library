import React from "react";
import ChartBar from "./components/ChartBar";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <h1>Component showcase</h1>
      <ChartBar
        key={0}
        value={50}
        maxValue={100}
        label="x-label"
      />
      
    </React.Fragment>
  );
}

export default App;
