import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getMe, logoutApi } from "../features/auth/api";
import http from "../shared/api/http";

const AuthContext = createContext(null);

const getInitialAuth = () => {
  const role = localStorage.getItem("role");

  return {
    role: role || null,
    user: null,
    vendor: null,
    admin: null,
    isAuthenticated: false,
    isCheckingAuth: true,
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      setAuth((prev) => ({ ...prev, isCheckingAuth: false }));
      return;
    }

    const initAuth = async () => {
      try {
        const res = await getMe();

        const account = res?.data?.account;
        const role = res?.data?.accountType;

        setAuth({
          role,
          user: role === "user" ? account : null,
          vendor: role === "vendor" ? account : null,
          admin: role === "admin" ? account : null,
          isAuthenticated: true,
          isCheckingAuth: false,
        });

        localStorage.setItem("role", role);
      } catch {
        localStorage.removeItem("role");

        setAuth({
          role: null,
          user: null,
          vendor: null,
          admin: null,
          isAuthenticated: false,
          isCheckingAuth: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = useCallback(({ role, vendor, user, admin }) => {
    localStorage.setItem("role", role);

    setAuth({
      role,
      user: role === "user" ? user : null,
      vendor: role === "vendor" ? vendor : null,
      admin: role === "admin" ? admin : null,
      isAuthenticated: true,
      isCheckingAuth: false,
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      await http.post("/logout");
    } catch (err) {
      console.error("Logout API failed:", err);
    }

    localStorage.removeItem("role");

    setAuth({
      role: null,
      user: null,
      vendor: null,
      admin: null,
      isAuthenticated: false,
      isCheckingAuth: false,
    });
  }, []);
  
  const value = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);
  
  if (auth.isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
