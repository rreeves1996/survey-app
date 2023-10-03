import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import QuestionForm from "~/components/QuestionForm";
import { api } from "~/utils/api";
import { v4 } from "uuid";
import { toast } from "react-hot-toast";
import Container from "~/components/Container";

const notifyCreate = () => toast("Survey successfully created.");

export default function Page() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [surveyName, setSurveyName] = useState<string>("");
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<FormQuestion[]>([]);

  const createQuestion = api.question.create.useMutation({
    onSuccess: () => null,
  });

  const createSurvey = api.survey.createGuest.useMutation({
    onSuccess: (data) => {
      currentQuestions.map((question) =>
        createQuestion.mutate({
          surveyId: data.id,
          questionType: question.questionType,
          questionBody: question.questionBody,
        })
      );

      router.push(`/createsuccess/${data.id}`);
      notifyCreate();
    },
  });

  const handleRemoveQuestion = (question: FormQuestion) => {
    const newCurrentQuestions = currentQuestions.filter(
      (item) => item !== question
    );

    setCurrentQuestions(newCurrentQuestions);
  };

  return (
    <Container>
      <h1 className="text-center text-6xl font-extralight uppercase tracking-widest text-slate-100">
        Create
      </h1>

      <div className="divider" />

      <form action="" className="mb-2">
        <div className="flex items-end">
          <label
            htmlFor="name"
            className="min-w-fit text-lg font-bold  tracking-tight"
          >
            Survey name:
          </label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="New survey"
            value={surveyName}
            className="input input-bordered input-sm ml-2 h-7 w-full pl-2"
            onChange={(e) => setSurveyName(e.target.value)}
          />
        </div>
      </form>

      <p className="text-sm">
        <strong>NOTE:</strong> As a guest, you will not be able to go back and
        edit your survey after its creation.
      </p>

      <p className="text-sm">
        <strong>TRUE/FALSE</strong> questions allow the user to answer with
        either true or false.
      </p>

      <p className="mb-2 text-sm">
        <strong>FREQUENCY</strong> questions allow the user to respond with
        their frequency (1-5), with 1 being "never" and 5 being "always."
      </p>

      {currentQuestions &&
        currentQuestions
          .slice(currentPage * 5, 5 + currentPage * 5)
          .map((question) => (
            <div className="flex" key={v4()}>
              <div className="collapse-arrow collapse rounded-md bg-base-200 bg-opacity-50 transition-all hover:bg-opacity-100">
                <input type="checkbox" className="min-h-8" />
                <div className="collapse-title min-h-8 flex w-full justify-between pb-0 pl-3 pt-1 text-sm font-medium">
                  <p>Question {currentQuestions.indexOf(question) + 1}</p>
                  <p className="flex-grow-0">{question.questionType}</p>
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
        className={`btn btn-accent btn-ghost btn-sm mt-1 max-w-max ${
          showQuestionForm ? "hidden" : ""
        }`}
      >
        + Add Question
      </button>

      <div
        className={`join mt-2 w-full justify-center ${
          currentQuestions.length <= 4 ? "hidden" : ""
        }`}
      >
        <button
          className="btn join-item min-h-6 h-8"
          onClick={() =>
            currentPage !== 0 ? setCurrentPage(currentPage - 1) : null
          }
        >
          «
        </button>

        <button className="btn join-item  min-h-6 h-8">
          Page {currentPage + 1}
        </button>

        <button
          className="btn join-item  min-h-6 h-8"
          onClick={() =>
            currentQuestions.length / 5 >= currentPage + 1 &&
            setCurrentPage(currentPage + 1)
          }
        >
          »
        </button>
      </div>

      <div className="divider my-2" />

      <div className="flex flex-col items-center">
        <button
          className={`btn btn-accent btn-block mb-1 bg-opacity-50 hover:bg-opacity-100 ${
            !surveyName || !currentQuestions[0] ? "btn-disabled" : ""
          }`}
          onClick={async () => {
            createSurvey.mutate({ name: surveyName });
          }}
        >
          Create Survey
        </button>

        <Link href="/" className="btn btn-ghost btn-sm mb-0 mt-2">
          Cancel
        </Link>
      </div>
    </Container>
  );
}
