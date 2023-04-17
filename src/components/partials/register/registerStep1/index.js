import Input from "@/components/UI/Input";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./index.module.scss";

const RegisterStep1 = ({
  userForm,
  handleChange,
  isFreelance,
  setIsFreelance,
  setCanGoNextStep,
}) => {
  useEffect(() => {
    if (userForm.email != "" && userForm.password != "") {
      setCanGoNextStep(true);
      return;
    }
    setCanGoNextStep(false);
  }, [userForm]);

  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        placeholder="Email"
        name="email"
        value={userForm.email || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        name="password"
        value={userForm.password || ""}
        onChange={(e) => handleChange(e)}
        className="primary"
      />
      <div className={styles.freelanceChoice}>
        <div
          className={isFreelance ? styles.chosen : ""}
          onClick={() => setIsFreelance(true)}
        >
          <p>Je suis un Freelance</p>
        </div>
        <div
          className={!isFreelance ? styles.chosen : ""}
          onClick={() => setIsFreelance(false)}
        >
          <p>Je suis un Recruteur</p>
        </div>
      </div>
      <Link href="/auth/login">
        <p>J&apos;ai déjà un compte</p>
      </Link>
    </div>
  );
};

export default RegisterStep1;
