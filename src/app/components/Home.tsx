"use client";

import React, { useEffect } from "react";
import HeaderNav from "./HeaderNav";
import NoteListContainer from "./NoteListContainer";
import Footer from "./Footer";

import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      // console.log("user is null");
      router.push("/signin");
    }
  }, [user, router]);

  if (user == null) {
    return null;
  }

  return (
    <>
      <HeaderNav />
      <NoteListContainer />
      <Footer />
    </>
  );
};

export default Home;
