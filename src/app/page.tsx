// "use client";

// import React, { useEffect } from "react";
// import HeaderNav from "./components/HeaderNav";
// import NoteListContainer from "./components/NoteListContainer";
// import Footer from "./components/Footer";

// import { useAuthContext } from "./context/AuthContext";
// import { useRouter } from "next/navigation";

// const Home = () => {
//   const { user } = useAuthContext();
//   const router = useRouter();

//   useEffect(() => {
//     if (user == null) {
//       // console.log("user is null");
//       router.push("/signin");
//     }
//   }, [user, router]);

//   if (user == null) {
//     return null;
//   }

//   return (
//     <>
//       <HeaderNav />
//       <NoteListContainer />
//       <Footer />
//     </>
//   );
// };

// export default Home;

import React from "react";
import Home from "./components/Home";

const page = () => {
  return (
    <>
      <Home />
    </>
  );
};

export default page;
