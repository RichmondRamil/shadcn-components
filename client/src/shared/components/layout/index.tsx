// REACT
import React, { useState, useEffect } from 'react';
// DEPENNDECIES
import { useNavigate, NavigateFunction } from 'react-router-dom';
// SERVICES

// COMPONENTS
// import Loader from '../../shared/components/Loader';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function LayoutComponent({ children }: ILayoutProps) {
  // INSTANTIATE SERVICE
  const navigate: NavigateFunction = useNavigate();
  // STATE
  const [isAdmin, setIsAdmin] = useState(false);

  return <></>;
}
