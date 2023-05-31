import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const RouteGuard = ({ children }) => {
  // add logic to prevent children from rendering if the user is not logged in
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const protectedRoutes = {
    "/protected": true,
  };

  if (user == null && protectedRoutes[router.asPath]) router.push("/login");

  console.log("user from route guard", user);

  return children;
};

export default RouteGuard;
