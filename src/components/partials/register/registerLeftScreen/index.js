import Link from "next/link";
import React from "react";
import styles from "./index.module.scss";

const RegisterLeftScreen = () => {
  return (
    <div className={styles.left}>
      <img
        src="/register_illustration.jpg"
        alt="photo"
        className={styles.background}
      />
      <div className={styles.description}>
        <div className="logo">
          <Link href="/">
            <img src="/linkedOut.png" alt="logo" />
          </Link>
        </div>
        <p>
          &quot;LinkedOut m&apos;a permis de me lancer en tant que Freelance, la
          facilité d&apos;utilisation et le offres proposées sont totalement en
          accord avec ce que je recherchais&quot;
        </p>
        <p>Sergio Ramos, Freelance sur LinkedOut depuis 2023</p>
      </div>
    </div>
  );
};

export default RegisterLeftScreen;
