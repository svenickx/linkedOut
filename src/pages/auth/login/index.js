import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import { useAuth } from "@/context/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Login = () => {
  const { login, error } = useAuth();
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.fullscreen}>
      <header>
        <Link href="/">
          <img src="/linkedOut.png" alt="logo" />
        </Link>
      </header>
      <form onSubmit={(e) => login(e, userForm)}>
        <h2>Se connecter</h2>
        <div className={styles.loginRedirect}>
          <p>Nouvel utilisateur?</p>
          <Link href="/auth/register">S&apos;inscrire</Link>
        </div>
        <div>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="primary"
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            name="password"
            onChange={(e) => handleChange(e)}
            className="primary"
          />
        </div>
        {error && <p className={styles.error}>{error.message}</p>}
        <div>
          <Button className="primary" title="Se connecter" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Login;
