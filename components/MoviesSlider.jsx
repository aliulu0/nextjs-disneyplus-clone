import React from "react";
import styles from "../styles/CollectionSlider.module.css";
import Card from "./Card";
function MoviesSlider({ movies, title }) {
  
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.content}
      >
        {movies?.map((movie) => (
          <Card key={movie.id} item={movie} className={styles.wrap} />
        ))}
      </div>
    </div>
  );
}

export default MoviesSlider;
