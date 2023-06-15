"use client";

import { useContext } from "react";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import moonIcon from "../../../public/assets/images/icon-moon.svg";
import sunIcon from "../../../public/assets/images/icon-sun.svg";
import { MdPerson } from "react-icons/md";

import AddNote from "./AddNote";

import { AppContext, AppState } from "../context/AppContext";
import Link from "next/link";

const HeaderNav = () => {
  const { theme, updateTheme } = useContext(AppContext) as AppState;

  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleThemeChange = () => {
    if (theme === "light") {
      updateTheme("dark");
    } else {
      updateTheme("light");
    }
  };

  const themeIcon = theme === "light" ? sunIcon : moonIcon;

  const themeClass = theme === "light" ? "light" : "dark";

  return (
    <header
      className={`h-[200px] relative w-full px-6 bg-cover bg-center bg-no-repeat grid grid-rows-2 gap-[40px] justify-center items-center xl:h-[300px] mobile-${themeClass} xl:desktop-${themeClass}`}
    >
      <div className="relative flex items-center justify-between flex-row w-[325px] xl:w-[541px] top-[1rem]">
        <h1
          className="text-2xl tracking-[10px] text-veryLightGray font-normal xl:font-bold xl:text-[40px] xl:leading-[40px] cursor-pointer"
          onClick={() => router.push("/")}
        >
          TODO
        </h1>

        <div className="flex gap-3 items-center">
          <Link href="/profile">
            <MdPerson className="text-veryLightGrayishBlue text-3xl" />
          </Link>

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
    </header>
  );
};

export default HeaderNav;
