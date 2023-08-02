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
    <div className={`${showQuestionForm ? "" : "hidden"} mt-2`}>
      <textarea
        placeholder="New question"
        className="textarea textarea-bordered textarea-sm w-full max-w-xs"
        value={questionBody}
        onChange={(e) => setQuestionBody(e.target.value)}
      />

      <div className="flex items-baseline">
        <label htmlFor="question-type" className="min-w-max">
          Question type:
        </label>

        <select
          name="question-type"
          className="select select-bordered select-sm ml-2 mt-1 w-full max-w-xs"
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <option value="T/F">True or false</option>
          <option value="FREQ">Frequency</option>
        </select>
      </div>
      <div className="mt-4 flex justify-around">
        <button
          className="btn btn-accent btn-xs"
          onClick={() => {
            setCurrentQuestions([
              ...currentQuestions!,
              { questionBody, questionType },
            ]);
            setQuestionBody("");
            setShowQuestionForm(false);
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
