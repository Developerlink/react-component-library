import React, { useState } from "react";
import Styles from "./ChartBar.module.css";

const ChartBar = (props) => {
  const [isColumn, setIsColumn] = useState(true);

  let barFillValue = "0%";

  if (props.maxValue > 0) {
    barFillValue = Math.round((props.value / props.maxValue) * 100) + "%";
  }

  return (
    <div
      className={
        isColumn ? Styles["chart-bar-column"] : Styles["chart-bar-row"]
      }
    >
      <div
        className={
          isColumn ? Styles["chart-bar-column__inner"] : Styles["chart-bar-row__inner"]
        }
      >
        <div
          className={Styles["chart-bar__fill"]}
          style={isColumn ? { height: barFillValue } : { width: barFillValue }}
        ></div>
      </div>
      <div className={Styles["chart-bar_label"]}>{props.label}</div>
    </div>
  );
};

export default ChartBar;
