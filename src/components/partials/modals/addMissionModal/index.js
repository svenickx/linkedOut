import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import CustomModal from "../customModal";
import Input from "@/components/UI/Input";
import Pick from "../../pick";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

const AddMissionModal = ({ closeModal }) => {
  const router = useRouter();
  const [cookie] = useCookies(["token"]);
  const [missionForm, setMissionForm] = useState({
    title: "",
    description: "",
    totalAmount: 0,
    startDate: new Date(),
    endDate: new Date(),
    job: [],
    skills: [],
  });
  const [canSelectJob, setCanSelectJob] = useState(false);
  const [canSelectSkills, setCanSelectSkills] = useState(false);
  const [canCreateMission, setCanCreateMission] = useState(false);

  const handleChange = (e) => {
    setMissionForm({
      ...missionForm,
      [e.target.name]: e.target.value,
    });
  };

  const createMission = async () => {
    const mission = { ...missionForm };
    mission.job = mission.job[0];
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/mission/createMission`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.token,
          },
          method: "POST",
          body: JSON.stringify(mission),
        }
      );
      if (!response.ok) {
        throw response.status;
      }
      router.reload(window.location.pathname);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (
      missionForm.title !== "" &&
      missionForm.description !== "" &&
      missionForm.totalAmount > 0 &&
      missionForm.startDate < missionForm.endDate
    ) {
      setCanSelectJob(true);
    } else {
      setCanSelectJob(false);
    }
  }, [missionForm]);

  useEffect(() => {
    if (canSelectJob && missionForm.job.length > 0) {
      setCanSelectSkills(true);
    } else {
      setCanSelectSkills(false);
    }
  }, [canSelectJob, missionForm]);

  useEffect(() => {
    if (canSelectSkills && missionForm.skills.length > 0) {
      setCanCreateMission(true);
    } else {
      setCanCreateMission(false);
    }
  }, [canSelectSkills, missionForm]);

  return (
    <CustomModal
      closeModal={closeModal}
      title="Créer une mission"
      canConfirm={canCreateMission}
      confirmCallback={createMission}
    >
      <div className={styles.missionModal}>
        {!canSelectSkills && (
          <>
            <Input
              name="title"
              placeholder="Titre de la mission"
              type="text"
              className="primary"
              onChange={(e) => handleChange(e)}
            />
            <Input
              name="description"
              placeholder="Description"
              type="text"
              className="primary"
              onChange={(e) => handleChange(e)}
            />
            <Input
              name="totalAmount"
              placeholder="Montant total en euros de la rémunération"
              type="numeric"
              className="primary"
              onChange={(e) => handleChange(e)}
            />
            <Input
              name="startDate"
              placeholder="Début de la mission"
              type="date"
              className="primary"
              onChange={(e) => handleChange(e)}
            />
            <Input
              name="endDate"
              placeholder="Fin de la mission"
              type="date"
              className="primary"
              onChange={(e) => handleChange(e)}
            />
          </>
        )}

        {canSelectJob && (
          <div className={styles.skills}>
            <Pick
              className={styles.pickJob}
              object={missionForm}
              field="job"
              setObject={setMissionForm}
              title="Choissisez le métier visé"
              url="/job/getJobs"
            />
          </div>
        )}
        {canSelectSkills && (
          <div className={styles.skills}>
            <Pick
              object={missionForm}
              field="skills"
              setObject={setMissionForm}
              title="Choisissez les skills requis"
              url="/skill/getSkills"
              canSelectMultiple
            />
          </div>
        )}
      </div>
    </CustomModal>
  );
};

export default AddMissionModal;
