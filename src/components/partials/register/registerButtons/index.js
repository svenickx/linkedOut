import React from "react";
import styles from "./index.module.scss";
import Button from "@/components/UI/button";
import { useAuth } from "@/context/auth";

const RegisterButtons = ({
  step,
  setStep,
  isFreelance,
  canGoNextStep,
  userForm,
}) => {
  const { freelanceRegister, recruiterRegister } = useAuth();

  return (
    <div className={styles.buttonContainer}>
      {step > 0 && (
        <Button
          size="small"
          title="Retour"
          type="button"
          onClick={() => setStep(step - 1)}
        />
      )}
      {step == 4 && isFreelance ? (
        <Button
          className="primary"
          disabled={!canGoNextStep}
          size="small"
          title="S'incrire en tant que Freelance"
          type="button"
          onClick={(e) => freelanceRegister(e, userForm)}
        />
      ) : step == 2 && !isFreelance ? (
        <Button
          disabled={!canGoNextStep}
          className="primary"
          size="small"
          title="S'incrire en tant que Recruteur"
          type="button"
          onClick={(e) => recruiterRegister(e, userForm)}
        />
      ) : (
        <Button
          className="primary"
          disabled={!canGoNextStep}
          size="small"
          title="Continuer"
          type="button"
          onClick={() => canGoNextStep && setStep(step + 1)}
        />
      )}
    </div>
  );
};

export default RegisterButtons;
