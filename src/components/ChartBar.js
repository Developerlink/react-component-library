import React, { useState } from "react";
import Styles from "./ChartBar.module.css";

//key?
//value
//maxValue
//label

const ChartBar = (props) => {
  const isAColumn = true;

  let barFillValue = "0%";

  if (props.maxValue > 0) {
    barFillValue = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <React.Fragment>
      <div
        className={`${Styles["chart-bar"]} ${
          +isAColumn ? Styles["column"] : Styles["row"]
        }`}
      >
        <div className={Styles["chart-bar__label"]}>{props.label}</div>
        <div
          className={`${Styles["chart-bar-inner"]} ${
            isAColumn ? Styles["column-inner"] : Styles["row-inner"]
          }`}
        >
          <div
            className={Styles["chart-bar__fill"]}
            style={
              isAColumn ? { height: barFillValue } : { width: barFillValue }
            }
          ></div>
        </div>
        <div className={Styles["chart-bar__label"]}>{props.label}</div>
      </div>
    </React.Fragment>
  );
};

export default ChartBar;
