import React, { PropsWithChildren } from "react";
import { Navbar } from "./Navbar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="anti-aliased flex min-h-[calc(100vh-66px)] flex-col items-center bg-gradient-to-l from-blue-800 to-indigo-900 p-4">
        {children}
      </main>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(30 41 59)",
            border: "1px solid rgb(15 23 42 / 35%)",
            color: "#f8fafc",
          },
        }}
      />
    </>
  );
}
