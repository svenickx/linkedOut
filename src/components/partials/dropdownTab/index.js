import React, { useState } from "react";
import styles from "./index.module.scss";

const DropdownTab = ({ title, children, isOpen }) => {
  const [open, setOpen] = useState(isOpen);

  return (
    <div className={styles.dropdownTab}>
      <div
        className={`${styles.title} ${open ? styles.open : styles.close}`}
        onClick={() => setOpen(!open)}
      >
        <h3>{title}</h3>
      </div>
      <div className={styles.tab}>{open && children}</div>
    </div>
  );
};

export default DropdownTab;
