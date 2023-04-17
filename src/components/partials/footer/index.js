import React from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import { useAuth } from "@/context/auth";

const Footer = () => {
  const { user, isLogged, isLoading: isUserLoading } = useAuth();

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link href="/" className={styles.logo}>
          <img src="/linkedOut.png" alt="logo" />
        </Link>
      </div>
      <div className={styles.middle}>
        <div>
          <h3>Vos actions</h3>
        </div>
        <div className={styles.informations}>
          {!isLogged ? (
            <>
              <Link href="/auth/login">Se connecter</Link>
              <Link href="/auth/register">S&apos;inscrire</Link>
            </>
          ) : (
            <>
              <Link href="/freelances">Voir les freelances</Link>
              <Link href="/dashboard/missions">Voir vos missions</Link>
              <Link href="/dashboard/propositions">Voir vos propositions</Link>
            </>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <h3>Nous contacter</h3>
        </div>
        <div className={styles.informations}>
          <p>support@linkedOut.com</p>
          <p>012345678</p>
          <p>1 rue de Paris</p>
          <p>75001</p>
          <p>France</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
