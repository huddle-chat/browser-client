import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { CurrentUser } from "@/@types/user";
import { AuthContext } from "@/context/auth";
import { fetchMe } from "@/api/auth";

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({});

  const updateCurrentUser = (user: CurrentUser): void => {
    setCurrentUser(user);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (token) {
          const { data } = await fetchMe(token);
          setCurrentUser(data.user);
        } else {
          setCurrentUser({});
        }
      } catch (error) {
        localStorage.removeItem("access_token");
      }
    })();
  }, []);

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
      <AuthContext.Provider value={{ currentUser, updateCurrentUser }}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}
