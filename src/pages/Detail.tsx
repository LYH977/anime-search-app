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
function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episodes, setEpisodes] = useState<number>();
  const [genres, setGenres] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>();
  const [popularity, setPopularity] = useState<number>();
  const [rank, setRank] = useState<number>();
  const [score, setScore] = useState<number>();
  const [synopsis, setSynopsis] = useState<string>();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const fetchANimeDetails = async () => {
      try {
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
    };
    fetchANimeDetails();
  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase>
            <Img src={imageURL} alt={title} />
          </ButtonBase>
        </Grid>

        <Grid item container direction='column' xs>
          <Grid item xs>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item container>
            {genres.map((gName, index) => (
              <Chip label={gName} key={index} onClick={() => null} />
            ))}
          </Grid>
          <Grid item xs>
            <Typography>{synopsis}</Typography>
          </Grid>
          <Grid container item xs spacing={2}>
            <Grid item xs>
              <InfoBoard infoNo={episodes} infoText='Episodes' />
            </Grid>
            <Grid item xs>
              <InfoBoard infoNo={popularity} infoText='Popularity' />
            </Grid>
            <Grid item xs>
              <InfoBoard infoNo={rank} infoText='Rank' />
            </Grid>
            <Grid item xs>
              <InfoBoard infoNo={score} infoText='Score' />
            </Grid>
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
