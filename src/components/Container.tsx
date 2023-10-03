import React, { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="card mt-2 h-fit w-full max-w-[500px] shadow-xl lg:w-[500px]">
      <div className="card-body rounded-md bg-slate-800">{children}</div>
    </div>
  );
}
