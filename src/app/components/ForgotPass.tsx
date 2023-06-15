"use client";

import React from "react";
import Link from "next/link";

const ForgotPass = () => {
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
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-normal text-veryLightGrayishBlue"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-veryDarkGrayishBlueA text-veryLightGray text-lg rounded-lg block w-full p-2.5"
                  placeholder="name@company.com"
                  required
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
