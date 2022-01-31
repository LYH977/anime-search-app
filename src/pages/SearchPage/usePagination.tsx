import { useCallback, useEffect, useState } from 'react';
import { getAnimeList } from '../../utils/api';
import { AnimeItemProps } from '../../utils/types';

export const usePagination = (
  debouncedValue: any,
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeItemProps[]>>
) => {
  const [isPaginating, setisPaginating] = useState(false);
  const [lastPage, setLastPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const controller = new AbortController();
    fetchAnimeList(controller.signal);
    return () => {
      controller.abort();
    };
  }, [currentPage]);

  async function fetchAnimeList(signal: AbortSignal) {
    if (debouncedValue) {
      setisPaginating(true);
      try {
        const result = await getAnimeList(debouncedValue, currentPage, signal);
        setAnimeList(result?.data?.results);
      } catch (e) {
        console.log({ e });
      }
      setisPaginating(false);
    }
  }

  const updatePage = useCallback(
    (e: React.ChangeEvent<unknown>, page: number) => setCurrentPage(page),
    []
  );

  return {
    currentPage,
    isPaginating,
    lastPage,
    setLastPage,
    setCurrentPage,
    updatePage,
  };
};
