"use client";

import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "next/navigation";
import { useState } from "react";

import OAuth from "./OAuth";
import Link from "next/link";

const SignIn = () => {
  // email = xaxaba3570@akoption.com
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handlelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const router = useRouter();

  const handleSignInForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-veryDarkDesaturatedBlue h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="flex items-center mb-6 text-2xl font-semibold text-veryLightGrayishBlue">
          TODO
        </p>

        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-veryLightGrayishBlue md:text-2xl">
              Welcome Back, Sign In
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSignInForm}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-normal text-veryLightGrayishBlue"
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  className="bg-veryDarkGrayishBlueA text-veryLightGray text-lg rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={handlelInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-normal text-veryLightGrayishBlue"
                >
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  id="password"
                  placeholder="Create a strong password"
                  className="bg-veryDarkGrayishBlueA border border-gray-300 text-veryLightGray text-lg rounded-lg block w-full p-2.5 "
                  required
                  onChange={handlelInputChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-veryLightGrayishBlue"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="/forgotpassword"
                  className="text-veryLightGrayishBlue text-sm font-normal hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-veryLightGrayishBlue bg-brightBlue hover:scale-95 font-normal rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <div className="oAuth-div">
                <OAuth />
              </div>

              <p className="text-lg font-light text-veryLightGrayishBlue">
                Don&lsquo;t have an account yet? {""}
                <Link
                  href="/signup"
                  className="text-lg font-normal text-brightBlue hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
