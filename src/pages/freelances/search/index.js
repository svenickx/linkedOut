import FreelancesWrapper from "@/components/partials/freelancesWrapper";
import Search from "@/components/partials/search";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const SearchPage = () => {
  const [freelances, setFreelances] = useState([]);

  return (
    <div className={styles.search}>
      <div className={styles.searchWrapper}>
        <Search
          title="Rechercher des Freelances avec des mots-clés"
          placeholder="Front-End Javascript Sergio Paris"
          searchUrl="/freelances/search"
          setResult={setFreelances}
        />
      </div>
      <FreelancesWrapper freelances={freelances} size="large" />
    </div>
  );
};

export default SearchPage;
