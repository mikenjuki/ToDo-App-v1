"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const AddNote = () => {
  const [note, setNote] = useState("");

  const submitNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (note.trim() !== "") {
      try {
        const docRef = await addDoc(collection(db, "notes"), {
          checked: false,
          content: note,
          time: serverTimestamp(),
        });
        console.log("Note written with ID: ", docRef.id);
        setNote("");
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
    <form onSubmit={submitNote}>
      <input
        type="text"
        placeholder="Create a new todo..."
        value={note}
        onChange={handleInputChange}
        className=" w-[540px] h-[64px] bg-veryDarkDesaturatedBlue rounded-md pl-8 text-lightGrayishBlue text-lg font-normal placeholder-darkGrayishBlue placeholder-opacity-50 focus:outline-none"
      />
    </form>
  );
};

export default AddNote;
