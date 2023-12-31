import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import Container from "~/components/Container";

export default function Page() {
  return (
    <Container>
      <header>
        <div className="relative h-20 w-auto">
          <Image
            src="/logo.png"
            alt="logo"
            priority={true}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </header>

      <div className="divider my-0" />

      <div className="mt-2 flex justify-around">
        <div className="badge w-16 rounded-md py-2 text-xs font-bold tracking-wide">
          Next.js
        </div>

        <div className="badge w-16 rounded-md py-2 text-xs font-bold tracking-wide">
          React.js
        </div>

        <div className="badge w-16 rounded-md py-2 text-xs font-bold tracking-wide">
          Prisma
        </div>
      </div>

      <div className="my-1 flex justify-around">
        <div className="badge w-24 rounded-md py-2 text-xs font-bold tracking-wide">
          Tailwind CSS
        </div>

        <div className="badge w-24 rounded-md py-2 text-xs font-bold tracking-wide">
          TypeScript
        </div>
      </div>

      <div className="mb-1 flex justify-around">
        <div className="badge w-16 rounded-md py-2 text-xs font-bold tracking-wide">
          tRPC
        </div>

        <div className="badge w-24 rounded-md py-2 text-xs font-bold tracking-wide">
          PostgreSQL
        </div>

        <div className="badge w-16 rounded-md py-2 text-xs font-bold tracking-wide">
          Node.js
        </div>
      </div>

      <h5 className="my-2 text-center text-2xl">
        Created with the{" "}
        <Link href="https://create.t3.gg/">
          <strong className="text-slate-50 hover:text-slate-200">
            T3 Stack
          </strong>
        </Link>
      </h5>

      <p className="indent-4 text-sm">
        The{" "}
        <Link href="https://create.t3.gg/">
          <strong className="text-slate-50 hover:text-slate-200">
            T3 Stack
          </strong>
        </Link>{" "}
        is an open-source Next.js package utilizing Tailwind, tRPC, and Prisma.
        I had a lot of fun with this stack. One of my favorite features by far
        is the typing tRPC provides - it was invaluable and made the development
        feel seamless and safe from start to end!
      </p>
      <p className="mt-0 indent-4 text-sm">
        The back end of this app utilizes{" "}
        <Link href="https://supabase.com/">
          <strong className="text-slate-50 hover:text-slate-200">
            Supabase
          </strong>
        </Link>{" "}
        along with the Prisma schema. This was my first time utilizing Supabase,
        and I was incredibly impressed with it! I'm very excited for the future
        of Supabase, and plan to use it regularly in more apps.
      </p>

      <h5 className="my-2 text-center text-2xl">Contact the developer</h5>

      <div className="mb-2 flex justify-center">
        <div className="flex justify-center">
          <div className="relative h-28 w-28">
            <Image
              src="/me.png"
              alt="logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>

          <div className="ml-2 flex flex-col justify-around">
            <Link
              href="https://github.com/rreeves1996"
              className="btn btn-sm w-8 rounded-full p-0"
            >
              <FiGithub className="text-lg" />
            </Link>
            <Link
              href="https://linkedin.com/in/rreevesdev"
              className="btn btn-sm w-8 rounded-full p-0"
            >
              <FiLinkedin className="text-lg" />
            </Link>
            <Link
              href="https://www.instagram.com/ryanmakesloudnoises/"
              className="btn btn-sm w-8 rounded-full p-0"
            >
              <FiInstagram className="text-lg" />
            </Link>
          </div>
        </div>

        <div className="mr-2 flex flex-col text-center text-xs">
          <p className="text-lg">Ryan Reeves</p>
          <p>Honolulu, HI (GMT-10)</p>
          <p>rreeves.dev@gmail.com</p>
          <p>https://rreeves.dev/</p>
        </div>
      </div>
    </Container>
  );
}
