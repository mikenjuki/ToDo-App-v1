import { AppContext, AppState } from "../context/AppContext";
import { useContext, useState } from "react";

const SortNotes = () => {
  const { theme, filterNotes } = useContext(AppContext) as AppState;
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilter = (filter: string) => {
    filterNotes(filter);
    setActiveFilter(filter);
    console.log(filter, "color");
  };

  return (
    <div
      className={`sort-btns relative flex items-center justify-center h-12 px-4 md:px-0 mx-auto rounded-[5px] w-full
    ${theme === "light" ? "bg-veryLightGray" : "bg-veryDarkDesaturatedBlue"}
    `}
    >
      <button
        className={`mr-2 font-bold text-sm leading-[14px] tracking-[0.194px] ${
          theme === "light"
            ? "hover:text-veryDarkGrayishBlueA"
            : "hover:text-lightGrayishBlueHover"
        } ${activeFilter === "all" && "text-brightBlue"}`}
        onClick={() => handleFilter("all")}
      >
        All
      </button>
      <button
        className={`mr-2 text-[#9495A5] font-bold text-sm leading-[14px] tracking-[0.194px] ${
          theme === "light"
            ? "hover:text-veryDarkGrayishBlueA"
            : "hover:text-lightGrayishBlueHover"
        } ${activeFilter === "active" && "text-brightBlue"}`}
        onClick={() => handleFilter("active")}
      >
        Active
      </button>
      <button
        className={`text-[#9495A5] font-bold text-sm leading-[14px] tracking-[0.194px] ${
          theme === "light"
            ? "hover:text-veryDarkGrayishBlueA"
            : "hover:text-lightGrayishBlueHover"
        } ${activeFilter === "completed" && "text-brightBlue"}`}
        onClick={() => handleFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default SortNotes;
