import { SlideProps } from '@mui/material';

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

export type TransitionProps = Omit<SlideProps, 'direction'>;
