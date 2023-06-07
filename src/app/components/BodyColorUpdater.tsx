"use client";

import { useEffect, useContext } from "react";
import { AppContext, AppState } from "../context/AppContext";

const BodyColorUpdater = () => {
  const { theme } = useContext(AppContext) as AppState;

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (theme === "light") {
        body.classList.remove(
          "bg-veryDarkDesaturatedBlue",
          "text-veryLightGray"
        );
        body.classList.add("bg-veryLightGray", "text-darkerGrayishBlueB");
      } else {
        body.classList.remove("bg-veryLightGray", "text-darkerGrayishBlueB");
        body.classList.add("bg-veryDarkDesaturatedBlue", "text-veryLightGray");
      }
    }
  }, [theme]);

  return null;
};

export default BodyColorUpdater;
