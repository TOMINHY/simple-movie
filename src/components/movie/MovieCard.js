import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { tmdbAPI } from "../../config";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "../loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  if (!item) return null;
  const { title, release_date, vote_average, poster_path, id } = item;
  return (
    <div className="movie-card flex flex-col text-white rounded-lg p-3 bg-slate-800 h-full select-none">
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5">
          <span>
            {release_date ? new Date(release_date).getFullYear() : null}
          </span>
          <span>{vote_average}</span>
        </div>
        <Button bgColor="secondary" onClick={() => navigate(`/movie/${id}`)}>
          Watch now
        </Button>
      </div>
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col text-white rounded-lg p-3 bg-slate-800 h-full select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton
            width="100%"
            height="20px"
            className="mb-5"
          ></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-5">
          <LoadingSkeleton
            width="50px"
            height="20px"
            className="mb-5"
          ></LoadingSkeleton>
          <LoadingSkeleton
            width="30px"
            height="20px"
            className="mb-5"
          ></LoadingSkeleton>
        </div>
        <LoadingSkeleton
          width="100%"
          height="40px"
          className="mb-5"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Some thing went wrong with this component
    </p>
  );
}
export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};
