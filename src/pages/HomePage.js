import React, { Fragment } from "react";
import MovieList from "../components/movie/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout  page-container pb-20">
        <h2 className="capitalize text-3xl text-white font-bold mb-10">
          Now playing
        </h2>
        <MovieList type="now_playing"></MovieList>
      </section>
      <section className="movies-layout  page-container pb-20">
        <h2 className="capitalize text-3xl text-white font-bold mb-10">
          Top rated
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout  page-container pb-20">
        <h2 className="capitalize text-3xl text-white font-bold mb-10">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
