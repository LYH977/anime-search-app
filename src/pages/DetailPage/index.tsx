import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoBoard from '../../components/InfoBoard';
import { IMAGE_PLACEHOLDER } from '../../utils/constant';
import { useSingleAnime } from './useSingleAnime';
//MUI
import Grid from '@mui/material/Grid';
import { Box, Button, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Skeleton from '@mui/material/Skeleton';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { genres, imageURL, synopsis, title, isLoading, infoBoardList } =
    useSingleAnime(id);

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
              <Grid item key={index}>
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

export default DetailPage;

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
