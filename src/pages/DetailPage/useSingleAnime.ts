import { useEffect, useState } from 'react';
import { getAnimeDetail } from '../../utils/api';
import { INFO } from '../../utils/constant';
import { formatInfoBoardText } from '../../utils/formatters';

export const useSingleAnime = (id: string | undefined) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [synopsis, setSynopsis] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [infoBoard, setInfoBoard] = useState<any>({
    episodes: 0,
    popularity: 0,
    score: 0,
    rank: 0,
  });

  const infoBoardList = [
    {
      infoNo: formatInfoBoardText(infoBoard.episodes, INFO.EPISODES),
      infoText: INFO.EPISODES,
    },
    {
      infoNo: formatInfoBoardText(infoBoard.popularity, INFO.POPULARITY),
      infoText: INFO.POPULARITY,
    },
    {
      infoNo: formatInfoBoardText(infoBoard.score, INFO.SCORE),
      infoText: INFO.SCORE,
    },
    {
      infoNo: formatInfoBoardText(infoBoard.rank, INFO.RANK),
      infoText: INFO.RANK,
    },
  ];

  async function fetchAnimeDetails(signal: AbortSignal) {
    try {
      setIsLoading(true);
      const result = await getAnimeDetail(id as string, signal);
      setGenres(
        result?.data?.genres?.map(
          (g: { [key: string]: string | number }) => g?.name
        )
      );
      setImageURL(result?.data?.image_url);
      setInfoBoard({
        episodes: result?.data?.episodes,
        popularity: result?.data?.popularity,
        score: result?.data?.score,
        rank: result?.data?.rank,
      });
      setSynopsis(result?.data?.synopsis);
      setTitle(result?.data?.title);
    } catch (e) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchAnimeDetails(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    genres,
    imageURL,
    infoBoardList,
    isLoading,
    synopsis,
    title,
  };
};
