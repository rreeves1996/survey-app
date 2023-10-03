import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { v4 } from "uuid";
import { api } from "~/utils/api";
import { Survey } from "@prisma/client";
import { BiSolidEdit } from "react-icons/bi";
import { useRouter } from "next/router";
import { FaStop } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import toast from "react-hot-toast";
import Loading from "~/components/Loading";

const notifyDelete = () => toast("Survey successfully deleted.");
const notifyCopy = () => toast("Link copied to clipboard.");
const notifyActive = () => toast("Survey is now active.");
const notifyInactive = () => toast("Survey is now inactive.");

export default function Page() {
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
      notifyDelete();
    },
  });

  const updateSurvey = api.survey.update.useMutation({
    onSuccess: () =>
      refetchSurveys().then((data) => {
        if (!data.data![0]!.active) notifyInactive();
        if (data.data![0]!.active) notifyActive();
      }),
  });

  const handleSurveyActivity = (survey: Survey) =>
    updateSurvey.mutate({
      id: survey.id,
      name: survey.name,
      active: survey.active ? false : true,
    });

  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800">
        <h1 className="text-center text-6xl font-extralight uppercase tracking-widest text-slate-100">
          Home
        </h1>

        <div className="divider" />

        <div className="flex flex-col">
          {surveys ? (
            surveys.map((survey) => (
              <div key={v4()} className="flex gap-1">
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
                    defaultChecked={
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
                    <Link
                      href={`/results/${survey.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      view results
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

                      notifyCopy();
                    }}
                    className="min-w-8 btn btn-square min-h-8  h-8 w-8 bg-opacity-50"
                  >
                    <AiOutlineLink />
                  </button>
                </div>

                <div className="tooltip tooltip-bottom" data-tip="edit survey">
                  <button
                    onClick={() => router.push(`/survey/edit/${survey.id}`)}
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
              <Loading />
            </div>
          )}
        </div>

        <Link
          href="/createsurvey"
          className="btn btn-accent btn-block mt-2 bg-opacity-50 hover:bg-accent"
        >
          Create New
        </Link>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
