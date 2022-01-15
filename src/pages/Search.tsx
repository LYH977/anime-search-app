import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

//MUI
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import SearchIcon from '@mui/icons-material/Search';
import Thumbnail from '../components/Thumbnail';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constant';

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
  const [animeName, setAnimeName] = useState<string | null>('naruto');
  const [animeList, setAnimeList] = useState<AnimeItemProps[]>([]);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [error, setError] = useState<string | null>();
  const [lastPage, setLastPage] = useState<number>(1);

  const navigate = useNavigate();

  const fetchAnimeList = async (callback: Function) => {
    try {
      const result = await axios(
        `https://api.jikan.moe/v3/search/anime?q=${animeName}&page=${currentPage}`
      );
      callback(result);
    } catch (e) {
      console.log(e);
      callback(null);
    }
  };
  const debouncedFetchData = debounce((callback) => {
    fetchAnimeList(callback);
  }, 500);

  useEffect(() => {
    debouncedFetchData((result: any) => {
      if (result) {
        setAnimeList(result?.data?.results);
        setLastPage(result?.data?.last_page);
      }
    });
  }, [animeName]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <TextField
        sx={{ width: '80%', m: 5 }}
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
      {/* <Container> */}
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
      {/* </Container> */}
    </Box>
  );
}

export default Search;
