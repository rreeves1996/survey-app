import { Survey } from "@prisma/client";
import React, { useState } from "react";

export default function index({ survey }: Survey) {
  const [question, setQuestion] = useState<number>(0);
  const [answer, setAnswer] = useState<string[]>([]);

  return <div>index</div>;
}
