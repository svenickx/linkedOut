import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import styles from "./index.module.scss";
import Link from "next/link";

const Header = () => {
  const { user, isLogged, logout } = useAuth();

  return (
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img src="/linkedOut.png" alt="logo" />
      </Link>
      <div className={styles.buttons}>
        <Link href="/freelances">Freelances</Link>
        <Link href="/dashboard/missions">Missions</Link>
        <Link href="/dashboard/propositions">Propositions</Link>
      </div>
      <div className={styles.auth}>
        {isLogged ? (
          <div className={styles.userInfo}>
            <Link href={`/profil/${user._id}`}>
              <p>{user.firstname}</p>
              <p>{user.role}</p>
            </Link>
            <p className={styles.actionBtn} onClick={() => logout()}>
              Se déconnecter
            </p>
          </div>
        ) : (
          <>
            <div>
              <Link href="/auth/login">
                <p>Se connecter</p>
              </Link>
            </div>
            <Link href="/auth/register">
              <div className={styles.actionBtn}>
                <p>S&apos;inscrire</p>
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
