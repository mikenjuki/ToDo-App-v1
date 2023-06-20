import "./globals.css";
import { Josefin_Sans } from "next/font/google";

import { AppProvider } from "./context/AppContext";
import { AuthContextProvider } from "./context/AuthContext";
import BodyColorUpdater from "./components/BodyColorUpdater";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Josefin = Josefin_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "ToDo App",
  description: "ToDo App",
  authors: { name: "Mike Njuki", url: "https://blog.mikenjuki.com" },
  og: {
    title: "ToDo App",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={`${Josefin.className} h-screen`}>
          <BodyColorUpdater />
          <main>
            <AuthContextProvider>{children}</AuthContextProvider>
          </main>
        </body>

        {/* <ToastContainer /> */}
      </AppProvider>
    </html>
  );
}
