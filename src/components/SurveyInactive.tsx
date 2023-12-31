import Link from "next/link";
import React from "react";

export default function SurveyInactive() {
  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <header>
          <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
            Sorry
          </h3>
        </header>

        <div className="divider my-0" />

        <p className="my-2 text-center">This survey is currently inactive.</p>

        <Link
          href="/"
          className="btn btn-accent btn-block my-2 mb-4 bg-opacity-50 hover:bg-opacity-100"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
