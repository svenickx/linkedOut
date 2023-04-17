import React from "react";
import styles from "./index.module.scss";

const Button = ({ title, type, onClick, className, size, disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${styles[className]} ${styles[size]} ${
        disabled && styles.disabled
      }`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
