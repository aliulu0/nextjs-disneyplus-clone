import React, { useEffect } from "react";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import Slider from "../components/Slider";
import Viewers from "../components/Viewers";
import MoviesSlider from "../components/MoviesSlider";
import SeriesSlider from "../components/SeriesSlider";
import TrendsSlider from "../components/TrendsSlider";
import { useAuth } from "../context/UserContext";
import Login from "./index";

function Home({
  popularMovies,
  popularSeries,
  topRatedMovies,
  topRatedSeries,
  trendsOfWeek,
}) {
  const { currentUser } = useAuth();

  if (currentUser?.id === undefined) return <Login />;

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <Slider />
        <Viewers />
        <TrendsSlider trends={trendsOfWeek} title="Trends Of The Week" />
        <MoviesSlider movies={popularMovies} title="Popular Movies" />
        <MoviesSlider movies={topRatedMovies} title="Top Rated Movies" />
        <SeriesSlider series={popularSeries} title="Popular Series" />
        <SeriesSlider series={topRatedSeries} title="Top Rated Series" />
      </div>
    </div>
  );
}

export default Home;

export async function getStaticProps(context) {
  const [
    popularMoviesRes,
    popularSeriesRes,
    topRatedMoviesRes,
    topRatedSeriesRes,
    trendsOfWeekRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`
    ),
    fetch(`
    https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`),

    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`
    ),
    fetch(`
    https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`),
    fetch(`
    https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.NEXT_PUBLIC_MOVIE_API_KEY}&language=en-US&page=1`),
  ]);
  const [
    popularMovies,
    popularSeries,
    topRatedMovies,
    topRatedSeries,
    trendsOfWeek,
  ] = await Promise.all([
    popularMoviesRes.json(),
    popularSeriesRes.json(),
    topRatedMoviesRes.json(),
    topRatedSeriesRes.json(),
    trendsOfWeekRes.json(),
  ]);
  return {
    props: {
      popularMovies: popularMovies.results,
      popularSeries: popularSeries.results,
      topRatedMovies: topRatedMovies.results,
      topRatedSeries: topRatedSeries.results,
      trendsOfWeek: trendsOfWeek.results,
    },
  };
}
