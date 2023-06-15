"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OAuth from "./OAuth";

import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase/config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = formData;

  const handlelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const router = useRouter();

  const onFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;

      updateProfile(auth.currentUser, { displayName: fullName });

      const formDataCopy = { ...formData };

      delete formDataCopy.password;

      formDataCopy.createdAt = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      router.push("/");
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
              Sign Up
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onFormSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-normal text-veryLightGrayishBlue"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  id="fullName"
                  className="bg-veryDarkGrayishBlueA text-veryLightGray text-lg rounded-lg block w-full p-2.5"
                  placeholder="John Doe"
                  required
                  onChange={handlelInputChange}
                />
              </div>

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
                  className="block mb-2 text-sm font-mormal text-veryLightGrayishBlue"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  className="bg-veryDarkGrayishBlueA text-veryLightGray text-lg rounded-lg block w-full p-2.5"
                  required
                  onChange={handlelInputChange}
                />
              </div>
              <button
                type="submit"
                className="w-full text-veryLightGrayishBlue bg-brightBlue hover:scale-95 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <div className="oAuth-div">
                <OAuth />
              </div>

              <p className="text-lg font-light text-veryLightGrayishBlue">
                Have an account? {""}
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

export default SignUp;
