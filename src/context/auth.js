import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

import { useCookies } from "react-cookie";
import useFetch from "@/hooks/useFetch";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const [error, setError] = useState({});

  const freelanceRegister = (e, userForm) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:3001/api/v1/auth/freelanceRegister`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userForm),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (!res.ok) {
              setError({ message: data.message, status: res.status });
            } else {
              delete userForm.password;
              setUser(userForm);
              setCookie("token", JSON.stringify(data.token), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              });
              localStorage.setItem("User", JSON.stringify(userForm));
              router.push("/");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  const recruiterRegister = (e, userForm) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:3001/api/v1/auth/recruiterRegister`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userForm),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (!res.ok) {
              setError({ message: data.message, status: res.status });
            } else {
              delete userForm.password;
              setUser(userForm);
              setCookie("token", JSON.stringify(data.token), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              });
              localStorage.setItem("User", JSON.stringify(userForm));
              router.push("/");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  const login = async (e, userForm) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`http://localhost:3001/api/v1/auth/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(userForm),
    })
      .then((res) => {
        res
          .json()
          .then((data) => {
            if (!res.ok) {
              setError({ message: data.message, status: res.status });
            } else {
              const role = data.freelance?.jobs
                ? "Freelance"
                : data.user.isAdmin
                ? "Admin"
                : data.user.company
                ? "Recruteur"
                : "Erreur";
              setUser({ ...data.user, ...data.freelance, role });
              setCookie("token", JSON.stringify(data.token), {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
              });
              localStorage.setItem(
                "User",
                JSON.stringify({ ...data.user, ...data.freelance, role })
              );
              router.push("/");
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    setIsLoading(false);
  };

  const logout = () => {
    removeCookie("token", { path: "/", domain: "localhost" });
    localStorage.clear();
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    if (!cookie.token) {
      localStorage.clear();
      setUser(null);
      return;
    }
    const stored = localStorage.getItem("User");
    setUser(stored ? JSON.parse(stored) : null);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged: !!user,
        user,
        login,
        freelanceRegister,
        recruiterRegister,
        isLoading,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
