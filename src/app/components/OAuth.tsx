import React from "react";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

import googleIcon from "../../../public/assets/images/googleIcon.svg";

const OAuth = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onGoogleAuthClick = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      const userRef = doc(db, "users", user.uid);

      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          fullName: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      router.push("/");
    } catch (err) {
      console.log(err);
      router.push("/signup");
    }
  };

  return (
    <div className="grid grid-rows-2 items-center justify-center">
      <p className=" text-lightGrayishBlueHover">
        Sign {pathname === "/signin" ? "In" : "Up"} with:
      </p>

      <button className="w-8 h-8" onClick={onGoogleAuthClick}>
        <Image src={googleIcon} alt="google icon" className="relative left-6" />
      </button>
    </div>
  );
};

export default OAuth;
