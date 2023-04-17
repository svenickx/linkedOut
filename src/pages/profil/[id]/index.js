import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import useFetch from "@/hooks/useFetch";
import { useAuth } from "@/context/auth";
import FreelanceProfil from "@/components/partials/profils/freelanceProfil";
import RecruiterProfil from "@/components/partials/profils/recuiterProfil";

const Profil = () => {
  const [profilType, setProfilType] = useState("");
  const router = useRouter();
  const { data, error, fetchData, isLoading } = useFetch({
    url: `http://localhost:3001/api/v1/user/getUser?id=${router.query.id}`,
    method: "GET",
  });

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (data.user && data.user.company) {
      setProfilType("recruiter");
    } else if (data.user && data.freelance) {
      setProfilType("freelance");
    } else if (data.user && data.user.isAdmin) {
      setProfilType("admin");
    }
  }, [data]);

  return (
    <div className={styles.profil}>
      {profilType === "freelance" && <FreelanceProfil data={data} />}
      {profilType === "recruiter" && <RecruiterProfil data={data} />}
    </div>
  );
};

export default Profil;
