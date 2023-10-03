import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SurveyCompleted({
  surveyId,
}: {
  surveyId: string | undefined;
}) {
  const router = useRouter();

  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <header>
          <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
            Thank you
          </h3>
        </header>

        <div className="divider my-0" />

        <p className="mb-4 mt-2 text-center">
          Your answers have been submitted!
        </p>

        <div className="flex flex-col items-center">
          <button
            className="btn btn-accent btn-block mb-2 bg-opacity-50 hover:bg-opacity-100"
            onClick={() => router.push(`/results/${surveyId}`)}
          >
            View Results
          </button>

          <Link href="/" className="btn btn-ghost btn-sm mb-0 mt-2">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
