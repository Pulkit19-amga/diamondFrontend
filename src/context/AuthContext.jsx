import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get user on mount (if session cookie exists)
    axiosClient.get("/api/user")
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    await axiosClient.get("/sanctum/csrf-cookie"); // Get CSRF cookie first
    const response = await axiosClient.post("/api/login", credentials); // Login, session cookie set here
    const { user } = response.data;
    setUser(user);
  };

  const logout = async () => {
    await axiosClient.post("/api/logout"); // Laravel invalidates session
    setUser(null);
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
