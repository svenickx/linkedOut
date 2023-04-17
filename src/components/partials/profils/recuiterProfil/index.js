import React from "react";
import ProfilHeader from "../profilHeader";
import styles from "./index.module.scss";

const RecruiterProfil = ({ data }) => {
  return (
    <>
      <ProfilHeader data={data} profilType="recruiter" />
    </>
  );
};

export default RecruiterProfil;
