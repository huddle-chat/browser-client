import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const RouteGuard = ({ children }) => {
  // add logic to check if user is logged in, if not, redirect to login
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user, authLoading } = useContext(AuthContext);

  const protectedRoutes = {
    "/protected": true,
  };

  useEffect(() => {
    const authCheck = () => {
      if (!user && protectedRoutes[router.asPath]) {
        setAuthorized(false);
        if (!authLoading) {
          router.push({
            pathname: "/login",
          });
        }
      } else {
        setAuthorized(true);
      }
    };

    authCheck();

    const preventAccess = () => setAuthorized(false);

    router.events.on("routeChangeStart", preventAccess);
    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeStart", preventAccess);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, [router, router.events, user, authLoading]);

  return authorized ? children : <div>Loading...</div>;
};

export default RouteGuard;
