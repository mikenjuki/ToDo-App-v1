import NoteListContainer from "./components/NoteListContainer";

const Home = () => {
  return (
    <>
      <NoteListContainer />

      <footer className="flex flex-col items-center relative mt-6 xl:gap-4 gap-8 xl:mt-0 xl:top-[1rem]">
        <p className="font-normal text-sm leading-[14px] tracking-[0.194px] text-[#9495A5]">
          Drag and drop to reorder list
        </p>
        <div className="attribution text-[6px] text-[#9495A5]">
          Challenge by
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Michael Njuki</a>.
        </div>
      </footer>
    </>
  );
};

export default Home;
