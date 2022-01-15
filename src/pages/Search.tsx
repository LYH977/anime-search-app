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
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';

export type AnimeItemProps = {
  airing: boolean;
  end_date: string;
  episode: number;
  image_url: string;
  mal_id: number;
  members: number;
  rated: string;
  score: number;
  start_date: string;
  synopsis: string;
  title: string;
  type: string;
  url: string;
};

function Search() {
  const [animeName, setAnimeName] = useState<string | null>('');
  const [animeList, setAnimeList] = useState<AnimeItemProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>();
  const [lastPage, setLastPage] = useState<number>(1);

  const [debouncedValue] = useDebounce(animeName, 500);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeList = async () => {
      if (debouncedValue)
        try {
          const result = await axios(
            `https://api.jikan.moe/v3/search/anime?q=${debouncedValue}&page=${currentPage}`
          );
          setAnimeList(result?.data?.results);
          setLastPage(result?.data?.last_page);
          console.log(result);
        } catch (e) {
          console.log({ e });
        }
    };
    fetchAnimeList();
  }, [debouncedValue, currentPage]);

  function updateSearchValue(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setAnimeName(event.target.value);
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
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
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
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
      {animeList.length > 0 && (
        <Pagination
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
