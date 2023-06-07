"use client";

import { DocumentData } from "firebase/firestore";
import NoteItem from "./NoteItem";

import { useContext } from "react";
import { AppContext, AppState } from "../context/AppContext";

interface Note {
  id: string;
  data: DocumentData;
}

const NoteListContainer = () => {
  // Getting the notes and theme from the context
  const { theme, notes } = useContext(AppContext) as AppState;

  return (
    // Note list container
    <div
      className={`note-list drop-shadow-lg w-[327px] flex flex-col mx-auto relative top-[-1.2rem] bg-[#fafafa] rounded-[5px] xl:w-[540px]  ${
        theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"
      }`}
    >
      {notes.map(({ id, content, checked }) => {
        return (
          <NoteItem key={id} id={id} content={content} checked={checked} />
        );
      })}
    </div>
  );
};

export default NoteListContainer;
