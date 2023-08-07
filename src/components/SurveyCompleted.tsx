import Link from "next/link";
import React from "react";

export default function SurveyCompleted({ surveyId }: { surveyId: string }) {
  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <header>
          <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
            Thank you
          </h3>
        </header>

        <div className="divider my-0" />

        <p className="my-2 text-center">Your answers have been submitted!</p>
        <div className="my-2 flex flex-col items-center">
          <button
            className={`btn btn-accent btn-block bg-opacity-50 hover:bg-opacity-100`}
          >
            View Results
          </button>

          <Link href="/">
            <button className="btn btn-ghost btn-sm mb-0 mt-2">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
