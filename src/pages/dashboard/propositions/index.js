import React from "react";
import { useAuth } from "@/context/auth";
import styles from "./index.module.scss";
import DropdownTab from "@/components/partials/dropdownTab";
import Dashboard from "@/components/partials/dashboard";
import useFetch from "@/hooks/useFetch";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";
import PropositionTable from "@/components/partials/table/propositionTable";
import { useRouter } from "next/router";

const Propositions = () => {
  const { user, isLogged, isLoading: isUserLoading } = useAuth();
  const [cookie] = useCookies(["token"]);
  const [pendingPropositions, setPendingPropositions] = useState([]);
  const [acceptedPropositions, setAcceptedPropositions] = useState([]);
  const [refusedPropositions, setRefusedPropositions] = useState([]);
  const router = useRouter();

  const { data, error, fetchData } = useFetch({
    url: `http://localhost:3001/api/v1/proposition/${
      user && user.role === "Freelance"
        ? "getCurrentUserPropositions"
        : "getCurrentCompanyPropositions"
    }`,
    method: "GET",
    token: cookie.token,
  });

  const handleProposition = async (isAccepted, missionID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/proposition/handleProposition`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.token,
          },
          method: "POST",
          body: JSON.stringify({ accepted: isAccepted, mission: missionID }),
        }
      );
      if (!response.ok) {
        throw response.status;
      }
      router.reload(window.location.pathname);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isLogged) {
      router.push("/auth/login");
    }
    if (isLogged && !isUserLoading) {
      fetchData();
    }
  }, [isLogged]);

  useEffect(() => {
    if (data.length) {
      setPendingPropositions(data.filter((p) => p.status === "Pending"));
      setAcceptedPropositions(data.filter((p) => p.status === "Accepted"));
      setRefusedPropositions(data.filter((p) => p.status === "Refused"));
    }
  }, [data]);

  return (
    <div className={styles.propositions}>
      {isUserLoading ? (
        "Chargement..."
      ) : (
        <Dashboard title="Vos propositions">
          <DropdownTab title="Propositions en attente" isOpen>
            <PropositionTable
              elements={pendingPropositions}
              handleProposition={handleProposition}
              hasConfirmation={user && user.role === "Freelance"}
              hasFreelanceShown={user && user.role === "Recruteur"}
            />
          </DropdownTab>
          <DropdownTab title="Propositions acceptées">
            <PropositionTable
              elements={acceptedPropositions}
              hasFreelanceShown={user && user.role === "Recruteur"}
            />
          </DropdownTab>
          <DropdownTab title="Propositions refusées">
            <PropositionTable
              elements={refusedPropositions}
              hasFreelanceShown={user && user.role === "Recruteur"}
            />
          </DropdownTab>
        </Dashboard>
      )}
    </div>
  );
};

export default Propositions;
