import React from 'react';
//MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { InfoBoardProps } from '../utils/types';

function InfoBoard({ infoNo, infoText }: InfoBoardProps) {
  console.log('infoboard rerendered');
  return (
    <Box
      sx={{ bgcolor: `lightblue`, p: 3, borderRadius: 2 }}
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
    >
      <Typography variant='h5' component='div' color='blue'>
        {infoNo}
      </Typography>
      <Typography variant='overline' display='block' color='blue'>
        {infoText}
      </Typography>
    </Box>
  );
}

export default InfoBoard;
