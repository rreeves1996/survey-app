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

        <Link href="/">
          <button className="btn btn-accent btn-block mb-2 bg-opacity-50 hover:bg-opacity-100">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
}
