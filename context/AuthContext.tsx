import { CurrentUser } from "@/@types/user";
import { createContext, useState, useEffect } from "react";
import { fetchMe } from "@/api/auth";

interface AuthContext {
  user: CurrentUser | null;
  updateUser: (user: CurrentUser) => void;
  token: string | null;
  updateToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: {},
  updateUser: (user: CurrentUser) => {},
  token: "",
  updateToken: (token: string | null) => {},
});
