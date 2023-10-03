import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import SURVEY_LOGO from "../assets/surveylogo.png";
import { ImVideoCamera } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // useEffect is used here instead of getServerSideProps to avoid slow loading on home page

  useEffect(() => {
    if (sessionData) {
      router.push(`/dashboard`);
    }
  }, [sessionData]);

  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 pt-8 md:flex-row-reverse">
      <div className="flex h-full w-full flex-col justify-center md:w-1/3">
        <Image
          src={SURVEY_LOGO}
          alt="surveylogo"
          objectFit="cover"
          priority={true}
          className="left-0 top-0 w-2/3 self-center object-cover md:w-full"
        />
      </div>

      <div className="flex flex-col items-center gap-2 md:w-1/2 ">
        <header className="text-white ">
          <h1 className="mb-4 text-4xl md:my-8 md:text-6xl">
            <strong>Need to make a survey? Just make it here.</strong>
          </h1>

          <p className="flex flex-col text-slate-300">
            It's that simple. Continue with OAuth 2 or as a guest.
            <span className="text-xs">
              (Guest accounts cannot edit surveys after their creation)
            </span>
          </p>
        </header>

        <div className="divider m-auto my-6 w-full px-6 md:px-36" />

        <div className="flex flex-col text-slate-200">
          <button
            className="btn btn-accent rounded-xl bg-opacity-40 md:min-h-16 hover:bg-opacity-100 md:px-10 md:text-lg"
            onClick={() => void signIn()}
          >
            Sign in
          </button>

          <p className="my-3 text-center leading-none">or</p>

          <Link
            href="/guestsurvey"
            className="text-md btn btn-neutral rounded-xl border-slate-200 bg-opacity-0 text-slate-200  md:min-h-16 hover:border-slate-200 hover:bg-slate-200 hover:bg-opacity-20 md:px-10 md:text-lg"
          >
            Continue as guest
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            target="_blank"
            href="https://www.loom.com/share/0903568b120d4a6ca2e2b0db078a959a?sid=16096163-f592-41c3-81bd-2073e5cd2909"
            className="btn btn-ghost btn-sm mt-2 text-slate-200"
          >
            <ImVideoCamera className="text-lg" /> App Demo »
          </Link>

          <Link
            target="_blank"
            href="https://github.com/rreeves1996/survey-app"
            className="btn btn-ghost btn-sm mt-2 text-slate-200"
          >
            <FaGithub className="text-lg" /> View Repo »
          </Link>
        </div>
      </div>
    </div>
  );
}
