import React, { useEffect } from "react";
import styles from "./index.module.scss";
import Button from "@/components/UI/button";
import Card from "@/components/UI/card";
import { useRouter } from "next/router";
import { useAuth } from "@/context/auth";

const FreelancesWrapper = ({ freelances, size }) => {
  const router = useRouter();
  const { isLogged } = useAuth();

  return (
    <div className={styles.resultWrapper}>
      <div className={styles.title}>
        <h3>Freelances pouvant vous convenir: ({freelances.length})</h3>
      </div>
      {freelances.length === 0 && (
        <div className={styles.title}>
          <h3>Aucun résultat!</h3>{" "}
          <Button
            type="button"
            className="primary"
            title="Réinitialiser la recherche"
            onClick={() =>
              router
                .replace({
                  pathname: "/freelances",
                  query: {
                    minPrice: 0,
                    maxPrice: 999,
                    minExp: 0,
                    maxExp: 50,
                    skills: [],
                  },
                })
                .then(() => router.reload())
            }
          />
        </div>
      )}
      <div className={`${styles.container} ${styles[size]}`}>
        {freelances &&
          freelances.length > 0 &&
          freelances.map((d, i) => {
            if (!isLogged && i > 2) {
              return;
            }
            return <Card key={i} freelance={d} />;
          })}
      </div>

      {!isLogged && (
        <div className={styles.connectBtn}>
          <Button
            type="button"
            className="primary"
            title="Connectez-vous pour voir la suite"
            onClick={() => router.push("/auth/login")}
          />
        </div>
      )}
    </div>
  );
};

export default FreelancesWrapper;
