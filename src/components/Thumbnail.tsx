import React from 'react';

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

function Thumbnail({ item, gotoDetail }: any) {
  return (
    <Card onClick={gotoDetail} sx={{ boxShadow: 3 }}>
      <CardActionArea>
        <CardMedia
          component='img'
          image={item.image_url}
          alt={item.title}
          height='400'
        />
        <CardContent sx={{ height: 50 }}>
          <Typography variant='body2'>{item.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Thumbnail;
