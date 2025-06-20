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
    const token = localStorage.getItem("auth_token");

    if (!token) {
      setLoading(false);
      return;
    }

    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosClient
      .get("/sanctum/csrf-cookie")
      .then(() => axiosClient.get("/api/user"))
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie");
      const response = await axiosClient.post("/api/login", credentials);

      const token = response.data.token;

      // Save token to localStorage
      localStorage.setItem("auth_token", token);

      // Set token as default header for future requests
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data } = await axiosClient.get("/api/user");
      setUser(data);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        throw new Error("Please verify your email before logging in.");
      }
      throw error; // Let the component catch and show errors
    }
  };
  const logout = async () => {
    await axiosClient.post("/api/logout");
    localStorage.removeItem("auth_token");
    delete axiosClient.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
