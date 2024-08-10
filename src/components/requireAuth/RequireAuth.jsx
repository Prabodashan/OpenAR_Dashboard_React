import { useLocation, Navigate, Outlet } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = UseAuth();
  const location = useLocation();

  return allowedRoles?.includes(auth?.userType) ? (
    <Outlet />
  ) : auth?.userId ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
