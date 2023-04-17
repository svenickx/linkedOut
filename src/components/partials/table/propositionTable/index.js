import React from "react";
import TableHeader from "../tableHeader";
import TableRow from "../tableRow";
import Button from "@/components/UI/button";
import styles from "./index.module.scss";

const PropositionTable = ({
  elements,
  handleProposition,
  hasConfirmation,
  hasFreelanceShown,
  isMission,
}) => {
  return (
    <table cellSpacing="0" className={styles.table}>
      <TableHeader
        hasConfirmation={hasConfirmation}
        hasFreelanceShown={hasFreelanceShown}
      />
      <tbody>
        {elements.length > 0 &&
          elements.map((p, i) => {
            return (
              <TableRow
                company={p.company}
                mission={isMission ? p : p.mission}
                user={p.user}
                key={i}
                hasConfirmation={hasConfirmation}
                hasFreelanceShown={hasFreelanceShown}
                handleProposition={handleProposition}
              ></TableRow>
            );
          })}
      </tbody>
    </table>
  );
};

export default PropositionTable;
