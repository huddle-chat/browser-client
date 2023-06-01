import { CurrentUser } from "@/@types/user";
import { createContext, useState, useEffect } from "react";
import { fetchMe } from "@/api/auth";

interface AuthContext {
  user: CurrentUser | null;
  updateUser: (user: CurrentUser) => void;
  token: string | null;
  updateToken: (token: string | null) => void;
  authLoading: boolean;
}

export const AuthContext = createContext<AuthContext>({
  user: {},
  updateUser: (user: CurrentUser | null) => {},
  token: "",
  updateToken: (token: string | null) => {},
  authLoading: true,
});
