import { Question } from "@prisma/client";
import React from "react";

type QuestionFormProps = {
  showQuestionForm: boolean;
  setShowQuestionForm: (arg: boolean) => void;
  currentQuestions: Question[] | null;
  setCurrentQuestions: (arg: Question[]) => void;
};

export default function QuestionForm({
  showQuestionForm,
  setShowQuestionForm,
  currentQuestions,
  setCurrentQuestions,
}: QuestionFormProps) {
  return (
    <div className={`${showQuestionForm ? "" : "hidden"} mt-2`}>
      <textarea
        placeholder="New question"
        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
      />

      <select className="select select-bordered select-sm w-full max-w-xs">
        <option>True or false</option>
        <option>Frequency</option>
      </select>

      <div className="mt-4 flex justify-around">
        <button className="btn btn-accent btn-xs">Submit</button>
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
