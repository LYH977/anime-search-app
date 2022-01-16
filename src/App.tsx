import React from 'react';
import SearchPage from './pages/SearchPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ROUTES } from './utils/constant';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Box
        sx={{ bgcolor: 'lightgrey', p: 5, flexGrow: 1 }}
        display='flex'
        justifyContent='center'
        alignItems='center'
      > */}
      <Container sx={{ p: 5, flexGrow: 1 }}>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
          <Route path='*' element={<Navigate to={ROUTES.SEARCH} />} />
        </Routes>
      </Container>
      {/* </Box> */}
    </BrowserRouter>
  );
}

export default App;
