/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import styles from "../../styles/Search.module.css";
import Card from "../../components/Card";
import { useAuth } from "../../context/UserContext";
import Login from "../index";
function Search({ result }) {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const { currentUser } = useAuth();

  const getData = async (searchText) => {
    let res = [];
    if (searchText !== "") {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchText}}`
      ).then((response) => response.json());
      res = [...response.results];
    } else {
      res = [...result];
    }
    setData(res);
  };

  useEffect(() => {
    getData(text);
  }, [text]);

  if (currentUser?.id === undefined) return <Login />;

  return (
    <>
      <Header />
      <input
        className={styles.searchBar}
        type="text"
        value={text}
        placeholder="Search by Title..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.container}>
        <div className={styles.content}>
          {data.map((item) => (
            <Card key={item.id} item={item} className={styles.wrap} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;

export async function getStaticProps(context) {
  const request = await fetch(`
  https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US`).then(
    (response) => response.json()
  );
  return {
    props: {
      result: request.results,
    },
  };
}
