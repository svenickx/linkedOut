import React, { useEffect, useState } from "react";
import ProfilHeader from "../profilHeader";
import styles from "./index.module.scss";
import { useAuth } from "@/context/auth";
import useFetch from "@/hooks/useFetch";
import { useCookies } from "react-cookie";
import MissionsView from "../../missionsView";
import AddMissionModal from "../../modals/addMissionModal";
import Button from "@/components/UI/button";

const FreelanceProfil = ({ data }) => {
  const [missionsToPropose, setMissionsToPropose] = useState([]);
  const { user, isLogged, isUserLoading } = useAuth();
  const [cookie] = useCookies(["token"]);
  const [isAddMissionModalOpen, setIsAddMissionModalOpen] = useState(false);
  const {
    data: missions,
    error,
    fetchData,
    isLoading,
  } = useFetch({
    url: `http://localhost:3001/api/v1/mission/getPendingCompanyMissions/${
      data.user && data.user._id
    }`,
    method: "GET",
    token: cookie.token,
  });

  const proposeMission = async (missionID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/proposition/createProposition`,
        {
          headers: {
            "Content-Type": "Application/json",
            authorization: cookie.token,
          },
          method: "POST",
          body: JSON.stringify({ user: data.user._id, mission: missionID }),
        }
      );
      if (!response.ok) {
        throw response.status;
      }
      setMissionsToPropose(
        missionsToPropose.filter((m) => m._id !== missionID)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogged && user.role === "Recruteur") {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (missions.length) {
      setMissionsToPropose(missions);
    }
  }, [missions]);

  return (
    <>
      {isAddMissionModalOpen && (
        <AddMissionModal closeModal={() => setIsAddMissionModalOpen(false)} />
      )}
      <ProfilHeader data={data} profilType="freelance" />
      <div className={styles.profilDescription}>
        <div className={styles.left}>
          <div className={styles.container}>
            <h3>Présentation de {data.user && data.user.firstname}</h3>
            <div className={styles.line}></div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Eu non
              diam phasellus vestibulum lorem sed risus. Ullamcorper a lacus
              vestibulum sed arcu non odio. Ornare quam viverra orci sagittis eu
              volutpat. Et pharetra pharetra massa massa ultricies mi quis.
            </p>
            <p>
              ✔ Facilisis leo vel fringilla est ullamcorper eget. <br />✔ Ornare
              arcu dui vivamus arcu felis bibendum
              <br />✔ Sed tempus urna et pharetra pharetra massa massa ultricies{" "}
              <br />✔ Arcu cursus euismod quis viverra nibh cras <br />✔
              Lobortis mattis aliquam faucibus purus
              <br />✔ Ipsum a arcu cursus vitae congue <br />✔ Commodo nulla
              facilisi nullam vehicula ipsum
            </p>
            <p>
              Purus in mollis nunc sed. In tellus integer feugiat scelerisque.
              Gravida cum sociis natoque penatibus et. Ac feugiat sed lectus
              vestibulum mattis ullamcorper velit sed ullamcorper. Viverra
              adipiscing at in tellus integer. Proin sed libero enim sed.
              Consequat interdum varius sit amet mattis vulputate enim. Risus
              nullam eget felis eget nunc. Enim ut tellus elementum sagittis. 😀
            </p>
          </div>
          <div className={styles.container}>
            <h3>Métiers et compétences</h3>
            <div className={styles.line}></div>
            <h5>Métiers</h5>
            {data.freelance &&
              data.freelance.jobs.map((j, i) => {
                return (
                  <div key={i} className={styles.job}>
                    <p className={styles.green}>{j.name}</p>
                    <span>Expert</span>
                  </div>
                );
              })}
            <div className={styles.line}></div>
            <h5>Compétences</h5>
            <div className={styles.skills}>
              {data.freelance &&
                data.freelance.skills.map((s, i) => {
                  return (
                    <div key={i}>
                      <span>{s.name}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.recap}>
            <h3>Disponibilités et mobilités</h3>
            <div className={styles.line}></div>
            <div className={styles.availabilities}>
              <p className={styles.dot}>Disponible</p>
              <p className={styles.dot}>5 jours par semaine</p>
              <p className={styles.dot}>
                Recherche des missions de 1 à 3 mois, 3 à 6 mois, 6 mois à 1 an,
                plus d&apos;un an
              </p>
              <p>{data.user && data.user.city}</p>
              <p>Travail à distance</p>
            </div>
          </div>
          <div className={`${styles.recap} ${styles.dark}`}>
            <div className={styles.smallProfil}>
              {data.user && (
                <div>
                  <div className={styles.img}>
                    <img src={data.user.image} alt="picture" />
                  </div>
                  <div className={styles.name}>
                    <h3>
                      {`${data.user.firstname} ${data.user.lastname.charAt(0)}`}
                    </h3>
                  </div>
                </div>
              )}
              <div>
                {data.freelance && (
                  <h4>
                    À partir de <b>{data.freelance.dailyPrice}€</b> /jour
                  </h4>
                )}
              </div>
            </div>
          </div>
          {!isUserLoading && user && user.role === "Recruteur" && (
            <div className={styles.recap}>
              <h3>Intéressé par {data.user && data.user.firstname}?</h3>
              <div className={styles.line}></div>
              <MissionsView
                title="Proposez lui une de vos missions en attente"
                missions={missionsToPropose}
                action={proposeMission}
              />
              <Button
                className="primary"
                size="small"
                title="Ajouter une mission"
                type="button"
                onClick={() => setIsAddMissionModalOpen(true)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FreelanceProfil;
