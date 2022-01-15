import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Thumbnail from '../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constant';

//MUI
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { AnimeItemProps, TransitionProps } from '../utils/types';

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction='down' />;
}

function Search() {
  const [animeName, setAnimeName] = useState<string | null>('');
  const [animeList, setAnimeList] = useState<AnimeItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isSearching, setisSearching] = useState(false);
  const [isPaginating, setisPaginating] = useState(false);

  const [debouncedValue] = useDebounce(animeName, 500);
  const navigate = useNavigate();

  function closeSnackBar() {
    setIsSnackbarOpen(false);
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
        const result = await axios(
          `https://api.jikan.moe/v3/search/anime?q=${debouncedValue}&page=${
            isPageReset ? 1 : currentPage
          }`
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
        message={`"${debouncedValue}" is not found. Please try other anime name.`}
      />
      <TextField
        sx={{ width: '80%', mb: 5 }}
        id='outlined-basic'
        label='Search'
        variant='outlined'
        value={animeName}
        onChange={(e) => setAnimeName(e.target.value)}
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

      {isPaginating ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {animeList.map((anime) => (
            <Grid item key={anime.mal_id} xs={3}>
              <Thumbnail
                item={anime}
                gotoDetail={() => {
                  navigate(`${ROUTES.DETAIL}/${anime.mal_id}`);
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {animeList.length > 0 && (
        <Pagination
          sx={{ m: 5 }}
          count={lastPage}
          color='primary'
          page={currentPage}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </Box>
  );
}

export default Search;
