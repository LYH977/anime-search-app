import React from 'react';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { ROUTES } from './utils/constant';

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
          <Route index element={<Search />} />
          <Route path={`${ROUTES.DETAIL}/:id`} element={<Detail />} />
          <Route path='*' element={<Navigate to={ROUTES.SEARCH} />} />
        </Routes>
      </Container>
      {/* </Box> */}
    </BrowserRouter>
  );
}

export default App;
