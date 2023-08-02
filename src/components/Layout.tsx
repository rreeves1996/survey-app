import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import Head from "next/head";

export default function Layout({ children }: PropsWithChildren) {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>surveyFriend</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData && <Navbar />}
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-l from-blue-800 to-indigo-900 p-4">
        {children}
      </main>
    </>
  );
}