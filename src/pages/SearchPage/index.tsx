import React, { memo, useCallback, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Thumbnail from '../../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';
import { AnimeItemProps, TransitionProps } from '../../utils/types';
import { usePagination } from './usePagination';
import { useSearchBar } from './useSearchBar';

//MUI
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction='down' />;
}

const SingleThumbnail = memo(({ anime, goToDetail }: any) => (
  <Grid item key={anime.mal_id} xs={12} md={6} lg={3}>
    <Thumbnail item={anime} goToDetail={goToDetail} />
  </Grid>
));

function SearchPage() {
  const navigate = useNavigate();
  const [animeName, setAnimeName] = useState<string>('');
  const [animeList, setAnimeList] = useState<AnimeItemProps[]>([]);
  const debounceSetAnimeName = useRef(
    useDebouncedCallback((name: string) => {
      setAnimeName(name);
    }, 500)
  ).current;

  const {
    currentPage,
    isPaginating,
    lastPage,
    setLastPage,
    setCurrentPage,
    updatePage,
  } = usePagination(animeName, setAnimeList);

  const { closeSnackBar, dismissSnackBar, isSearching, isSnackbarOpen } =
    useSearchBar(
      animeName,
      setAnimeList,
      debounceSetAnimeName,
      setCurrentPage,
      setLastPage
    );

  const goToDetail = useCallback(
    (mal_id: number) => navigate(`${ROUTES.DETAIL}/${mal_id}`),
    []
  );

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Snackbar
        open={isSnackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={TransitionDown}
        autoHideDuration={5000}
        onClose={closeSnackBar}
        action={
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={closeSnackBar}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        }
        message={`"${animeName}" is not found. Please try other anime name.`}
      />
      <TextField
        sx={{ width: '80%', mb: 5 }}
        id='outlined-basic'
        label='Search'
        variant='outlined'
        onChange={dismissSnackBar}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {isSearching ? (
                <CircularProgress size={25} thickness={5} />
              ) : (
                <SearchIcon />
              )}
            </InputAdornment>
          ),
        }}
      />
      {animeList.length === 0 && (
        <Typography variant='overline' display='block' gutterBottom>
          --EMPTY--
        </Typography>
      )}
      {isPaginating ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {animeList.map((anime) => (
            <SingleThumbnail
              key={anime.mal_id}
              anime={anime}
              goToDetail={goToDetail}
            />
          ))}
        </Grid>
      )}
      {animeList.length > 0 && (
        <Pagination
          sx={{ m: 5 }}
          count={lastPage}
          color='primary'
          page={currentPage}
          onChange={updatePage}
        />
      )}
    </Box>
  );
}

export default SearchPage;
