import React from "react";
import styles from "./index.module.scss";

const RangeInput = ({
  title,
  value,
  min,
  max,
  step,
  name,
  handleChange,
  defaultValue,
}) => {
  return (
    <div className={styles.range}>
      <label htmlFor={name}>{title}</label>
      <div>
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          onChange={(e) => handleChange(e.target.value, name)}
          defaultValue={defaultValue}
        />
        <p>{value}</p>
      </div>
    </div>
  );
};

export default RangeInput;
