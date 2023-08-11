import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

type RegistrationForm = {
  email: string;
  password: string;
};

export default function Register() {
  const router = useRouter();
  const [formState, setFormState] = useState<RegistrationForm>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (formState) {
      const { name, value } = e.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const registerUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: formState?.email,
          password: formState?.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error(err);
    }

    console.log("Registration succeeded!");
  };
  return (
    <div className="card mt-2 h-fit w-full shadow-xl lg:w-96">
      <div className="card-body rounded-md bg-slate-800 pb-4">
        <header>
          <h3 className="mb-4 text-center text-4xl font-extralight uppercase tracking-widest text-slate-100">
            Sign In
          </h3>
        </header>

        <div className="divider my-0" />

        <form onSubmit={registerUser}>
          <p className="my-1 px-4 text-center">
            Enter account info below to sign in:
          </p>

          <div className="mb-2 flex flex-col">
            <label className="my-2" htmlFor="email">
              <strong>Email:</strong>
            </label>

            <input
              type="email"
              name="email"
              required={true}
              className="input input-bordered input-sm h-7 w-full pl-2"
              placeholder="jsmith@msn.com"
              value={formState?.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label className="my-2" htmlFor="password">
              <strong>Password:</strong>
            </label>

            <input
              type="password"
              name="password"
              required={true}
              placeholder="password"
              className="input input-bordered input-sm h-7 w-full pl-2"
              value={formState?.password}
              onChange={handleChange}
            />
          </div>

          <div className="divider" />

          <button className="btn btn-accent btn-block mb-2 bg-opacity-50 hover:bg-opacity-100">
            login
          </button>
        </form>
      </div>
    </div>
  );
}
