import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <header>
          <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
            Sign In
          </h3>
        </header>

        <div className="divider my-0" />

        <p className="text-center">
          <strong>Sign in using OAuth 2:</strong>
        </p>

        <div className="my-2 flex flex-col gap-2">
          <button
            className="hover: btn btn-accent btn-block mb-2 border-slate-700 bg-slate-900 bg-opacity-30 hover:border-slate-700 hover:bg-slate-700 hover:bg-opacity-100"
            onClick={() =>
              void signIn("github", {
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            <AiFillGithub className="text-xl" /> Continue with GitHub
          </button>

          <button
            className="btn btn-primary btn-block mb-2 bg-opacity-30 hover:bg-opacity-100"
            onClick={() =>
              void signIn("discord", {
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            <FaDiscord className="text-xl" /> Continue with Discord
          </button>

          <button
            className="btn btn-block mb-2 border-slate-200 bg-blue-50 bg-opacity-30 text-white hover:bg-blue-50 hover:bg-opacity-100 hover:text-slate-900"
            onClick={() =>
              void signIn("google", {
                redirect: true,
                callbackUrl: "/",
              })
            }
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </button>
        </div>
        {/* 
        <div className="divider mb-0 mt-2" />

        <p className="mb-2 text-center">
          Or continue with{" "}
          <a
            className="text-center text-blue-600 hover:underline"
            href="/auth/emaillogin"
          >
            email »
          </a>
        </p> */}
      </div>
    </div>
  );
}
