import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import RouteGuard from "@/components/RouteGuard";
import { useAuth } from "@/hooks/useAuth";

export default function App({ Component }: AppProps) {
  const { user, updateUser, token, updateToken, authLoading } = useAuth();

  return (
    <>
      <Head>
        <title>Huddle</title>
        <meta
          name="description"
          content="The only virtual office you'll need."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthContext.Provider
        value={{
          user,
          updateUser,
          token,
          updateToken,
          authLoading,
        }}
      >
        <Navbar />
        <RouteGuard>
          <Component />
        </RouteGuard>
      </AuthContext.Provider>
    </>
  );
}
