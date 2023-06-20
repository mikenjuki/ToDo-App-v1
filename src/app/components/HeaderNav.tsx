"use client";

import { useContext, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import moonIcon from "../../../public/assets/images/icon-moon.svg";
import sunIcon from "../../../public/assets/images/icon-sun.svg";
import { MdPerson } from "react-icons/md";
import Spinner from "./Spinner";

import AddNote from "./AddNote";

import { AppContext, AppState } from "../context/AppContext";

const HeaderNav = () => {
  const { theme, updateTheme } = useContext(AppContext) as AppState;
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isProfilePage = pathname === "/profile";

  const handleThemeChange = () => {
    if (theme === "light") {
      updateTheme("dark");
    } else {
      updateTheme("light");
    }
  };

  const themeIcon = theme === "light" ? sunIcon : moonIcon;

  const themeClass = theme === "light" ? "light" : "dark";

  const handleProfileLinkClick = () => {
    setLoading(true);
    router.push("/profile");
  };

  const handleHomeLinkClick = () => {
    setLoading(true);
    router.push("/");
  };

  return (
    <header
      className={` h-[200px] relative w-full px-6 bg-cover bg-center bg-no-repeat grid grid-rows-2 gap-[40px] justify-center items-center  mobile-${themeClass} xl:desktop-${themeClass} ${
        isProfilePage ? "xl:h-[220px]" : "xl:h-[300px]"
      }`}
    >
      <div className="relative flex items-center justify-between flex-row w-[325px] xl:w-[541px] top-[1rem]">
        <h1
          className="text-2xl tracking-[10px] text-veryLightGray font-normal xl:font-bold xl:text-[40px] xl:leading-[40px] cursor-pointer"
          onClick={handleHomeLinkClick}
        >
          TODO
        </h1>

        <div className="flex gap-3 items-center">
          <button onClick={handleProfileLinkClick}>
            <MdPerson className="text-veryLightGrayishBlue text-3xl" />
          </button>

          <div
            className="toggle-logo cursor-pointer"
            onClick={handleThemeChange}
          >
            <Image
              src={themeIcon}
              alt="toggle icon"
              width="20"
              height="20"
              className="xl:w-[26px] xl:h-[26px]"
            />
          </div>
        </div>
      </div>

      {isHomePage && <AddNote />}
      {loading && <Spinner />}
    </header>
  );
};

export default HeaderNav;
