import { Question } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import QuestionForm from "~/components/QuestionForm";

export default function index() {
  const [surveyName, setSurveyName] = useState<string>("");
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<FormQuestion[]>([]);

  const handleRemoveQuestion = (question: FormQuestion) => {
    const newCurrentQuestions = currentQuestions.filter(
      (item) => item !== question
    );

    setCurrentQuestions(newCurrentQuestions);

    console.log(newCurrentQuestions);
  };

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
              value={surveyName}
              className="input input-bordered input-sm ml-2 w-full"
              onChange={(e) => setSurveyName(e.target.value)}
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

        {currentQuestions &&
          currentQuestions.map((question) => (
            <div className="flex">
              <div className="collapse collapse-arrow rounded-md bg-base-200 bg-opacity-50 transition-all hover:bg-opacity-100">
                <input type="checkbox" className="min-h-8" />
                <div className="collapse-title min-h-8 pb-0 pl-3 pt-1 text-sm font-medium">
                  Question {currentQuestions.indexOf(question) + 1}
                </div>
                <div className="collapse-content text-xs">
                  <p>{question.questionBody}</p>
                </div>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="delete question"
              >
                <button
                  className="min-w-8 btn btn-square min-h-8 ml-2 h-8 w-8 bg-opacity-50"
                  onClick={() => handleRemoveQuestion(question)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}

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
