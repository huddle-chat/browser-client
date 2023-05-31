import Head from "next/head";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import AuthProvider from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { CurrentUser } from "@/@types/user";
import { fetchMe } from "@/api/auth";
import { useRouter } from "next/router";
import RouteGuard from "@/components/RouteGuard";
import { useAuth } from "@/hooks/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  const { user, updateUser, token, updateToken } = useAuth();

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
