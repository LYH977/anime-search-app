import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
//MUI
import Grid from '@mui/material/Grid';
import { Box, Button, Chip, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InfoBoard from '../components/InfoBoard';

import Skeleton from '@mui/material/Skeleton';
import { IMAGE_PLACEHOLDER, INFO } from '../utils/constant';
import { formatInfoBoardText } from '../utils/formatters';

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log('detail');
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
        const result = await axios(`https://api.jikan.moe/v3/anime/${id}`);
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

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          {isLoading ? (
            <Skeleton
              variant='rectangular'
              width={200}
              height={400}
              animation='wave'
            />
          ) : (
            <ButtonBase>
              <Img src={imageURL ?? IMAGE_PLACEHOLDER} alt={title} />
            </ButtonBase>
          )}
        </Grid>

        <Grid item container direction='column' xs spacing={2}>
          <Grid item xs>
            {isLoading ? (
              <Skeleton variant='text' animation='wave' width='40%' />
            ) : (
              <Typography>{title ?? '-'}</Typography>
            )}
          </Grid>
          <Grid item container spacing={2}>
            {genres.map((gName, index) => (
              <Grid item>
                <Chip label={gName} key={index} onClick={() => null} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs>
            {isLoading ? (
              <>
                <Skeleton variant='text' animation='wave' />
                <Skeleton variant='text' animation='wave' />
                <Skeleton variant='text' animation='wave' />
                <Skeleton variant='text' animation='wave' />
                <Skeleton variant='text' animation='wave' />
              </>
            ) : (
              <Typography>{synopsis ?? 'No sypnosis'}</Typography>
            )}
          </Grid>
          <Grid container item xs spacing={2}>
            {infoBoardList.map(({ infoNo, infoText, color }, index) => (
              <Grid item xs key={index}>
                {isLoading ? (
                  <Skeleton
                    variant='rectangular'
                    width={150}
                    height={75}
                    animation='wave'
                  />
                ) : (
                  <InfoBoard
                    infoNo={infoNo}
                    infoText={infoText}
                    color={color}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Button
        variant='contained'
        startIcon={<ArrowBackIcon />}
        sx={{ mt: 2 }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </Box>
  );
}

export default Detail;

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
