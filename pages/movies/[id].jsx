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
  const [showPlayer, setShowPlayer] = useState(false);
  const { currentUser } = useAuth();

  const baseUrl = "https://www.themoviedb.org/t/p/original";

  const index = result?.videos?.results?.findIndex(
    (item) => item?.name === "Official Teaser" || item?.type === "Trailer"
  );

  if (currentUser?.id === undefined) return <Login />;
  
  return (
    <>
      <Head>
        <title>{result?.title || result?.original_title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className={styles.container}
        onClick={(e) => {
          e.stopPropagation();
          setShowPlayer(false);
        }}
      >
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
          <h1>{result?.title || result?.original_title}</h1>
          <p className={styles.info}>
            {result?.release_date?.slice(0, 4) ||
              result?.first_air_date?.slice(0, 4)}{" "}
            • {Math.floor(result?.runtime / 60)}h {result?.runtime % 60}m •{" "}
            {result.genres.map((genre) => genre.name + ", ")}
          </p>
          <div className={styles.controls}>
            <button className={styles.playBtn}>
              <FaPlay />
              <span>Play</span>
            </button>
            <button
              className={styles.trailerBtn}
              onClick={(e) => {
                e.stopPropagation();
                setShowPlayer(true);
              }}
            >
              <FaPlay />
              <span>Trailer</span>
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
          <h4 className={styles.overview}>{result?.overview}</h4>
        </div>
        {showPlayer && <div className={styles.playerModalBackground} />}
        {/*Content */}
        {showPlayer && (
          <div className={showPlayer && styles.playerModal}>
            {/*Top */}
            <div className={styles.playerModalTop}>
              <span>Trailer</span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayer(false);
                }}
              >
                <span>
                  <AiFillCloseCircle />
                </span>
              </div>
            </div>
            <div className={styles.showPlayerModalContent}>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result?.videos?.results[index]?.key}`}
                width="100%"
                height="60%"
                className={styles.modalPlayer}
                controls={true}
                playing={showPlayer}
                light={false}
                config={{
                  youtube: {
                    playerVars: { showinfo: 1 },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const request = await fetch(`
    https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&append_to_response=videos`).then(
    (response) => response.json()
  );
  return {
    props: {
      result: request,
    },
  };
}
