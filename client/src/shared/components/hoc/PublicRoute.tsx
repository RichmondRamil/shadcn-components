// DEPENDENCIES
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  // * DEVELOPER NOTES:
  // You can use the auth object to check if the user is authenticated
  // If they are authenticated, return the layout and outlet
  // If they are not authenticated, return a navigate to the login page

  const auth = {
    accessToken: false,
    refreshToken: false,
    userId: false,
  };

  return !auth.accessToken && !auth.refreshToken && !auth.userId ? (
    <Outlet />
  ) : (
    <Navigate to='/' />
  );
};

export default PublicRoute;
