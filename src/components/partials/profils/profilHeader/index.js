import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
import { HiHandThumbUp, HiMapPin } from "react-icons/hi2";
import styles from "./index.module.scss";

const ProfilHeader = ({ data, profilType }) => {
  return (
    <div className={styles.profilHeader}>
      <div className={styles.primaryInfo}>
        <div className={styles.ariane}>
          <Link className={`${styles.green} ${styles.sidePadding}`} href="/">
            Accueil
          </Link>
          <p>&gt;</p>
          {profilType === "freelance" ? (
            <Link
              className={`${styles.green} ${styles.sidePadding}`}
              href="/freelances"
            >
              Freelances
            </Link>
          ) : (
            <Link className={`${styles.green} ${styles.sidePadding}`} href="/">
              Recruteurs
            </Link>
          )}
          <p>&gt;</p>
          <p className={styles.sidePadding}>
            {data.user && data.user.firstname}
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.picture}>
            {profilType === "freelance" && (
              <img
                src={
                  data.user
                    ? data.user.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcKv35ZllAnF6B-d5FLmRxSPsXM7GK4nP73w&usqp=CAU"
                }
                alt="freelanceIcon"
              />
            )}
            {profilType === "recruiter" && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfVCrAzZvY9DmrFFqQTQQ2WrEyHFetUh8Z9Q&usqp=CAU"
                alt="companyIcon"
              />
            )}
          </div>
          <div className={styles.informations}>
            <h3>
              {data.user &&
                `${data.user.firstname} ${data.user.lastname.charAt(0)}`}
            </h3>
            <div className={`${styles.icon} ${styles.green}`}>
              <GoVerified />
              <p>Profil vérifié</p>
            </div>
            <p className={styles.green}>
              {data.freelance &&
                data.freelance.jobs.map((j, i) => {
                  if (i !== data.freelance.jobs.length - 1) {
                    return `${
                      j.name.charAt(0).toUpperCase() + j.name.slice(1)
                    }, `;
                  }
                  return j.name.charAt(0).toUpperCase() + j.name.slice(1);
                })}
            </p>
            <div className={styles.icon}>
              <HiMapPin className={styles.green} />
              <p>{data.user && `${data.user.address}, ${data.user.city}`}</p>
            </div>
            {profilType === "freelance" && (
              <>
                <div className={styles.icon}>
                  <HiHandThumbUp className={styles.green} />
                  <p>2 recommandations</p>
                </div>
                <h4>Tarif indicatif</h4>
                <p>
                  À partir de{" "}
                  <b>{data.freelance && data.freelance.dailyPrice}€</b> /jour
                </p>
              </>
            )}
            {profilType === "recruiter" && (
              <>
                <h4>Entreprise</h4>
                <h4 className={styles.green}>{data.user.company.name}</h4>
                <p>{data.user.company.address}</p>
                <p>Siret: {data.user.company.siret}</p>
                <p>Statut: {data.user.company.status}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilHeader;
