import Input from "@/components/UI/Input";
import React, { useEffect } from "react";
import styles from "./index.module.scss";

const RegisterFreelanceStep3 = ({
  userForm,
  handleChange,
  setCanGoNextStep,
}) => {
  useEffect(() => {
    setCanGoNextStep(true);
  }, [userForm]);

  return (
    <div>
      <label>Prix journalier *</label>
      <Input
        type="number"
        name="dailyPrice"
        value={userForm.dailyPrice || 0}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <div className={styles.note}>
        <span>* euros par jour</span>
      </div>
      <label>Année(s) d&apos;expérience</label>
      <Input
        type="number"
        name="yearlyExperience"
        value={userForm.yearlyExperience || 0}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
    </div>
  );
};

export default RegisterFreelanceStep3;
