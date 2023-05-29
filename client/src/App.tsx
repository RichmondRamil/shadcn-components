// REACT
import { useState } from 'react';
// DEPENDENCIES
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
// COMPONENTS
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
// HOC
import PrivateRoutes from './shared/components/hoc/PrivateRoute';

// THEME AND CSS

function App() {
  return (
    <>
      {/* TODO: add loader */}
      {/* <Loader isLoading={isLoading} /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/' element={<HomePage />} />
          </Route>
          {/* <Route element={<PublicRoutes />}>
              <Route path='/login' element={<LoginPageView />} />
            </Route> */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
