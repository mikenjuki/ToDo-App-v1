"use client";

import NoteItem from "./NoteItem";
import SortNotes from "./SortNotes";

// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { useContext } from "react";
import { AppContext, AppState } from "../context/AppContext";

import { useAuthContext } from "../context/AuthContext";

interface Note {
  id: string;
  userRef?: string;
  content: string;
  checked: boolean;
}

const NoteListContainer = () => {
  // Getting the notes and theme from the context
  const { theme, filteredNotes, deleteCheckedNotes } = useContext(
    AppContext
  ) as AppState;

  const { user } = useAuthContext();

  // Filter notes based on userRef field
  const userNotes = filteredNotes.filter(
    (note: Note) => note.userRef === user?.id
  );

  const handleClearCompleted = () => {
    // Call the deleteCheckedNotes function
    deleteCheckedNotes();

    // Show the toast notification
    toast.success("Deleted checked notes!", {
      hideProgressBar: true,
    });
  };

  return (
    // Note list container
    <div
      className={`note-list drop-shadow-lg w-[327px] flex flex-col mx-auto relative top-[-1.2rem] rounded-[5px] xl:w-[540px]  ${
        theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"
      }`}
    >
      {userNotes.map(({ id, content, checked }) => {
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
        <p className="font-normal text-[14px] leading-3 tracking-[0.194px]">{`${userNotes.length} items left`}</p>

        <div className="hidden xl:block">
          <SortNotes />
        </div>

        <button
          className={`font-normal text-[14px] leading-3 tracking-[0.194px] ${
            theme === "light"
              ? "hover:text-veryDarkGrayishBlueA"
              : "hover:text-lightGrayishBlueHover"
          }`}
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default NoteListContainer;
