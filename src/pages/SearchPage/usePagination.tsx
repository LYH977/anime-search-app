import { useEffect, useState } from 'react';
import { getAnimeList } from '../../utils/api';
import { AnimeItemProps } from '../../utils/types';

export const usePagination = (
  debouncedValue: string,
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeItemProps[]>>
) => {
  const [isPaginating, setisPaginating] = useState(false);
  const [lastPage, setLastPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    let isSubscribed = true;
    fetchAnimeList(isSubscribed);
  }, [currentPage]);

  async function fetchAnimeList(isSubscribed: boolean) {
    if (debouncedValue) {
      setisPaginating(true);
      try {
        const result = await getAnimeList(debouncedValue, currentPage);
        if (isSubscribed) setAnimeList(result?.data?.results);
      } catch (e) {
        console.log({ e });
      }
      setisPaginating(false);
    }
  }

  function updatePage(e: React.ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }

  return {
    currentPage,
    isPaginating,
    lastPage,
    setLastPage,
    setCurrentPage,
    updatePage,
  };
};
