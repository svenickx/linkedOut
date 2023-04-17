import Button from "@/components/UI/button";
import RangeInput from "@/components/UI/rangeInput";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Pick from "../pick";
import styles from "./index.module.scss";

const Filter = () => {
  const router = useRouter();

  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 999,
    minExp: 0,
    maxExp: 50,
    skills: [],
  });

  const fetchFilter = () => {
    router
      .replace({
        pathname: "/freelances",
        query: {
          minPrice: filter.minPrice,
          maxPrice: filter.maxPrice,
          minExp: filter.minExp,
          maxExp: filter.maxExp,
          ...(filter.skills.length > 0 && { skills: filter.skills.join() }),
        },
      })
      .then(() => router.reload());
  };

  useEffect(() => {
    if (router.isReady) {
      setFilter({
        ...filter,
        minPrice: router.query.minPrice ?? 0,
        maxPrice: router.query.maxPrice ?? 999,
        minExp: router.query.minExp ?? 0,
        maxExp: router.query.maxExp ?? 50,
        skills: router.query.skills?.split(",") ?? [],
      });
    }
  }, [router.isReady]);

  const handleChange = (val, property) => {
    setFilter({ ...filter, [property]: val });
  };

  return (
    <div className={styles.filter}>
      <div className={styles.title}>
        <h3>Filtrer les résultats</h3>
      </div>
      <div className={styles.row}>
        <div className={styles.multiselect}>
          <Pick
            object={filter}
            field={"skills"}
            setObject={setFilter}
            title="Choisissez des Skills"
            url="/skill/getSkills"
            canSelectMultiple
          />
        </div>
        <div className={styles.rangeContainer}>
          <RangeInput
            title="Années d'expérience min."
            value={filter.minExp}
            min={0}
            max={50}
            step={1}
            name="minExp"
            handleChange={handleChange}
            defaultValue={filter.minExp}
          />
          <RangeInput
            title="Années d'expérience max."
            value={filter.maxExp}
            min={0}
            max={50}
            step={1}
            name="maxExp"
            handleChange={handleChange}
            defaultValue={filter.maxExp}
          />
        </div>
        <div className={styles.rangeContainer}>
          <RangeInput
            title="Prix journalier min."
            value={filter.minPrice}
            min={0}
            max={999}
            step={10}
            name="minPrice"
            handleChange={handleChange}
            defaultValue={filter.minPrice}
          />
          <RangeInput
            title="Prix journalier max."
            value={filter.maxPrice}
            min={0}
            max={999}
            step={10}
            name="maxPrice"
            handleChange={handleChange}
            defaultValue={filter.maxPrice}
          />
        </div>
      </div>
      <div className={styles.btn}>
        <Button
          type="button"
          className="primary"
          title="Filtrer"
          onClick={fetchFilter}
        />
      </div>
    </div>
  );
};

export default Filter;
