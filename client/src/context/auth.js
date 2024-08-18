import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const API = process.env.REACT_APP_API;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
  };

  const AuthorizationToken = token;

  const userAuthentication = useCallback(async () => {
    if (!AuthorizationToken) return;

    try {
      const response = await axios.get(`${API}/api/auth/user-auth`, {
        headers: {
          Authorization: `Bearer ${AuthorizationToken}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data.userData);
        setUser(response.data.userData);
      }
    } catch (error) {
      console.log(`Error fetching user data: ${error}`);
    }
  }, [AuthorizationToken]);

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        AuthorizationToken,
        userAuthentication,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
