import { Question, Survey } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import SurveyCompleted from "~/components/SurveyCompleted";
import Loading from "~/components/Loading";
import SurveyInactive from "~/components/SurveyInactive";
import Container from "~/components/Container";

type QuestionWithAnswer = Partial<Question> & { answer?: string };

export default function Page() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [questions, setQuestions] = useState<QuestionWithAnswer[]>([]);

  const { data: survey, refetch: refetchSurvey } = api.survey.getOne.useQuery(
    {
      id: router.query.id! as string,
    },
    {
      onSuccess: () => null,
    }
  );

  useEffect(() => {
    if (survey) {
      // If the survey was created by the user, redirect to the edit survey page

      if (survey.userId === sessionData?.user.id) {
        router.push(`/survey/edit/${survey.id}`);
      } else {
        setQuestions((prevState) => [...survey!.questions]);
      }
    }
  }, [survey]);

  const createAnswer = api.answer.create.useMutation({
    onSuccess: () => null,
  });

  const handleSubmitQuestions = () => {
    survey!.questions.map((question: QuestionWithAnswer) =>
      createAnswer.mutate({
        questionId: question.id as string,
        answer: question.answer as string,
      })
    );
  };

  if (questions && survey) {
    if (survey.active) {
      if (currentPage < survey.questions.length)
        return (
          <Container>
            <header>
              <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
                {survey.name}
              </h3>

              <h6 className="mb-0 text-sm font-extralight tracking-widest text-slate-200">
                Question <strong>{currentPage + 1}</strong> of{" "}
                <strong>{survey.questions.length}</strong>
              </h6>
            </header>

            <div className="divider my-0" />

            <p>{survey.questions[currentPage]?.questionBody}</p>

            <div className="flex w-full justify-evenly">
              {survey.questions[currentPage]?.questionType === "T/F" ? (
                <>
                  <label className="label flex cursor-pointer flex-col items-center">
                    <input
                      type="checkbox"
                      value="true"
                      checked={
                        questions[currentPage]?.answer === "true" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      True
                    </span>
                  </label>

                  <label className="label flex cursor-pointer flex-col items-center">
                    <input
                      type="checkbox"
                      value="false"
                      checked={
                        questions[currentPage]?.answer === "false"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      False
                    </span>
                  </label>
                </>
              ) : (
                <>
                  <label className="label flex cursor-pointer flex-col items-center justify-start">
                    <input
                      type="checkbox"
                      value="1"
                      checked={
                        questions[currentPage]?.answer === "1" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      1
                    </span>

                    <span className="label-text absolute translate-y-10 text-xs font-bold uppercase">
                      (Never)
                    </span>
                  </label>

                  <label className="label flex cursor-pointer flex-col items-center justify-start">
                    <input
                      type="checkbox"
                      value="2"
                      checked={
                        questions[currentPage]?.answer === "2" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      2
                    </span>
                  </label>

                  <label className="label flex cursor-pointer flex-col items-center justify-start">
                    <input
                      type="checkbox"
                      value="3"
                      checked={
                        questions[currentPage]?.answer === "3" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      3
                    </span>
                  </label>

                  <label className="label flex cursor-pointer flex-col items-center  justify-start">
                    <input
                      type="checkbox"
                      value="4"
                      checked={
                        questions[currentPage]?.answer === "4" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      4
                    </span>
                  </label>

                  <label className="label flex cursor-pointer flex-col items-center justify-start">
                    <input
                      type="checkbox"
                      value="5"
                      checked={
                        questions[currentPage]?.answer === "5" ? true : false
                      }
                      onChange={(e) => {
                        const newQuestions = [...questions];

                        newQuestions[currentPage]!.answer = e.target.value;
                        setQuestions((prevState) => newQuestions);
                      }}
                      className="checkbox checkbox-xs mb-1"
                    />

                    <span className="label-text text-xs font-bold uppercase">
                      5
                    </span>

                    <span className="label-text absolute translate-y-10 text-xs font-bold uppercase">
                      (Always)
                    </span>
                  </label>
                </>
              )}
            </div>

            <div className="mt-2 flex w-full justify-around p-4">
              <button
                className="btn btn-md bg-opacity-50 pl-5 pr-6 text-base"
                onClick={() =>
                  currentPage !== 0 ? setCurrentPage(currentPage - 1) : null
                }
              >
                « Prev
              </button>
              {currentPage === survey.questions.length - 1 ? (
                <button
                  className="pr- btn btn-accent  btn-md bg-opacity-50 pl-6 pr-5 text-base"
                  disabled={
                    questions[currentPage] && questions[currentPage]!.answer
                      ? false
                      : true
                  }
                  onClick={() => {
                    handleSubmitQuestions();
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  Finish »
                </button>
              ) : (
                <button
                  className="pr- btn btn-accent  btn-md bg-opacity-50 pl-6 pr-5 text-base"
                  disabled={questions[currentPage]?.answer ? false : true}
                  onClick={() =>
                    currentPage! < survey.questions.length - 1 &&
                    setCurrentPage(currentPage + 1)
                  }
                >
                  Next »
                </button>
              )}
            </div>
          </Container>
        );
      else if (currentPage === survey.questions.length)
        return <SurveyCompleted surveyId={survey && survey.id} />;
    } else return <SurveyInactive />;
  } else return <Loading />;
}
