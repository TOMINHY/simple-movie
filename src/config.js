export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "55aeb3714a0970755c4bae7139372e84";
export const tmdbEndpoint = `https://api.themoviedb.org/3/movie`;
export const tmdbEndpointBanner = ` https://api.themoviedb.org/3/movie/upcoming`;
export const tmdbEndpointSearch = `https://api.themoviedb.org/3/search/movie`;
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieBanner: () => ` ${tmdbEndpointBanner}?api_key=${apiKey}`,
  imgOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  image500: (url) => `https://image.tmdb.org/t/p/w500/${url}`,
};
