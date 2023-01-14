import React from "react";
import styles from "../styles/CollectionSlider.module.css";
import Card from "../components/Card";

function TrendsSlider({ trends, title }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.content}>
        {trends?.map((item) => (
          <Card key={item.id} item={item} className={styles.wrap} />
        ))}
      </div>
    </div>
  );
}

export default TrendsSlider;
