"use client";

import React, { useContext, useState, useEffect } from "react";
import { AppContext, AppState } from "../context/AppContext";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { auth, db } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

import HeaderNav from "./HeaderNav";
import Spinner from "./Spinner";

const Profile = () => {
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    fullName: auth.currentUser?.displayName || "",
    email: auth.currentUser?.email || "",
  });

  const { fullName, email } = formData;

  const { theme } = useContext(AppContext) as AppState;

  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      toast.error("Sign in please!", {
        hideProgressBar: true,
      });
      router.push("/signin");
    }
  }, [user, router]);

  const onProfileDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onLogout = () => {
    setLoading(true);
    auth.signOut();

    router.push("/signin");
    toast.success("Successfully logged out", {
      hideProgressBar: true,
    });
    console.log("successfully logged out");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser && auth.currentUser?.displayName !== fullName) {
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });

        const userRef = doc(db, "users", auth.currentUser?.uid);

        await updateDoc(userRef, {
          fullName,
        });
      }
    } catch (error) {
      toast.success("Oops something went wrong! That's on us.", {
        hideProgressBar: true,
      });
    }
    toast.success("Successfully updated profile", {
      hideProgressBar: true,
    });
  };

  if (user == null) {
    return null;
  }

  return (
    <>
      <HeaderNav />

      <section className="grid grid-rows-2 items-center mx-auto relative top-[-3rem] xl:top-[-4rem] w-[327px] xl:w-[540px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">My Profile</h2>

          <button
            type="button"
            className=" text-veryLightGrayishBlue bg-brightBlue hover:scale-95 font-normal rounded-lg text-lg px-5 py-2.5 text-center"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>

        <div className="profile-details flex flex-col relative top-[-4rem]">
          <button
            className="text-veryLightGrayishBlue bg-veryDarkGrayishBlueA text-lg font-normal hover:scale-95 rounded-lg px-5 py-2.5 text-center w-[11rem]"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Submit Changes" : "Edit Profile"}
          </button>

          <div className="profileCard mt-3">
            <form>
              <input
                type="text"
                id="fullName"
                className={`w-full px-4 min-h-[53px] xl:min-h-[64px] drop-shadow-lg rounded-[5px] text-[20px] ${
                  theme === "light"
                    ? "bg-veryLightGray text-darkerGrayishBlueB"
                    : "bg-veryDarkDesaturatedBlue text-veryLightGray"
                }`}
                disabled={!changeDetails}
                value={fullName}
                onChange={onProfileDetailsChange}
              />

              <input
                type="text"
                id="email"
                className={`w-full px-4 min-h-[53px] xl:min-h-[64px] drop-shadow-lg rounded-[5px] text-[20px] mt-3 ${
                  theme === "light"
                    ? "bg-veryLightGray text-darkerGrayishBlueB"
                    : "bg-veryDarkDesaturatedBlue text-veryLightGray"
                }`}
                disabled={true}
                value={email}
              />
            </form>
          </div>
        </div>

        {loading && <Spinner />}
      </section>

      <ToastContainer />
    </>
  );
};

export default Profile;
