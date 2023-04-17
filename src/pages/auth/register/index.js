import RegisterSteps from "@/components/partials/register";
import RegisterButtons from "@/components/partials/register/registerButtons";
import RegisterLeftScreen from "@/components/partials/register/registerLeftScreen";
import { useAuth } from "@/context/auth";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Register = () => {
  const { error } = useAuth();
  const [registerStep, setRegisterStep] = useState(0);
  const [canGoNextStep, setCanGoNextStep] = useState(false);
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    zipCode: undefined,
    phoneNumber: "",
    dailyPrice: undefined, // Freelance
    yearlyExperience: undefined, // Freelance
    skills: [], // Freelance
    jobs: [], // Freelance
    companyName: "", // Recruteur
  });
  const [isFreelance, setIsFreelance] = useState(true);

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.wrapper}>
      <RegisterLeftScreen />
      <div className={styles.right}>
        <div className={styles.registerWrapper}>
          <div className={styles.formTitle}>
            <h1>Créer un compte</h1>
            <p>Commencez avec 30 jours gratuit</p>
          </div>
          <form>
            <RegisterSteps
              userForm={userForm}
              handleChange={handleChange}
              isFreelance={isFreelance}
              setIsFreelance={setIsFreelance}
              step={registerStep}
              setCanGoNextStep={setCanGoNextStep}
              setUserForm={setUserForm}
            />
            {error && <p className={styles.error}>{error.message}</p>}
            <RegisterButtons
              step={registerStep}
              setStep={setRegisterStep}
              isFreelance={isFreelance}
              canGoNextStep={canGoNextStep}
              userForm={userForm}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
