"use client";

import { AppContext, AppState } from "../context/AppContext";
import { useContext } from "react";

import SortNotes from "./SortNotes";

const Footer = () => {
  const { theme } = useContext(AppContext) as AppState;
  return (
    <>
      <footer
        className={`flex flex-col items-center relative gap-7 xl:gap-4 xl:mt-0 xl:top-[1rem]`}
      >
        <div className="relative block xl:hidden z-10 drop-shadow-lg w-[327px] rounded-[5px]">
          <SortNotes />
        </div>

        <p
          className={`font-normal text-sm leading-[14px] tracking-[0.194px]
         ${
           theme === "light"
             ? "text-darkGrayishBlue"
             : "text-veryDarkGrayishBlueA"
         }
         `}
        >
          Drag and drop to reorder list
        </p>
        <div
          className={`text-[12px]  ${
            theme === "light"
              ? "text-darkGrayishBlue"
              : "text-veryDarkGrayishBlueA"
          }`}
        >
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Michael Njuki</a>.
        </div>
      </footer>
    </>
  );
};

export default Footer;
