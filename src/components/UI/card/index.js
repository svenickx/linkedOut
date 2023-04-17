import Link from "next/link";
import React from "react";
import styles from "./index.module.scss";

const Card = ({ freelance }) => {
  return (
    <Link href={`/profil/${freelance.user._id}`} className={styles.card}>
      <div className={styles.portrait}>
        <img
          src={
            freelance.user.image ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0TkuD39AX857r3O1qhL6u4m6A67dOkCAXjQ&usqp=CAU"
          }
        />
        <div className={styles.portraitInfo}>
          <div className={styles.extraInfo}>
            <div>
              <h3>{freelance.user.firstname}</h3>
              <p>{freelance.user.city}</p>
            </div>
            <div className={styles.available}>
              <div>
                <p>Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <div>
          <h3>
            {freelance.jobs.map((j, i) => {
              if (i !== freelance.jobs.length - 1) {
                return `${j.name.charAt(0).toUpperCase() + j.name.slice(1)}, `;
              }
              return j.name.charAt(0).toUpperCase() + j.name.slice(1);
            })}
          </h3>
          <div className={styles.skills}>
            {freelance.skills.map((s, i) => {
              return (
                <div key={i}>
                  <p>{s.name}</p>
                </div>
              );
            })}
          </div>
          <div className={styles.price}>
            <p>
              A partir de <b>{freelance.dailyPrice} €</b> /jour
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
