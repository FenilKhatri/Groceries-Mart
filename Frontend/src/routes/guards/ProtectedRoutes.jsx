import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isCheckingAuth) {
    return <Loader />;
  }

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
