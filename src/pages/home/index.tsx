import { signIn } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FaGithub } from 'react-icons/fa';

export default function Page() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extralight tracking-tight text-white sm:text-[5rem]">
        survey
        <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
      </h1>

      <div className="divider mx-auto my-0 w-56" />

      <div className="flex flex-col items-center gap-2">
        <button
          className="btn btn-accent min-h-16 rounded-xl bg-opacity-40 px-10 text-lg hover:bg-opacity-100"
          onClick={() => void signIn()}
        >
          Sign in
        </button>

        <Link href="https://github.com/rreeves1996/survey-app">
          <button className="btn btn-ghost btn-sm mt-2">
            <FaGithub className="text-lg" /> View Repo »
          </button>
        </Link>
      </div>
    </div>
  );
}
