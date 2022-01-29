import axios from 'axios';

const abortableAxiosGet = (url: string, signal: AbortSignal) =>
  axios(url, { signal });

export const getAnimeList = (
  debouncedValue: string,
  page: number,
  signal: AbortSignal
) => {
  return abortableAxiosGet(
    `https://api.jikan.moe/v3/search/anime?q=${debouncedValue}&page=${page}`,
    signal
  );
};

export const getAnimeDetail = (id: string, signal: AbortSignal) => {
  return abortableAxiosGet(`https://api.jikan.moe/v3/anime/${id}`, signal);
};
