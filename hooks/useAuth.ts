import { CurrentUser } from "@/@types/user";
import { useState, useEffect } from "react";
import { fetchMe } from "@/api/auth";

export const useAuth = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("firing in useAuth");
    (async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        setAuthLoading(true);
        if (accessToken && !user) {
          const { data } = await fetchMe(accessToken);
          setUser(data.user);
          setToken(accessToken);
        } else {
          setUser(null);
        }
        setAuthLoading(false);
      } catch (error) {
        setAuthLoading(false);
        setUser(null);
        setToken("");
      }
    })();
  }, [token]);

  const updateUser = (user: CurrentUser | null): void => {
    setUser(user);
  };

  const updateToken = (token: string | null): void => {
    setToken(token);
  };

  return {
    user,
    updateUser,
    token,
    updateToken,
    authLoading,
  };
};
