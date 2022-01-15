import React from 'react';
//MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function InfoBoard({ infoNo, infoText, color }: any) {
  return (
    <Box
      sx={{ bgcolor: `light${color}`, p: 3, borderRadius: 2 }}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h5' component='div' color={color}>
        {infoNo}
      </Typography>
      <Typography variant='overline' display='block' color={color}>
        {infoText}
      </Typography>
    </Box>
  );
}

export default InfoBoard;
