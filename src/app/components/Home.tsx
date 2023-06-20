"use client";

import React, { useEffect } from "react";
import HeaderNav from "./HeaderNav";
import NoteListContainer from "./NoteListContainer";
import Footer from "./Footer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";

const Home = () => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      // toast.success("Sign in please!", {
      //   hideProgressBar: true,
      // });
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

      <ToastContainer />
    </>
  );
};

export default Home;
