import React from 'react';
//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constant';
import { ButtonBase } from '@mui/material';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <ButtonBase>
            <Typography
              variant='h6'
              color='inherit'
              component='div'
              onClick={() => navigate(ROUTES.SEARCH)}
            >
              Anime
            </Typography>
          </ButtonBase>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
