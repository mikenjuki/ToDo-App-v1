"use client";

import React from "react";

import { useContext, useState } from "react";
import { AppContext, AppState } from "../context/AppContext";

import HeaderNav from "./HeaderNav";

const Profile = () => {
  const [changeDetails, setChangeDetails] = useState(false);

  const { theme } = useContext(AppContext) as AppState;

  const onProfileDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <HeaderNav />

      <section className="grid grid-rows-2 items-center mx-auto relative top-[1rem] w-[327px] xl:w-[540px]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">My Profile</h2>

          <button
            type="submit"
            className=" text-veryLightGrayishBlue bg-brightBlue hover:scale-95 font-normal rounded-lg text-lg px-5 py-2.5 text-center"
          >
            Logout
          </button>
        </div>

        <div className="profile-details flex flex-col">
          <button
            className="text-veryLightGrayishBlue bg-veryDarkGrayishBlueA text-lg font-normal hover:scale-95 rounded-lg px-5 py-2.5 text-center w-[11rem]"
            onClick={() => {
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Submit Changes" : "Edit Profile"}
          </button>

          <div className="profileCard mt-3">
            <form>
              <input
                type="text"
                id="name"
                className={`w-full px-4 min-h-[53px] xl:min-h-[64px] drop-shadow-lg rounded-[5px] text-[20px] ${
                  theme === "light"
                    ? "bg-veryLightGray text-darkerGrayishBlueB"
                    : "bg-veryDarkDesaturatedBlue text-veryLightGray"
                }`}
                disabled={!changeDetails}
                placeholder="Alexei Ward"
                // value={name}
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
                disabled={!changeDetails}
                placeholder="email"
                // value={email}
                onChange={onProfileDetailsChange}
              />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
