import { Survey } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import { api } from "~/utils/api";

export default function index() {
  const { data: sessionData } = useSession();
  const [survey, setSurvey] = useState<Survey | null>(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("survey")) return null;
      return JSON.parse(localStorage.getItem("survey")!);
    }
  });
  const [question, setQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>([]);

  if (survey) {
    const { data: questions, refetch: refetchSurveys } =
      api.survey.getOne.useQuery(
        { surveyId: survey.id },
        {
          enabled: sessionData?.user !== undefined,
          onSuccess: (data) => console.log(data),
        }
      );
  }

  return <div>index</div>;
}
