import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

import googleIcon from "../../../public/assets/images/googleIcon.svg";

const OAuth = () => {
  const pathname = usePathname();

  const onGoogleAuthClick = () => {};

  return (
    <div className="grid grid-rows-2 items-center justify-center">
      <p className=" text-lightGrayishBlueHover">
        Sign {pathname === "/signin" ? "In" : "Up"} with
      </p>

      <button className="w-8 h-8" onClick={onGoogleAuthClick}>
        <Image src={googleIcon} alt="google icon" className="relative left-6" />
      </button>
    </div>
  );
};

export default OAuth;
