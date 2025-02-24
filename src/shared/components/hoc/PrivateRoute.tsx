// DEPENDENCIES
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoutes() {
  // * DEVELOPER NOTES:
  // You can use the auth object to check if the user is authenticated
  // If they are authenticated, return the layout and outlet
  // If they are not authenticated, return a navigate to the login page

  const auth = {
    accessToken: true,
    refreshToken: true,
    userId: true,
  };
  return auth.accessToken && auth.refreshToken && auth.userId ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
}
