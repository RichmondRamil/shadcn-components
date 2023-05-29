// DEPENDENCIES
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// LAYOUT
import Layout from '../layout';

export default function PrivateRoutes() {
  const auth = {
    accessToken: true,
    refreshToken: true,
    userId: true,
  };
  return auth.accessToken && auth.refreshToken && auth.userId ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to='/login' />
  );
}
