import { CurrentUser } from "@/@types/user";
import { useState, useEffect } from "react";
import { fetchMe } from "@/api/auth";

export const useAuth = () => {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const accessToken = localStorage.getItem("access_token");
      try {
        if (token && !user) {
          const { data } = await fetchMe(accessToken);
          setUser(data.user);
          setToken(accessToken);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
        setToken("");
      }
    })();
  }, []);

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
  };
};
