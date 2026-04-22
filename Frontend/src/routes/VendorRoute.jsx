import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/ui/Loader";

const VendorRoute = ({ children }) => {
  const { auth } = useAuth();

  if (auth?.isCheckingAuth) return <Loader />;

  if (!auth?.isAuthenticated) {
    return <Navigate to="/vendor/login" replace />;
  }
  
  if (auth?.role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default VendorRoute;
