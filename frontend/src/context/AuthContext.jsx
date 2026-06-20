import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);

    localStorage.setItem("currentUser", JSON.stringify(user));

    setUser(user);

    return user;
  };

  const register = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      name,
      email,
      password,
    });

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("currentUser");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
