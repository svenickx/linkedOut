import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Dashboard from "@/components/partials/dashboard";
import DropdownTab from "@/components/partials/dropdownTab";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import useFetch from "@/hooks/useFetch";
import AddMissionModal from "@/components/partials/modals/addMissionModal";
import Button from "@/components/UI/button";
import PropositionTable from "@/components/partials/table/propositionTable";

const Missions = () => {
  const router = useRouter();
  const { user, isLogged, isLoading: isUserLoading } = useAuth();
  const [cookie] = useCookies(["token"]);
  const [pendingMissions, setPendingMissions] = useState([]);
  const [confirmedMissions, setConfirmedMissions] = useState([]);
  const [doneMissions, setDoneMissions] = useState([]);
  const [isAddMissionModalOpen, setIsAddMissionModalOpen] = useState(false);

  const {
    data: companyData,
    error: companyError,
    fetchData: fetchCompanyData,
  } = useFetch({
    url: "http://localhost:3001/api/v1/mission/getAllCompanyMissions",
    method: "GET",
    token: cookie.token,
  });

  const {
    data: freelanceData,
    error: freelanceError,
    fetchData: fetchFreelanceData,
  } = useFetch({
    url: "http://localhost:3001/api/v1/mission/getFreelanceMission",
    method: "GET",
    token: cookie.token,
  });

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
    if (isLogged && !isUserLoading) {
      if (user.role === "Recruteur") {
        fetchCompanyData();
      } else if (user.role === "Freelance") {
        fetchFreelanceData();
      }
    }
  }, [isUserLoading, isLogged]);

  useEffect(() => {
    const data = companyData.length ? companyData : freelanceData;
    if (data.length) {
      setPendingMissions(data.filter((m) => m.status === "Pending"));
      setConfirmedMissions(
        data.filter(
          (p) => p.status === "Confirmed" && new Date(p.endDate) > Date.now()
        )
      );
      setDoneMissions(
        data.filter(
          (p) => p.status === "Done" || new Date(p.endDate) < Date.now()
        )
      );
    }
  }, [companyData, freelanceData]);

  return (
    <div className={styles.missions}>
      {isAddMissionModalOpen && (
        <AddMissionModal closeModal={() => setIsAddMissionModalOpen(false)} />
      )}
      {isUserLoading ? (
        "Chargement..."
      ) : (
        <Dashboard title="Vos missions">
          {user && user.role === "Recruteur" && (
            <DropdownTab title="Missions en attente" isOpen>
              <PropositionTable elements={pendingMissions} isMission />
            </DropdownTab>
          )}
          <DropdownTab title="Missions en cours">
            <PropositionTable elements={confirmedMissions} isMission />
          </DropdownTab>
          <DropdownTab title="Missions terminées">
            <PropositionTable elements={doneMissions} isMission />
          </DropdownTab>
        </Dashboard>
      )}
      {!isUserLoading && user && user.role === "Recruteur" && (
        <div>
          <Button
            className="primary"
            size="Large"
            title="Créer une nouvelle mission"
            type="button"
            onClick={() => setIsAddMissionModalOpen(true)}
          />
        </div>
      )}
    </div>
  );
};

export default Missions;
