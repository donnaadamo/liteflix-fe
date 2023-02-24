import axios from "axios";
import GLOBAL from "./Global";
import { makeUseAxios } from "axios-hooks";

axios.defaults.headers.post["Content-Type"] = "application/json";

// Public API

const TheMovieDbInstance = axios.create({
  baseURL: GLOBAL.ENV.THE_MOVIE_DB,
});

TheMovieDbInstance.interceptors.response.use((response) => {
  if (response.config.url === GLOBAL.ENV.OUTSTANDING) {
    const max = response.data.results.length;
    response.data = response.data.results[Math.floor(Math.random() * max)];
  }
  if (response.config.url === GLOBAL.ENV.POPULAR) {
    let popularMovies = [];
    for (let i = 0; i < response.data.results.length; i++) {
      response.data.results[i].image =
        GLOBAL.COMMON.IMAGES_URL + response.data.results[i].backdrop_path;
      popularMovies.push(response.data.results[i]);
    }
    response.data = popularMovies;
  }
  return response;
});

TheMovieDbInstance.interceptors.request.use((config) => {
  config.params = { api_key: GLOBAL.ENV.API_KEY };
  return config;
});

const useTheMovieDbAxios = makeUseAxios({
  axios: TheMovieDbInstance,
});

// My movies API

const MyMoviesInstance = axios.create({
  baseURL: GLOBAL.ENV.MY_MOVIES_DB,
});

MyMoviesInstance.interceptors.response.use((response) => {
  for (let i = 0; i < response.data.length; i++) {
    response.data[i].image =
      GLOBAL.ENV.MY_MOVIES_DB + GLOBAL.ENV.IMAGES + response.data[i]._id;
  }
  return response;
});

const useMyMoviesAxios = makeUseAxios({
  axios: MyMoviesInstance,
});

export { useTheMovieDbAxios, useMyMoviesAxios };
