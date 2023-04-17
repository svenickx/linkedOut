import Button from "@/components/UI/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({
  user,
  mission,
  company,
  hasConfirmation,
  hasFreelanceShown,
  handleProposition,
  hasSearch,
}) => {
  const router = useRouter();
  return (
    <tr>
      {hasFreelanceShown && (
        <td style={{ color: "blue", textDecoration: "underline" }}>
          <Link href={`/profil/${user._id}`}>
            {user.firstname} {user.lastname}
          </Link>
        </td>
      )}
      {hasConfirmation && (
        <td>
          <Button
            className="primary"
            size="small"
            title="Accepter"
            type="button"
            onClick={() => handleProposition(true, mission._id)}
          />
          <Button
            className="primary__red"
            size="small"
            title="Refuser"
            type="button"
            onClick={() => handleProposition(false, mission._id)}
          />
        </td>
      )}
      <td>{mission.title}</td>
      <td>{company.name}</td>
      <td>{mission.description}</td>
      <td>{new Date(mission.startDate).toLocaleDateString()}</td>
      <td>{new Date(mission.endDate).toLocaleDateString()}</td>
      <td>{mission.totalAmount}€</td>
      <td>
        {mission.skills.map((s) => {
          return `${s.name} `;
        })}
      </td>
      <td>{mission.job.name}</td>
    </tr>
  );
};

export default TableRow;
