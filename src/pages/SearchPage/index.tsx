import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Thumbnail from '../../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';
import { AnimeItemProps, TransitionProps } from '../../utils/types';

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
import { useAnimeList } from './useAnimeList';

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction='down' />;
}

function SearchPage() {
  const navigate = useNavigate();
  const {
    isSnackbarOpen,
    isSearching,
    isPaginating,
    closeSnackBar,
    debouncedValue,
    animeList,
    animeName,
    queryAnime,
    lastPage,
    currentPage,
    updatePage,
  } = useAnimeList();

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
        onChange={queryAnime}
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
          onChange={updatePage}
        />
      )}
    </Box>
  );
}

export default SearchPage;
