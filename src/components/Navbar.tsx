import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

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

      <div>
        <ul className="flex items-center gap-3">
          <Link href="/">
            <li className="btn btn-ghost btn-sm">Home</li>
          </Link>
          <Link href="/about">
            <li className="btn btn-ghost btn-sm">About</li>
          </Link>

          {sessionData ? (
            <div
              className="tooltip tooltip-left flex-none gap-2"
              data-tip="sign out"
            >
              <div className="dropdown-end dropdown">
                <label
                  tabIndex={0}
                  className="avatar btn btn-circle btn-ghost"
                  onClick={() => void signOut()}
                >
                  {sessionData?.user?.image ? (
                    <div className="w-10 rounded-full">
                      <img
                        src={sessionData?.user?.image ?? ""}
                        alt={sessionData?.user?.name ?? ""}
                      />
                    </div>
                  ) : (
                    sessionData?.user?.name
                  )}
                </label>
              </div>
            </div>
          ) : (
            <>
              <div className="dropdown-end dropdown-bottom dropdown">
                <label tabIndex={0} className="avatar btn btn-circle btn-ghost">
                  <FaUserCircle className="text-4xl" />

                  <ul className="slate-600 menu dropdown-content z-[1] bg-slate-800 outline">
                    <Link href="/register">
                      <li>Register</li>
                    </Link>

                    <li onClick={() => void signIn()}>Login</li>
                  </ul>
                </label>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
