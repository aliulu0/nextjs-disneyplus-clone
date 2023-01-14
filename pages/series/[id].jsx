import React, { useState } from "react";
import styles from "../../styles/Detail.module.css";
import Header from "../../components/Header";
import Head from "next/head";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import ReactPlayer from "react-player";
import Login from "../index";
import { useAuth } from "../../context/UserContext";

function Detail({ result }) {
  const { currentUser } = useAuth();
  const baseUrl = "https://www.themoviedb.org/t/p/original";

  if (currentUser?.id === undefined) return <Login />;
  return (
    <>
      <Head>
        <title>{result?.title || result?.original_title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <div className={styles.content}>
          <Image
            src={
              `${baseUrl}${result?.backdrop_path}` ||
              `${baseUrl}${result?.poster_path}`
            }
            layout="fill"
            objectFit="cover"
            alt="background"
          />
        </div>

        <div className={styles.description}>
          <h1>{result?.name || result?.original_name}</h1>
          <h6
            style={
              result?.status === "Ended"
                ? { color: "white", backgroundColor: "#cf1b1b" }
                : {}
            }
          >
            {result?.status}
          </h6>
          <p className={styles.info}>
            {result.release_date?.slice(0, 4) ||
              result?.first_air_date?.slice(0, 4) + " "}
            • Seasons: {result?.number_of_seasons} • Episodes:{" "}
            {result?.number_of_episodes} •{" "}
            {" " + result?.genres.map((genre) => genre.name + ", ")}
          </p>
          <div className={styles.controls}>
            <button className={styles.playBtn}>
              <FaPlay />
              <span>Play</span>
            </button>
            <button className={styles.addbtn}>
              <span>
                <BiPlus />
              </span>
            </button>
            <button className={styles.groupBtn}>
              <span>
                <HiUserGroup />
              </span>
            </button>
          </div>
          <h4 className={styles.overview}>{result.overview}</h4>
        </div>
      </div>
    </>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const request = await fetch(`
    https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&append_to_response=videos`).then(
    (response) => response.json()
  );
  return {
    props: {
      result: request,
    },
  };
}
