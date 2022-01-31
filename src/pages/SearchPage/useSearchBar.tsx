import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { DebouncedState } from 'use-debounce/lib/useDebouncedCallback';
import { getAnimeList } from '../../utils/api';
import { AnimeItemProps } from '../../utils/types';

export const useSearchBar = (
  animeName: string,
  setAnimeList: React.Dispatch<React.SetStateAction<AnimeItemProps[]>>,
  setAnimeName: DebouncedState<(name: string) => void>,
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
  }, [animeName]);

  async function fetchAnimeList(signal: AbortSignal) {
    if (animeName) {
      setIsSearching(true);
      try {
        const result = await getAnimeList(animeName, 1, signal);
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

  const dismissSnackBar = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setAnimeName(e.target.value);
      setIsSnackbarOpen(false);
    },
    []
  );

  const closeSnackBar = useCallback(() => setIsSnackbarOpen(false), []);

  return {
    closeSnackBar,
    dismissSnackBar,
    isSearching,
    isSnackbarOpen,
  };
};
