import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAnimeList } from '../../utils/api';
import { AnimeItemProps } from '../../utils/types';

export const useSearchBar = (
  debouncedValue: string,
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeItemProps[]>>,
  setAnimeName: React.Dispatch<React.SetStateAction<string>>,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  setLastPage: React.Dispatch<React.SetStateAction<number>>
) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsSnackbarOpen(false);
    const controller = new AbortController();
    fetchAnimeList(controller.signal);
    return () => controller.abort();
  }, [debouncedValue]);

  async function fetchAnimeList(signal: AbortSignal) {
    if (debouncedValue) {
      setIsSearching(true);
      try {
        const result = await getAnimeList(debouncedValue, 1, signal);
        setAnimeList(result?.data?.results);
        setLastPage(result?.data?.last_page);
        setCurrentPage(1);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setIsSnackbarOpen(true);
        }
        console.log({ e });
      }
      setIsSearching(false);
    }
  }

  function dismissSnackBar(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setAnimeName(e.target.value);
    setIsSnackbarOpen(false);
  }

  function closeSnackBar() {
    setIsSnackbarOpen(false);
  }

  return {
    closeSnackBar,
    dismissSnackBar,
    isSearching,
    isSnackbarOpen,
  };
};
