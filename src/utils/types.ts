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

export type InfoBoardProps = {
  infoNo: string;
  infoText: string;
};

export type ThumbnaildProps = {
  item: AnimeItemProps;
  goToDetail: (mal_id: number) => void;
};

export type TransitionProps = Omit<SlideProps, 'direction'>;
