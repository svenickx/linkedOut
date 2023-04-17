import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { FiSend } from "react-icons/fi";

const MissionsView = ({ missions, title, action }) => {
  return (
    <div className={styles.missions}>
      <h4>{title}</h4>
      <div className={styles.container}>
        {missions.length > 0 &&
          missions.map((m, i) => {
            return (
              <div key={i} className={styles.mission}>
                <div>
                  <p className={styles.title}>{m.title}</p>
                  <p>{m.description}</p>
                  <p className={styles.title}>
                    Du {new Date(m.startDate).toLocaleDateString()} au{" "}
                    {new Date(m.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.btn}>
                  <div onClick={() => action(m._id)}>
                    <FiSend className={styles.color} size={30} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MissionsView;
