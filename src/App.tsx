import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import { ROUTES } from './utils/constant';
//MUI
import Container from '@mui/material/Container';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container sx={{ p: 5, flexGrow: 1 }}>
        <Routes>
          <Route index element={<SearchPage />} />
          <Route path={`${ROUTES.DETAIL}/:id`} element={<DetailPage />} />
          <Route path='*' element={<Navigate to={ROUTES.SEARCH} />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
