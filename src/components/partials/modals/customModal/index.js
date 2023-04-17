import React from "react";
import styles from "./index.module.scss";
import Button from "@/components/UI/button";

const CustomModal = ({
  children,
  closeModal,
  title,
  canConfirm,
  confirmCallback,
}) => {
  return (
    <div className={styles.CustomModal}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <div>{children}</div>
        <div className={styles.actions}>
          <Button
            title="Annuler"
            size="Medium"
            type="button"
            onClick={closeModal}
          />
          <Button
            title="Confirmer"
            size="Medium"
            type="button"
            className="primary"
            disabled={!canConfirm}
            onClick={confirmCallback}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
