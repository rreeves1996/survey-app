import { Question } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import QuestionForm from "~/components/QuestionForm";

export default function index() {
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<FormQuestion[]>([]);

  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800">
        <h1 className="text-center text-4xl font-extralight tracking-wider text-slate-100">
          Create Survey
        </h1>

        <div className="divider" />

        <form action="" className="mb-2">
          <div className="flex items-baseline">
            <label
              htmlFor="name"
              className="min-w-fit text-lg font-bold  tracking-tight"
            >
              Survey name:
            </label>

            <input
              type="text"
              name="name"
              placeholder="New survey"
              className="input input-bordered input-sm ml-2 w-full"
            />
          </div>
        </form>

        <p className="text-sm">
          <strong>TRUE/FALSE</strong> questions allow the user to answer with
          either true or false.
        </p>
        <p className="text-sm">
          <strong>FREQUENCY</strong> questions allow the user to respond with
          their frequency (1-5), with 1 being "never" and 5 being "always."
        </p>

        <QuestionForm
          showQuestionForm={showQuestionForm}
          setShowQuestionForm={setShowQuestionForm}
          currentQuestions={currentQuestions}
          setCurrentQuestions={setCurrentQuestions}
        />

        <button
          onClick={() => setShowQuestionForm(true)}
          className={`btn btn-accent btn-ghost btn-sm max-w-max ${
            showQuestionForm ? "hidden" : ""
          }`}
        >
          + Add Question
        </button>

        <div className="divider mt-0" />
        <div>
          <button className="btn btn-accent btn-outline btn-block">
            Create Survey
          </button>

          <Link href="/">
            <button className="btn btn-ghost btn-block mb-0 mt-2">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
