import React from 'react';
import { AnimeItemProps } from '../pages/Search';

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Thumbnail({ item, gotoDetail }: any) {
  return (
    <Card onClick={gotoDetail}>
      <CardActionArea sx={{ bgcolor: 'red' }}>
        <CardMedia
          component='img'
          image={item.image_url}
          alt={item.title}
          height='400'
        />
        <CardContent sx={{ height: 50 }}>
          <Typography variant='body2' color='text.secondary'>
            {item.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Thumbnail;
