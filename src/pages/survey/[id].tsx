import { Question, Survey } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QuestionForm from "~/components/QuestionForm";
import { api } from "~/utils/api";
import { v4 } from "uuid";
import { BsFillPlayFill } from "react-icons/bs";
import { FaStop } from "react-icons/fa";

export default function Page() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const { data: survey, refetch: refetchSurvey } = api.survey.getOne.useQuery(
    {
      surveyId: router.query.id! as string,
    },
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: () => null,
    }
  );

  if (survey?.userId === sessionData?.user.id)
    return <AdminPanel survey={survey!} />;
  else return <p>Survey: {router.query.id}</p>;
}

type AdminPanelProps = { survey: Partial<Survey> & { questions: Question[] } };

function AdminPanel({ survey }: AdminPanelProps) {
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [surveyName, setSurveyName] = useState<string>(
    survey ? survey.name! : ""
  );
  const [isActive, setIsActive] = useState<boolean>(
    survey ? survey.active! : true
  );
  const [showQuestionForm, setShowQuestionForm] = useState<boolean>(false);
  const [oldQuestions, setOldQuestions] = useState<Question[]>(
    () => survey && [...survey.questions]
  );
  const [newQuestions, setNewQuestions] = useState<FormQuestion[]>([]);
  const [allQuestions, setAllQuestions] = useState<
    Array<Question | FormQuestion>
  >([]);

  const { refetch: refetchSurveys } = api.survey.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
    onSuccess: (data) => null,
  });

  const createQuestion = api.question.create.useMutation({
    onSuccess: () => {},
  });

  const updateQuestion = api.question.update.useMutation({
    onSuccess: (data) => {
      console.log(`Update: ${data}`);
    },
  });

  const updateSurvey = api.survey.update.useMutation({
    onSuccess: (data) => {
      // Create new questions
      newQuestions.map((question) =>
        createQuestion.mutate({
          surveyId: data.id,
          questionType: question.questionType,
          questionBody: question.questionBody,
        })
      );

      // Update old questions
      oldQuestions.map((question) =>
        updateQuestion.mutate({
          surveyId: data.id,
          questionType: question.questionType,
          questionBody: question.questionBody,
          questionId: question.id,
        })
      );

      refetchSurveys();
    },
  });

  const handleRemoveQuestion = (question: FormQuestion | Question) => {
    if (question.hasOwnProperty("id")) {
      const filteredQuestions = oldQuestions.filter(
        (item) => item !== question
      );

      setOldQuestions(filteredQuestions);
    } else {
      const filteredQuestions = newQuestions.filter(
        (item) => item !== question
      );

      setNewQuestions(filteredQuestions);
    }
  };

  useEffect(() => {
    if (oldQuestions && newQuestions) {
      setAllQuestions((prevState) => [...oldQuestions, ...newQuestions]);
    } else if (newQuestions && !oldQuestions) {
      setAllQuestions((prevState) => [...newQuestions]);
    } else if (!newQuestions && oldQuestions) {
      setAllQuestions((prevState) => [...oldQuestions]);
    } else {
      setAllQuestions((prevState) => []);
    }
  }, [oldQuestions, newQuestions]);

  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <h1 className="text-center text-6xl font-extralight uppercase tracking-widest text-slate-100">
          Edit
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
          <strong>TRUE/FALSE</strong> questions allow the user to answer with
          either true or false.
        </p>
        <p className="mb-1 text-sm">
          <strong>FREQUENCY</strong> questions allow the user to respond with
          their frequency (1-5), with 1 being "never" and 5 being "always."
        </p>

        <div className="mb-5 flex items-center justify-between">
          <div>
            <p>
              Survey is currently{" "}
              <span
                className={`font-medium ${
                  survey && survey.active ? "text-accent" : "text-red-800"
                }`}
              >
                {survey && survey.active ? "active" : "inactive"}
              </span>
            </p>

            <p className="ml-2 text-xs">
              - active until <strong>date</strong>
            </p>
          </div>

          <div className=" flex justify-around">
            <div
              className={`${
                survey && !survey.active ? "tooltip tooltip-bottom" : ""
              }`}
              data-tip="start survey"
            >
              <button
                className="min-w-8 btn btn-square btn-accent min-h-8  h-8 w-8 bg-opacity-50"
                disabled={survey && survey.active}
                onClick={() => setIsActive(true)}
              >
                <BsFillPlayFill />
              </button>
            </div>

            <div
              className={`${
                survey && survey.active ? "tooltip tooltip-bottom" : ""
              }`}
              data-tip="stop survey"
            >
              <button
                disabled={survey && !survey.active}
                className={`min-w-8 btn btn-square btn-error min-h-8 ml-2 h-8 w-8 bg-opacity-50 text-slate-50`}
                onClick={() => setIsActive(true)}
              >
                <FaStop />
              </button>
            </div>
          </div>
        </div>

        {allQuestions &&
          allQuestions
            .slice(currentPage * 5, 5 + currentPage * 5)
            .map((question) => (
              <div className="flex" key={v4()}>
                <div className="collapse-arrow collapse rounded-md bg-base-200 bg-opacity-50 transition-all hover:bg-opacity-100">
                  <input type="checkbox" className="min-h-8" />
                  <div className="collapse-title min-h-8 flex w-full justify-between pb-0 pl-3 pt-1 text-sm font-medium">
                    <p>
                      Question{" "}
                      {allQuestions &&
                        allQuestions.indexOf(question as Question) + 1}
                    </p>
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
          currentQuestions={newQuestions}
          setCurrentQuestions={setNewQuestions}
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
            currentPage && oldQuestions.length + newQuestions.length <= 4
              ? "hidden"
              : ""
          }`}
        >
          <button
            className="btn join-item min-h-6 h-8"
            onClick={() => currentPage !== 0 && setCurrentPage(currentPage - 1)}
          >
            «
          </button>
          <button className="btn join-item  min-h-6 h-8">
            Page {currentPage + 1}
          </button>
          <button
            className="btn join-item  min-h-6 h-8"
            onClick={() =>
              oldQuestions.length + newQuestions.length / 5 >=
                currentPage + 1 && setCurrentPage(currentPage + 1)
            }
          >
            »
          </button>
        </div>

        <div className="divider my-2" />

        <div className="flex flex-col items-center">
          <button
            className={`btn btn-accent btn-outline btn-block mb-1 ${
              !surveyName ? "btn-disabled" : ""
            }`}
            onClick={() => {
              survey &&
                updateSurvey.mutate({
                  name: surveyName,
                  surveyId: survey.id as string,
                  active: isActive,
                });
              router.push("/");
            }}
          >
            Submit Edit
          </button>

          <Link href="/">
            <button className="btn btn-ghost btn-sm mb-0 mt-2">Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
