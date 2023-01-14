import React from "react";
import styles from "../styles/CollectionSlider.module.css";
import Card from "../components/Card";
function SeriesSlider({ series, title }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.content}>
        {series?.map((show) => (
          <Card key={show.id} item={show} className={styles.wrap} />
        ))}
      </div>
    </div>
  );
}

export default SeriesSlider;
