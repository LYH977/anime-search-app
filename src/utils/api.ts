import axios from 'axios';

export const getAnimeList = (debouncedValue: string, page: number) => {
  return axios(
    `https://api.jikan.moe/v3/search/anime?q=${debouncedValue}&page=${page}`
  );
};

export const getAnimeDetail = (id: string) => {
  return axios(`https://api.jikan.moe/v3/anime/${id}`);
};
