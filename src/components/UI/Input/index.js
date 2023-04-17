import React from "react";
import styles from "./index.module.scss";

const Input = ({ type, placeholder, name, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`${styles[className]}`}
    />
  );
};

export default Input;
