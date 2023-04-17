import React from "react";

const TableHeader = ({ hasConfirmation, hasFreelanceShown }) => {
  return (
    <thead>
      <tr>
        {hasFreelanceShown && <th>Freelance associé</th>}
        <th>Title</th>
        <th>Entreprise</th>
        <th>Description</th>
        <th>Début</th>
        <th>Fin</th>
        <th>Montant total</th>
        <th>Compétences requises</th>
        <th>Métier relatif</th>
        {hasConfirmation && <th>Confirmation</th>}
      </tr>
    </thead>
  );
};

export default TableHeader;
