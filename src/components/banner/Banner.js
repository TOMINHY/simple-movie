import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const Banner = () => {
  const { data, error } = useSWR(tmdbAPI.getMovieBanner(), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      {isLoading && (
        <>
          <Swiper grabCursor={"true"} slidesPerView={"auto"}>
            <SwiperSlide>
              <BannerSekelation></BannerSekelation>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={"true"} slidesPerView={"auto"}>
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item}></BannerItem>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  );
};

function BannerItem({ item }) {
  const { title, backdrop_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt=""
        className="w-full h-full object-cover object-center rounded-lg"
      />
      <div className="absolute w-full text-white bottom-5 left-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-5">
          <span className="px-4 py-2 border border-white rounded-md">
            Action
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Story
          </span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
}

const BannerSekelation = () => {
  return (
    <div className="relative w-full h-full rounded-lg">
      <LoadingSkeleton
        width="1280px"
        height="500px"
        radius="8px"
      ></LoadingSkeleton>
      <div className="absolute w-full text-white bottom-5 left-5">
        <h2 className="mb-5 text-3xl font-bold">
          <LoadingSkeleton width="150px" height="50px"></LoadingSkeleton>
        </h2>
        <div className="flex items-center mb-8 gap-x-5">
          <span className="px-4 py-2 border border-white rounded-md">
            <LoadingSkeleton width="50px" height="30px"></LoadingSkeleton>
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            <LoadingSkeleton width="50px" height="30px"></LoadingSkeleton>
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            <LoadingSkeleton width="50px" height="30px"></LoadingSkeleton>
          </span>
        </div>
        {/* <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button> */}
      </div>
    </div>
  );
};

export default Banner;
