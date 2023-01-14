import React from "react";
import Header from "../../components/Header";
import styles from "../../styles/Trends.module.css";
import Card from "../../components/Card";
import { useAuth } from "../../context/UserContext";
import Login from "../index";
function Movies({ result }) {
  const { currentUser } = useAuth();

  if (currentUser?.id === undefined) return <Login />;
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.content}>
          {result?.map((item) => (
            <Card key={item.id} item={item} className={styles.wrap} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;

export async function getStaticProps(context) {
  const request = await fetch(`
  https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`).then(
    (response) => response.json()
  );
  return {
    props: {
      result: request.results,
    },
  };
}
