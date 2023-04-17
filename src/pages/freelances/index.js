import Search from "@/components/partials/search";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Filter from "@/components/partials/filter";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import FreelancesWrapper from "@/components/partials/freelancesWrapper";

const Freelances = () => {
  const router = useRouter();
  const [url, setUrl] = useState(
    "http://localhost:3001/api/v1/user/getFreelances"
  );
  const { data, error, fetchData, isLoading } = useFetch({
    url,
    method: "GET",
  });

  useEffect(() => {
    if (router.isReady && router.query) {
      let uri = "http://localhost:3001/api/v1/user/getFreelances?";
      uri += `minPrice=${router.query.minPrice ?? 0}`;
      uri += `&maxPrice=${router.query.maxPrice ?? 999}`;
      uri += `&minExp=${router.query.minExp ?? 0}`;
      uri += `&maxExp=${router.query.maxExp ?? 50}`;
      if (router.query.skills) {
        uri += `&s=${router.query.skills}`;
      }
      setUrl(uri);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (router.isReady) {
      fetchData();
    }
  }, [url]);

  return (
    <div className={styles.main}>
      <div className={styles.searchWrapper}>
        <Search
          title="Rechercher des Freelances avec des mots-clés"
          placeholder="Front-End Javascript Sergio Paris"
          searchUrl="/freelances/search"
        />
      </div>
      <div className={styles.page}>
        <div className={styles.filterWrapper}>
          <Filter />
        </div>
        <FreelancesWrapper freelances={data} size="medium" />
      </div>
    </div>
  );
};

export default Freelances;
