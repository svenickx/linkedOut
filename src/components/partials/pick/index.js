import Button from "@/components/UI/button";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

const Pick = ({ object, field, setObject, title, url, canSelectMultiple }) => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [elements, setElements] = useState([]);
  const [canFetchMoreElements, setCanFetchMoreElements] = useState(true);

  useEffect(() => {
    if ((page + 1) * 10 > elements.length) {
      fetch(`http://localhost:3001/api/v1${url}?page=${page}`)
        .then((res) => {
          res
            .json()
            .then((data) => {
              setIsLoading(false);
              setElements([...elements, ...data]);
              if (data.length < 10) {
                setCanFetchMoreElements(false);
              }
            })
            .catch(() => setCanFetchMoreElements(false));
        })
        .catch((err) => console.error(err));
    }
  }, [page]);

  return (
    <>
      <div className={styles.pickWrapper}>
        {object[field].map((e, i) => {
          return (
            <div
              key={i}
              className={styles.pickChosen}
              onClick={() => {
                object[field] = object[field].filter((ele) => ele !== e);
                setObject({ ...object, [field]: object[field] });
              }}
            >
              <p>{e}</p>
            </div>
          );
        })}
      </div>
      {(canSelectMultiple || object[field].length === 0) && (
        <>
          <h3>{title}</h3>
          <div className={styles.pickWrapper}>
            {elements
              .filter((e) => !object[field].includes(e))
              .map((e, i) => {
                return (
                  <div
                    key={i}
                    className={styles.pick}
                    onClick={() => {
                      object[field].push(e);
                      setObject({ ...object, [field]: object[field] });
                    }}
                  >
                    <p>{e}</p>
                  </div>
                );
              })}
          </div>
          {canFetchMoreElements && (
            <div>
              <Button
                type="button"
                className="primary"
                title="Voir plus"
                size="small"
                onClick={() => setPage(page + 1)}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Pick;
