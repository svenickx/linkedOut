import Button from "@/components/UI/button";
import Input from "@/components/UI/Input";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Search = ({ title, placeholder, searchUrl, value, setResult }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(value);
  const { data, error, fetchData, isLoading } = useFetch({
    url: `http://localhost:3001/api/v1/user/search?s=${router.query.s}`,
    method: "GET",
  });

  useEffect(() => {
    if (router.isReady) {
      setSearchInput(router.query.s);
      fetchData();
    }
  }, [router.isReady]);

  useEffect(() => {
    if (data.length) {
      setResult(data);
    }
  }, [data]);

  return (
    <div className={styles.search}>
      <h3>{title}</h3>
      <div>
        <Input
          name="search"
          placeholder={placeholder}
          type="text"
          className="primary"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput || ""}
        />
      </div>
      <div>
        <Button
          type="button"
          className="primary"
          title="Rechercher"
          onClick={() =>
            router
              .replace({ pathname: searchUrl, query: { s: searchInput } })
              .then(() => router.reload())
          }
        />
      </div>
    </div>
  );
};

export default Search;
