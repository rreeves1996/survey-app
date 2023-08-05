import { Question } from "@prisma/client";
import React, { useState } from "react";

type QuestionFormProps = {
  showQuestionForm: boolean;
  setShowQuestionForm: (arg: boolean) => void;
  currentQuestions: FormQuestion[] | undefined;
  setCurrentQuestions: (arg: FormQuestion[]) => void;
};

export default function QuestionForm({
  showQuestionForm,
  setShowQuestionForm,
  currentQuestions,
  setCurrentQuestions,
}: QuestionFormProps) {
  const [questionBody, setQuestionBody] = useState<string>("");
  const [questionType, setQuestionType] = useState<string>("T/F");

  return (
    <div className={`${!showQuestionForm && "hidden"} my-2`}>
      <textarea
        placeholder="New question"
        className="textarea textarea-bordered textarea-sm mb-1 w-full max-w-xs"
        value={questionBody}
        onChange={(e) => setQuestionBody(e.target.value)}
      />

      <div className="flex items-center px-2">
        <label htmlFor="" className="min-w-max">
          Question type:
        </label>

        <div className="flex w-full justify-evenly">
          <label className="label flex cursor-pointer justify-start">
            <input
              type="checkbox"
              value="T/F"
              checked={questionType === "T/F" ? true : false}
              onChange={(e) => setQuestionType(e.target.value)}
              className="checkbox checkbox-xs"
            />

            <span className="label-text ml-2 text-xs font-bold uppercase">
              T/F
            </span>
          </label>

          <label className="label flex cursor-pointer justify-start">
            <input
              type="checkbox"
              value="FREQ"
              checked={questionType === "FREQ" ? true : false}
              onChange={(e) => setQuestionType(e.target.value)}
              className="checkbox checkbox-xs"
            />

            <span className="label-text ml-2 text-xs font-bold uppercase">
              Freq.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-4 flex justify-around">
        <button
          className={`btn btn-accent btn-xs ${
            !questionBody ? "btn-disabled" : ""
          }`}
          onClick={() => {
            if (questionBody) {
              setCurrentQuestions([
                ...currentQuestions!,
                { questionBody, questionType },
              ]);
              setQuestionBody("");
              setShowQuestionForm(false);

              console.log(currentQuestions);
            }
          }}
        >
          Submit
        </button>

        <button
          className="btn btn-ghost btn-xs"
          onClick={() => setShowQuestionForm(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
