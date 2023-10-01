import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Page() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: survey } = api.survey.getOne.useQuery(
    {
      id: router.query.id! as string,
    },
    {
      onSuccess: (data) => console.log(data),
    }
  );

  const handleFormatPercentage = (num: number) => {
    const numAsPct = num * 100;

    if (numAsPct > 50) {
      if (Math.ceil(numAsPct) !== 100) return Math.ceil(numAsPct);
      else return Math.floor(numAsPct);
    } else {
      if (Math.floor(numAsPct) !== 100) return Math.floor(numAsPct);
      else return Math.ceil(numAsPct);
    }
  };

  if (survey) {
    return (
      <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
        <div className="card-body rounded-md bg-slate-800 pb-4">
          <header>
            <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
              Results
            </h3>
          </header>

          <div className="divider my-0" />

          {survey.questions[0] ? (
            <>
              <p className="my-2 text-center">
                Here are the results for <strong>{survey.name}</strong>:
              </p>
              {survey.questions[0].answers[0] ? (
                <>
                  <div>
                    {survey.questions
                      .slice(currentPage * 4, 4 + currentPage * 4)
                      .map((question) => (
                        <div className="flex w-full flex-col">
                          <p>
                            <strong>Question:</strong>
                          </p>

                          <p className="mb-1 pl-4">{question.questionBody}</p>
                          {question.questionType === "T/F" ? (
                            <div className="mb-4 flex justify-around">
                              <div className="flex">
                                <p className="mr-1 font-medium uppercase">
                                  T:{" "}
                                </p>

                                <p className="">
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "true"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>
                              <div className="flex">
                                <p className="mr-1 font-medium uppercase">
                                  F:{" "}
                                </p>

                                <p>
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "false"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-2 flex justify-around">
                              <div className="flex flex-col text-center">
                                <p className="font-medium">1: </p>

                                <p className="">
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "1"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="flex flex-col text-center">
                                <p className="font-medium">2: </p>

                                <p>
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "2"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="flex flex-col text-center">
                                <p className="font-medium">3: </p>

                                <p>
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "3"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="flex flex-col text-center">
                                <p className="font-medium">4: </p>

                                <p>
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "4"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>

                              <div className="flex flex-col text-center">
                                <p className="font-medium">5: </p>

                                <p>
                                  {handleFormatPercentage(
                                    question.answers.filter(
                                      (answer) => answer.answer === "5"
                                    ).length / question.answers.length
                                  )}
                                  %
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  <div
                    className={`join mt-2 w-full justify-center ${
                      survey.questions.length <= 4 ? "hidden" : ""
                    }`}
                  >
                    <button
                      className="btn join-item min-h-6 h-8"
                      onClick={() =>
                        currentPage !== 0
                          ? setCurrentPage(currentPage - 1)
                          : null
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
                        survey.questions.length / 5 >= currentPage + 1 &&
                        setCurrentPage(currentPage + 1)
                      }
                    >
                      »
                    </button>
                  </div>

                  <div className="divider" />
                </>
              ) : (
                <div className="flex flex-col">
                  <p className="mb-4 text-center">
                    No answers currently recorded!
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col">
              <p className="text-center">
                <strong>Your survey has no quesions!</strong>
              </p>
              <p className="mb-2 text-center">
                Try adding questions by editing the survey on your dashboard.
              </p>
            </div>
          )}

          <Link href="/">
            <button
              className={`btn btn-accent btn-block mb-2 bg-opacity-50 hover:bg-opacity-100`}
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    );
  } else return <span className="loading loading-spinner w-24" />;
}
