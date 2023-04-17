import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Input from "@/components/UI/Input";
import { useCookies } from "react-cookie";

const DynamicSearch = ({ canSelectMultiple, userForm, setUserForm }) => {
  const [cookie] = useCookies(["token"]);
  const [selectedResults, setSelectedResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addCompany = async () => {
    try {
      const newCompany = {
        name: searchInput.trim(),
        status: "SARL",
        siret: Math.random() * (9999999999999 - 1000000000000) + 1000000000000,
        address: "New York USA",
      };
      const response = await fetch(
        `http://localhost:3001/api/v1/company/companyCreation`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: cookie.token,
          },
          method: "POST",
          body: JSON.stringify(newCompany),
        }
      );
      if (!response.ok) {
        throw response.status;
      }
      setSearchResults([...searchResults, newCompany]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchInput != "") {
      setIsLoading(true);
      fetch(`http://localhost:3001/api/v1/company/search?name=${searchInput}`)
        .then((res) => {
          res
            .json()
            .then((data) => {
              setSearchResults(data);
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    } else {
      setSearchResults([]);
    }
    setIsLoading(false);
  }, [searchInput]);

  useEffect(() => {
    setUserForm({ ...userForm, companyName: selectedResults[0] });
  }, [selectedResults]);

  return (
    <div className={styles.search}>
      <div>
        <h3 className={styles.title}>Sélectionnez votre entreprise</h3>
      </div>
      <div className={styles.resultWrapper}>
        {selectedResults.map((r, i) => {
          return (
            <div
              className={styles.item}
              key={i}
              onClick={() => {
                const newSelectedResults = selectedResults.filter(
                  (re) => re !== r
                );
                setSelectedResults([...newSelectedResults]);
              }}
            >
              <p>{r}</p>
              <span className={styles.remove}>x</span>
            </div>
          );
        })}
      </div>
      {!canSelectMultiple && selectedResults.length > 0 ? (
        ""
      ) : (
        <>
          <Input
            type="text"
            placeholder="LinkedOut"
            name="firstname"
            onChange={(e) => setSearchInput(e.target.value)}
            className="primary"
          />
          <div className={styles.resultWrapper}>
            {isLoading
              ? "Chargement..."
              : !isLoading && searchResults.length < 1 && searchInput != ""
              ? "Aucun résultat"
              : searchResults
                  .filter((r) => !selectedResults.includes(r.name))
                  .map((r, i) => {
                    return (
                      <div
                        className={styles.item}
                        onClick={() =>
                          setSelectedResults([...selectedResults, r.name])
                        }
                        key={i}
                      >
                        <p>{r.name}</p>
                        <span className={styles.select}>+</span>
                      </div>
                    );
                  })}
            {searchInput != "" &&
              !searchResults.some(
                (r) =>
                  r.name.trim().toLowerCase() ===
                  searchInput.trim().toLowerCase()
              ) && (
                <button type="button" onClick={() => addCompany()}>
                  <p>
                    Ajoutez{" "}
                    <i>{searchInput} à notre liste d&apos;entreprises</i>
                  </p>
                </button>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicSearch;
