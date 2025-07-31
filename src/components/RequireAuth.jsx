import { Outlet, Navigate, useLocation } from "react-router-dom";
import useGetAuthData from "../hooks/useGetAuthData";

const RequireAuth = () => {
  const location = useLocation();
  const { user } = useGetAuthData();

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
export default RequireAuth;
