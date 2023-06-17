"use client";

import { useContext, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

import { AppContext, AppState } from "../context/AppContext";

const AddNote = () => {
  const [note, setNote] = useState("");
  const { theme } = useContext(AppContext) as AppState;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
      } else {
        console.log("User is signed out");
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (note.trim() !== "") {
      try {
        const user = auth.currentUser;
        if (user) {
          const docRef = await addDoc(collection(db, "notes"), {
            userRef: user.uid,
            checked: false,
            content: note,
            time: serverTimestamp(),
          });
          console.log("Note written with ID: ", docRef.id);
          setNote("");
        }
      } catch (error) {
        console.log("Error adding note:", error);
      }
    } else {
      console.log("Note is empty");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(e.target.value);
  };

  return (
    <section
      className={`relative top-[-2.5rem] flex flex-row gap-4 items-center w-[327px] h-12 rounded-[5px] pl-4 mx-auto xl:w-[540px] xl:h-[64px] ${
        theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"
      }`}
    >
      <div className="w-5 h-5 rounded-full border-[1px] border-lightGrayishBlueHover shrink-0"></div>
      <form onSubmit={submitNote} className="w-full">
        <input
          type="text"
          placeholder="Create a new todo..."
          value={note}
          onChange={handleInputChange}
          className={`outline-none w-full h-full pr-2 ${
            theme === "light"
              ? "bg-veryLightGray text-darkerGrayishBlueB"
              : "bg-veryDarkDesaturatedBlue text-veryLightGray"
          } `}
        />
      </form>
    </section>
  );
};

export default AddNote;

// import { useContext } from "react";

// import { useState } from "react";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { db } from "../firebase/config";
// import { auth } from "../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

// import { AppContext, AppState } from "../context/AppContext";

// const AddNote = () => {
//   const [note, setNote] = useState("");
//   const { theme } = useContext(AppContext) as AppState;

//   const submitNote = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (note.trim() !== "") {
//       try {

//         const user = auth.currentUser; // Get the current user
//         const userRef = collection(db, "users").doc(user.uid); // Create a reference to the user document

//         const docRef = await addDoc(collection(db, "notes"), {
//           checked: false,
//           content: note,
//           time: serverTimestamp(),
//           userRef: userRef,
//         });
//         console.log("Note written with ID: ", docRef.id);
//         setNote("");
//       } catch (error) {
//         console.log("Error adding note:", error);
//       }
//     } else {
//       console.log("Note is empty");
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setNote(e.target.value);
//   };

//   return (
//     <section
//       className={`relative top-[-2.5rem] flex flex-row gap-4 items-center w-[327px] h-12 rounded-[5px] pl-4 mx-auto xl:w-[540px] xl:h-[64px] ${
//         theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"
//       }`}
//     >
//       <div className=" w-5 h-5 rounded-full border-[1px] border-lightGrayishBlueHover shrink-0"></div>
//       <form onSubmit={submitNote} className="w-full">
//         <input
//           type="text"
//           placeholder="Create a new todo..."
//           value={note}
//           onChange={handleInputChange}
//           className={`outline-none w-full h-full pr-2 ${
//             theme === "light"
//               ? "bg-veryLightGray text-darkerGrayishBlueB"
//               : "bg-veryDarkDesaturatedBlue text-veryLightGray"
//           } `}
//         />
//       </form>
//     </section>
//   );
// };

// export default AddNote;
