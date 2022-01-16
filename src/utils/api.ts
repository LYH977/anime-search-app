import axios from 'axios';

export const getAnimeList = (
  debouncedValue: string,
  currentPage: number,
  isPageReset: boolean
) => {
  return axios(
    `https://api.jikan.moe/v3/search/anime?q=${debouncedValue}&page=${
      isPageReset ? 1 : currentPage
    }`
  );
};

export const getAnimeDetail = (id: string) => {
  return axios(`https://api.jikan.moe/v3/anime/${id}`);
};
