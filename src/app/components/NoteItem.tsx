import { updateDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import Image from "next/image";
import { useContext } from "react";
import { AppContext, AppState } from "../context/AppContext";

interface NoteItemProps {
  id: string;
  checked: boolean;
  content: string;
}

const NoteItem: React.FC<NoteItemProps> = ({ id, checked, content }) => {
  const { theme } = useContext(AppContext) as AppState;

  // Handle checkbox click
  const handleCheckBoxClick = (id: string) => async () => {
    try {
      const noteRef = doc(db, "notes", id);
      const noteSnap = await getDoc(noteRef);

      if (!noteSnap.exists()) {
        console.log("No such document!");
      } else {
        console.log("Document data:", noteSnap.data());
      }

      // Get the checked status from the document
      const { checked } = noteSnap.data() as { checked: boolean };

      // Toggle the checked status
      const updatedChecked = !checked; // Toggle the checked status

      // Update the document
      await updateDoc(noteRef, {
        checked: updatedChecked,
        completedAt: updatedChecked ? serverTimestamp() : null,
      });
    } catch (error) {
      // Handle errors here
      console.error("Error updating note:", error);
    }
  };

  return (
    // Note item container
    <div
      className={`flex flex-row items-center px-4 min-h-[53px] border-b xl:min-h-[64px] ${
        theme === "light"
          ? "border-lightGrayishBlueHover"
          : "border-darkerGrayishBlueB"
      }`}
      onClick={handleCheckBoxClick(id)}
    >
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 gradient-hover ${
          checked
            ? "justify-center check-box-ticked"
            : "border-[1px] border-[#e3e4f1]"
        }`}
      >
        {checked && (
          <Image
            src="./assets/images/icon-check.svg"
            width={8}
            height={5}
            alt="check tick"
          />
        )}
      </div>

      <div className="p-flex pl-2 flex flex-row items-center justify-between w-full">
        <p
          className={`font-normal text-xs leading-3 tracking-[0.167px] ${
            checked ? "line-through" : ""
          } ${checked && theme === "light" ? "text-lightGrayishBlue" : ""} ${
            checked && theme === "dark" ? "text-veryDarkGrayishBlueB" : ""
          }  ${!checked && theme === "dark" ? "text-lightGrayishBlue" : ""}`}
        >
          {content}
        </p>
        <div>
          <Image
            src="./assets/images/icon-cross.svg"
            width={12}
            height={12}
            alt="delete icon"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
