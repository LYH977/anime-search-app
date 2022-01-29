import { useEffect, useState } from 'react';
import { getAnimeDetail } from '../../utils/api';
import { INFO } from '../../utils/constant';
import { formatInfoBoardText } from '../../utils/formatters';

export const useSingleAnime = (id: string | undefined) => {
  const [episodes, setEpisodes] = useState<number>();
  const [genres, setGenres] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [popularity, setPopularity] = useState<number>();
  const [rank, setRank] = useState<number>();
  const [score, setScore] = useState<number>();
  const [synopsis, setSynopsis] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const infoBoardList = [
    {
      infoNo: formatInfoBoardText(episodes, INFO.EPISODES),
      infoText: INFO.EPISODES,
    },
    {
      infoNo: formatInfoBoardText(popularity, INFO.POPULARITY),
      infoText: INFO.POPULARITY,
    },
    {
      infoNo: formatInfoBoardText(score, INFO.SCORE),
      infoText: INFO.SCORE,
    },
    {
      infoNo: formatInfoBoardText(rank, INFO.RANK),
      infoText: INFO.RANK,
    },
  ];

  async function fetchAnimeDetails(signal: AbortSignal) {
    try {
      setIsLoading(true);
      const result = await getAnimeDetail(id as string, signal);
      setEpisodes(result?.data?.episodes);
      setGenres(
        result?.data?.genres?.map(
          (g: { [key: string]: string | number }) => g?.name
        )
      );
      setImageURL(result?.data?.image_url);
      setPopularity(result?.data?.popularity);
      setRank(result?.data?.rank);
      setScore(result?.data?.score);
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
