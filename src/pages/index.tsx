import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import { Survey } from "@prisma/client";
import { BiSolidEdit } from "react-icons/bi";
import { useRouter } from "next/router";
import { FaStop, FaGithub } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";

export default function Home() {
  const { data: sessionData } = useSession();

  if (!sessionData?.user)
    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extralight tracking-tight text-white sm:text-[5rem]">
          survey
          <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
        </h1>

        <div className="divider mx-auto my-0 w-56" />

        <div className="flex flex-col items-center gap-2">
          <button
            className="btn btn-accent min-h-16 rounded-xl bg-opacity-40 px-10 text-lg hover:bg-opacity-100"
            onClick={() => void signIn()}
          >
            Sign in
          </button>

          <Link href="https://github.com/rreeves1996/survey-app">
            <button className="btn btn-ghost btn-sm mt-2">
              <FaGithub className="text-lg" /> View Repo »
            </button>
          </Link>
        </div>
      </div>
    );
  else return <Content />;
}

const Content: React.FC = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const [selectedSurvey, setSelectedSurvey] = useState<Survey>();

  const { data: surveys, refetch: refetchSurveys } = api.survey.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: () => null,
    }
  );

  const deleteSurvey = api.survey.delete.useMutation({
    onSuccess: () => {
      void refetchSurveys();
    },
  });

  const updateSurvey = api.survey.update.useMutation({
    onSuccess: () => {
      void refetchSurveys();
    },
  });

  const handleSurveyActivity = (survey: Survey) => {
    updateSurvey.mutate({
      id: survey.id,
      name: survey.name,
      active: survey.active ? false : true,
    });

    refetchSurveys();
  };

  if (sessionData)
    return (
      <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
        <div className="card-body rounded-md bg-slate-800">
          <h1 className="text-center text-6xl font-extralight uppercase tracking-widest text-slate-100">
            Home
          </h1>

          <div className="divider" />

          <div className="flex flex-col">
            {surveys ? (
              surveys.map((survey, index) => (
                <div className="flex gap-1">
                  <div
                    className={`collapse mb-2 rounded-md bg-base-200 py-0 transition-all hover:bg-opacity-100 ${
                      selectedSurvey && selectedSurvey.id === survey.id
                        ? "bg-opacity-75"
                        : "bg-opacity-50"
                    }`}
                    onClick={() => setSelectedSurvey(survey)}
                  >
                    <input
                      type="radio"
                      name="my-accordion-1"
                      className="min-h-8 cursor-pointer"
                      checked={
                        selectedSurvey && selectedSurvey.id === survey.id
                          ? true
                          : false
                      }
                    />
                    <div className="collapse-title min-h-6 flex  w-full items-center justify-between px-2 py-0 text-sm font-medium">
                      <span className="text-ellipsis">{survey.name}</span>
                      {survey.active ? (
                        <div className="font-sm badge badge-accent badge-outline h-5 text-xs">
                          active
                        </div>
                      ) : null}
                    </div>

                    <div className="collapse-content my-0 flex justify-between px-2">
                      <Link href={`/results/${survey.id}`}>
                        <button className="btn btn-ghost btn-xs">
                          view results
                        </button>
                      </Link>

                      <div className="flex">
                        <button
                          className="min-w-6 text-md btn btn-square btn-accent min-h-6  h-6 w-6 bg-opacity-50 "
                          disabled={survey && survey.active}
                          onClick={() => handleSurveyActivity(survey)}
                        >
                          <BsFillPlayFill />
                        </button>

                        <button
                          disabled={survey && !survey.active}
                          className={`min-w-6 btn btn-square btn-error min-h-6 ml-1 h-6 w-6 bg-opacity-50 text-xs text-slate-50`}
                          onClick={() => handleSurveyActivity(survey)}
                        >
                          <FaStop />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="tooltip tooltip-bottom" data-tip="copy link">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `https://survey-app-silk.vercel.app/survey/${survey.id}`
                        );
                      }}
                      className="min-w-8 btn btn-square min-h-8  h-8 w-8 bg-opacity-50"
                    >
                      <AiOutlineLink className="" />
                    </button>
                  </div>

                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="edit survey"
                  >
                    <button
                      onClick={() => router.push(`/survey/${survey.id}`)}
                      className="min-w-8 btn btn-square min-h-8 h-8 w-8 bg-opacity-50"
                    >
                      <BiSolidEdit />
                    </button>
                  </div>

                  <div
                    className="tooltip tooltip-bottom"
                    data-tip="delete survey"
                  >
                    <button
                      onClick={() => deleteSurvey.mutate({ id: survey.id })}
                      className="min-w-8 btn btn-square min-h-8 h-8 w-8 bg-opacity-50"
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
              ))
            ) : (
              <div className="flex w-full items-center justify-center">
                <span className="loading loading-spinner w-24" />
              </div>
            )}
          </div>

          <Link href="/createsurvey">
            <button className="btn btn-accent btn-block bg-opacity-50 hover:bg-accent">
              Create New
            </button>
          </Link>
        </div>
      </div>
    );
  else return <span className="loading loading-spinner w-24" />;
};
