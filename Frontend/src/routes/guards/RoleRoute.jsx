import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../shared/components/ui/Loader";

const RoleRoute = ({
  children,
  allowedRoles = [],
  redirectTo = "/",
}) => {
  const { auth } = useAuth();

  // While checking auth
  if (auth?.isCheckingAuth) {
    return <Loader />;
  }

  // Not logged in
  if (!auth?.isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(auth?.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default RoleRoute;
