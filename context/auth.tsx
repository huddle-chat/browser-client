import { CurrentUser } from "@/@types/user";
import { createContext } from "react";

interface AuthContext {
  currentUser: CurrentUser;
  updateCurrentUser: (user: CurrentUser) => void;
}

export const AuthContext = createContext<AuthContext>({
  currentUser: {},
  updateCurrentUser: (user: CurrentUser) => {},
});
