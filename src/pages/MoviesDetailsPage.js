import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=55aeb3714a0970755c4bae7139372e84'
const MoviesDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;

  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10 ml-5 mr-5">
      <div className="relative w-full h-[800px]">
        <div className="absolute inset-0 bg-black bg-opacity-25 rounded"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover bg-center rounded"
          style={{
            backgroundImage: `url(${tmdbAPI.imgOriginal(backdrop_path)})`,
          }}
        ></div>
        <div className="w-full h-[500px] max-w-[600px] mx-auto -mt-[200px] relative z-10 pb-10">
          <img
            src={tmdbAPI.imgOriginal(poster_path)}
            alt=""
            className="w-full h-full object-contains rounded-xl"
          />
        </div>
        <h1 className="text-center text-white text-3xl mb-10">{title}</h1>
        {genres.length > 0 && (
          <div className="flex items-center justify-center gap-x-5 mb-10">
            {genres.map((item) => (
              <span
                className="py-2 px-4 text-primary border border-primary rounded"
                key={item.id}
              >
                {item.name}
              </span>
            ))}
          </div>
        )}
        <p className="leading-relaxed max-w-[600px] mx-auto mb-10">
          {overview}
        </p>
        <MovieMeta type="credits"></MovieMeta>
        <MovieMeta type="videos"></MovieMeta>
        <MovieMeta type="similar"></MovieMeta>
      </div>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
      <div className="py-10">
        <h2 className="text-center text-4xl mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imgOriginal(`${item.profile_path}`)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-3xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10 flex flex-col gap-10">
          {results.slice(0, 2).map((item) => (
            <div key={item.id}>
              <h3 className="mb-5 text-xl font-medium bg-secondary text-white p-3 inline-block">
                {item.name}
              </h3>
              <div className="w-full aspect-video">
                <iframe
                  width="846"
                  height="468"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title="Youtube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full object-fill"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Slimilar Movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.map((item) => (
                <SwiperSlide key={item.id}>
                  <MovieCard item={item}></MovieCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

// function MovieCredit() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="text-center text-4xl mb-10">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div className="cast-item" key={item.id}>
//             <img
//               src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
//               alt=""
//               className="w-full h-[350px] object-cover rounded-lg mb-3"
//             />
//             <h3 className="text-3xl font-medium">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieVideos() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10 flex flex-col gap-10">
//       {results.slice(0, 2).map((item) => (
//         <div key={item.id}>
//           <h3 className="mb-5 text-xl font-medium bg-secondary text-white p-3 inline-block">
//             {item.name}
//           </h3>
//           <div className="w-full aspect-video">
//             <iframe
//               width="846"
//               height="468"
//               src={`https://www.youtube.com/embed/${item.key}`}
//               title="Youtube video player"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               className="w-full h-full object-fill"
//             ></iframe>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();
//   const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "similar"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length <= 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="text-3xl font-medium mb-10">Slimilar Movies</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.map((item) => (
//             <SwiperSlide key={item.id}>
//               <MovieCard item={item}></MovieCard>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MoviesDetailsPage;
