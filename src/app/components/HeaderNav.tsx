import Link from "next/link";

const HeaderNav = () => {
  return (
    <nav className=" bg-veryDarkDesaturatedBlue h-12 flex justify-center items-center">
      <ul className="flex flex-row gap-4 text-xl text-veryLightGray">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        {/* Add sign in and sign up and profile option in future */}

        {/* <li>
        <Link href="/"></Link>
    </li> */}
      </ul>
    </nav>
  );
};
export default HeaderNav;
