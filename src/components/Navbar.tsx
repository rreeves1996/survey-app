import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  return (
    <div className="navbar bg-slate-800">
      <button className="flex-1 px-2" onClick={() => router.push("/")}>
        <h6 className="  text-3xl font-extralight tracking-tight text-white">
          survey
          <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
        </h6>
      </button>

      <div className="tooltip tooltip-left flex-none gap-2" data-tip="sign out">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="avatar btn btn-circle btn-ghost"
            onClick={() => void signOut()}
          >
            <div className="w-10 rounded-full">
              <img
                src={sessionData?.user?.image ?? ""}
                alt={sessionData?.user?.name ?? ""}
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
