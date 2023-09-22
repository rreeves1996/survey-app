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
        <p className="  text-3xl font-extralight tracking-tight text-white">
          survey
          <span className="font-medium  text-[#94c2ff]">Friend</span>
        </p>
      </button>

      <div>
        <ul className="flex items-center gap-1">
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
              <div className="dropdown dropdown-end">
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
              <details className="dropdown dropdown-end dropdown-bottom mx-1">
                <summary className="avatar btn btn-circle btn-ghost">
                  <FaUserCircle className="text-4xl" />
                </summary>

                <ul className="slate-600 menu dropdown-content z-[1] translate-y-2 rounded-sm bg-slate-800 outline outline-1 outline-slate-600">
                  {/* <Link href="/register">
                    <li className="btn btn-ghost btn-sm rounded-sm px-2">
                      Register
                    </li>
                  </Link> */}

                  <li
                    className="btn btn-ghost btn-sm rounded-sm px-2"
                    onClick={() => router.push("/auth/login")}
                  >
                    Login
                  </li>
                </ul>
              </details>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
