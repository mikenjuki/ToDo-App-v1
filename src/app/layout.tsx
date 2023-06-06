import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import HeaderNav from "./components/HeaderNav";

import { AppProvider } from "./context/AppContext";
import BodyColorUpdater from "./components/BodyColorUpdater";

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
        <body className={`${Josefin.className} `}>
          <BodyColorUpdater />
          <HeaderNav />

          <main>{children}</main>
        </body>
      </AppProvider>
    </html>
  );
}
