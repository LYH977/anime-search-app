import axios from 'axios';
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
      color: 'blue',
    },
    {
      infoNo: formatInfoBoardText(popularity, INFO.POPULARITY),
      infoText: INFO.POPULARITY,
      color: 'blue',
    },
    {
      infoNo: formatInfoBoardText(score, INFO.SCORE),
      infoText: INFO.SCORE,
      color: 'blue',
    },
    {
      infoNo: formatInfoBoardText(rank, INFO.RANK),
      infoText: INFO.RANK,
      color: 'blue',
    },
  ];

  useEffect(() => {
    const fetchANimeDetails = async () => {
      try {
        setIsLoading(true);
        const result = await getAnimeDetail(id as string);
        console.log({ result });
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
    };
    fetchANimeDetails();
  }, []);

  return {
    genres,
    imageURL,
    synopsis,
    title,
    isLoading,
    infoBoardList,
  };
};
