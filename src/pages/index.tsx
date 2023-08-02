import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "~/utils/api";
import { Survey } from "@prisma/client";

export default function Home() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  if (!sessionData?.user) {
    return (
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extralight tracking-tight text-white sm:text-[5rem]">
          survey
          <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={() => void signIn()}
          >
            Sign in
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
        <div className="card-body rounded-md bg-slate-800">
          <Content />
        </div>
      </div>
    );
  }
}

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);

  const { data: surveys, refetch: refetchSurveys } = api.survey.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => setSelectedSurvey(selectedSurvey ?? data[0] ?? null),
    }
  );

  const createSurvey = api.survey.create.useMutation({
    onSuccess: () => {
      void refetchSurveys();
    },
  });

  const deleteSurvey = api.survey.delete.useMutation({
    onSuccess: () => {
      void refetchSurveys();
    },
  });

  if (!selectedSurvey) {
    return (
      <>
        <h1 className="text-center text-4xl font-extralight tracking-wider text-slate-100">
          Your Surveys
        </h1>

        <div className="divider" />

        <div>
          {surveys?.map((survey) => (
            <button>{survey.name}</button>
          ))}
        </div>

        <Link href="/createsurvey">
          <button className="btn btn-accent btn-outline btn-block">
            Create New
          </button>
        </Link>
      </>
    );
  } else {
  }
};
