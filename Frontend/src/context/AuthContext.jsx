import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { getMe } from "../api/authApi";

const AuthContext = createContext(null);

const getInitialAuth = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return {
    role: role || null,
    user: null,
    vendor: null,
    admin: null,
    token: token || null,
    isAuthenticated: !!token,
    isCheckingAuth: true,
  };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getInitialAuth);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: false,
          isCheckingAuth: false,
        }));
        return;
      }

      try {
        const res = await getMe();

        const account = res?.data?.account;
        const role = res?.data?.accountType;

        setAuth({
          role: role || null,
          user: role === "user" ? account : null,
          vendor: role === "vendor" ? account : null,
          admin: role === "admin" ? account : null,
          token,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } catch (error) {
        console.error("getMe failed:", error);

        // Only logout on 401
        if (error?.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");

          setAuth({
            role: null,
            user: null,
            vendor: null,
            admin: null,
            token: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        } else {
          setAuth((prev) => ({
            ...prev,
            isCheckingAuth: false,
          }));
        }
      }
    };

    initAuth();
  }, []);

  const login = useCallback(({ role, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setAuth({
      role,
      user: null,
      vendor: null,
      admin: null,
      token,
      isAuthenticated: true,
      isCheckingAuth: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setAuth({
      role: null,
      user: null,
      vendor: null,
      admin: null,
      token: null,
      isAuthenticated: false,
      isCheckingAuth: false,
    });
  }, []);

  const value = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
