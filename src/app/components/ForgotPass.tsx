"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      router.push("/signin");
      console.log("email sent");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-veryDarkDesaturatedBlue h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <p className="flex items-center mb-6 text-2xl font-semibold text-veryLightGrayishBlue">
          Password Reset
        </p>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-veryLightGrayishBlue md:text-2xl">
              Enter Email to get a password reset link
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
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
                  placeholder="name@email.com"
                  required
                  onChange={onEmailChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-veryLightGrayishBlue bg-brightBlue hover:scale-95 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Send Reset Link
              </button>
              <p className="text-lg font-light text-veryLightGrayishBlue">
                Remember your password? {""}
                <Link
                  href="/signin"
                  className="text-lg font-normal text-brightBlue hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
