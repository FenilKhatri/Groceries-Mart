import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isCheckingAuth) return <div>Loading...</div>;

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth?.role !== "user") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserRoute;
