import React from 'react';
//MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function InfoBoard({ infoNo, infoText }: any) {
  return (
    <Box
      sx={{ bgcolor: 'red' }}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography>{infoNo}</Typography>
      <Typography>{infoText}</Typography>
    </Box>
  );
}

export default InfoBoard;
