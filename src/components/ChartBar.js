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
        key={props.key}
        className={`${Styles.container} ${
          isAColumn ? Styles.column : Styles.row
        }`}
      >
        <div className={Styles.label}>{props.label}</div>
        <div
          className={`${Styles.chartBar} ${
            isAColumn ? Styles.chartBarColumn : Styles.chartBarRow
          }`}
        >
          <div
            className={Styles.chartBarFill}
            style={
              isAColumn ? { height: barFillValue } : { width: barFillValue }
            }
          ></div>
        </div>
        <div className={Styles.label}>{props.label}</div>
      </div>
    </React.Fragment>
  );
};

export default ChartBar;
