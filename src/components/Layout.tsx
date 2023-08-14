import { useSession } from "next-auth/react";
import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import Head from "next/head";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-66px)] flex-col items-center bg-gradient-to-l from-blue-800 to-indigo-900 p-4">
        {children}
      </main>
    </>
  );
}
