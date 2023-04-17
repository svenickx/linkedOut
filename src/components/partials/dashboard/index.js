import React from "react";
import styles from "./index.module.scss";

const Dashboard = ({ title, children }) => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.title}>
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default Dashboard;
