import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

const AdminRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isCheckingAuth) return <Loader />;

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (auth.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
