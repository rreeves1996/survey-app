import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { AiOutlineLink } from "react-icons/ai";
import Container from "~/components/Container";

const notifyCopy = () => toast("Link copied to clipboard.");

export default function Page() {
  const router = useRouter();
  const id = router.query.id;

  return (
    <Container>
      <header>
        <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
          Success
        </h3>
      </header>

      <div className="divider my-0" />

      <p className="my-2 text-center">
        <strong>Your survey has been successfully created!</strong>
      </p>

      <p className="mb-3">
        Here are the links to your survey and results page. Save these links, as
        you will <strong className="underline">not</strong> be able to recover
        them once you have left this page!
      </p>

      <div className="px-2 pb-3">
        <p className="mb-1 text-sm uppercase tracking-tight">
          <strong>Survey link</strong>
        </p>

        <div className="flex items-center">
          <div className="overflow-x-scroll rounded-md bg-slate-700 py-1 pl-2">
            <pre>
              <code>https://survey-app-silk.vercel.app/survey/{id}</code>
            </pre>
          </div>

          <div className="tooltip tooltip-bottom ml-4" data-tip="copy link">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://survey-app-silk.vercel.app/survey/${id}`
                );

                notifyCopy();
              }}
              className="min-w-8 btn btn-square min-h-8 h-8 w-8  border-slate-700 bg-slate-700 bg-opacity-50 hover:border-slate-700 hover:bg-slate-700"
            >
              <AiOutlineLink />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-2 px-2 pb-2">
        <p className="mb-1 text-sm uppercase tracking-tight">
          <strong>Results page</strong>
        </p>

        <div className="flex items-center">
          <div className="overflow-x-scroll rounded-md bg-slate-700 py-1 pl-2">
            <pre>
              <code>https://survey-app-silk.vercel.app/survey/{id}</code>
            </pre>
          </div>

          <div className="tooltip tooltip-bottom ml-4" data-tip="copy link">
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://survey-app-silk.vercel.app/survey/${id}`
                );

                notifyCopy();
              }}
              className="min-w-8 btn btn-square min-h-8 h-8 w-8  border-slate-700 bg-slate-700 bg-opacity-50 hover:border-slate-700 hover:bg-slate-700"
            >
              <AiOutlineLink />
            </button>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="btn btn-accent btn-block mb-2 bg-opacity-50 hover:bg-opacity-100"
      >
        Home
      </Link>
    </Container>
  );
}
