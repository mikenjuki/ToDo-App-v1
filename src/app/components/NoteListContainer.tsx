"use client";

import { DocumentData } from "firebase/firestore";
import NoteItem from "./NoteItem";
import SortNotes from "./SortNotes";

import { useContext } from "react";
import { AppContext, AppState } from "../context/AppContext";

interface Note {
  id: string;
  data: DocumentData;
}

const NoteListContainer = () => {
  // Getting the notes and theme from the context
  const { theme, notes, filteredNotes, deleteCheckedNotes } = useContext(
    AppContext
  ) as AppState;

  console.log(filteredNotes, "line 19 container");

  return (
    // Note list container
    <div
      className={`note-list drop-shadow-lg w-[327px] flex flex-col mx-auto relative top-[-1.2rem] rounded-[5px] xl:w-[540px]  ${
        theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"
      }`}
    >
      {filteredNotes.map(({ id, content, checked }) => {
        return (
          <NoteItem key={id} id={id} content={content} checked={checked} />
        );
      })}
      <div
        className={`stats-section flex items-center justify-between h-[48px] px-4 ${
          theme === "light"
            ? "text-darkGrayishBlue"
            : "text-veryDarkGrayishBlueA"
        }`}
      >
        <p className="font-normal text-[14px] leading-3 tracking-[0.194px]">{`${notes.length} items left`}</p>

        <div className="hidden xl:block">
          <SortNotes />
        </div>

        <button
          className={`font-normal text-[14px] leading-3 tracking-[0.194px] ${
            theme === "light"
              ? "hover:text-veryDarkGrayishBlueA"
              : "hover:text-lightGrayishBlueHover"
          }`}
          onClick={deleteCheckedNotes}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default NoteListContainer;
