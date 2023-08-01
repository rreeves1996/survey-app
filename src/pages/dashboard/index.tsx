import { Survey } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";

export default function Dashboard() {
  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800">
        <Content />
      </div>
    </div>
  );
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

        <button className="btn btn-accent btn-outline btn-block">
          Create New
        </button>
      </>
    );
  } else {
  }
};
