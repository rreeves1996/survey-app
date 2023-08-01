import React from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extralight tracking-tight text-white sm:text-[5rem]">
          survey
          <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
