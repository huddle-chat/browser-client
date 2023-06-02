import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const RouteGuard = ({ children }: any) => {
  // add logic to check if user is logged in, if not, redirect to login
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { user, authLoading } = useContext(AuthContext);

  const allowedRoutes = {
    "/login": true,
    "/": true,
    "/register": true,
  };

  useEffect(() => {
    const authCheck = () => {
      const path = router.asPath;
      if (!user && !allowedRoutes[path]) {
        if (!authLoading) {
          router.push("/login");
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
  }, [router, router.events, user]);

  useEffect(() => {
    if (!authLoading && user && !user.isVerified) {
      if (router.asPath !== "/login") {
        router.push("/login");
      }
    }
  }, [user, router]);

  return authorized ? children : <div>Loading...</div>;
};

export default RouteGuard;
