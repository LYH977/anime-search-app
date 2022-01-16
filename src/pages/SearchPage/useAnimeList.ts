import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { getAnimeList } from '../../utils/api';
import { AnimeItemProps } from '../../utils/types';

export const useAnimeList = () => {
  const [animeName, setAnimeName] = useState<string>('');
  const [animeList, setAnimeList] = useState<AnimeItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isSearching, setisSearching] = useState(false);
  const [isPaginating, setisPaginating] = useState(false);

  const [debouncedValue] = useDebounce(animeName, 500);

  function updatePage(e: React.ChangeEvent<unknown>, page: number) {
    setCurrentPage(page);
  }
  function closeSnackBar() {
    setIsSnackbarOpen(false);
  }

  function queryAnime(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setAnimeName(e.target.value);
  }

  useEffect(() => {
    fetchAnimeList(setisPaginating, false);
  }, [currentPage]);

  useEffect(() => {
    fetchAnimeList(setisSearching, true);
  }, [debouncedValue]);

  async function fetchAnimeList(setLoading: Function, isPageReset: boolean) {
    if (debouncedValue) {
      setLoading(true);
      try {
        const result = await getAnimeList(
          debouncedValue,
          currentPage,
          isPageReset
        );
        setAnimeList(result?.data?.results);
        setLastPage(result?.data?.last_page);
        if (isPageReset) setCurrentPage(1);
      } catch (e) {
        if (isPageReset) setIsSnackbarOpen(true);
        console.log({ e });
      }
      setLoading(false);
    }
  }

  return {
    isSnackbarOpen,
    isSearching,
    isPaginating,
    closeSnackBar,
    debouncedValue,
    animeList,
    animeName,
    queryAnime,
    lastPage,
    currentPage,
    updatePage,
  };
};
