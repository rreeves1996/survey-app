import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="navbar">
      <h6 className=" flex-1 px-2 text-3xl font-extralight tracking-tight text-white">
        survey
        <span className="font-medium  text-[hsl(214,100%,79%)]">Friend</span>
      </h6>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          {sessionData?.user ? (
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
          ) : (
            <button
              className="btn btn-ghost rounded-btn"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
