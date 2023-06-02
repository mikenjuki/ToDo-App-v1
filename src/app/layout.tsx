import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import HeaderNav from "./components/HeaderNav";

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
      <body className={Josefin.className}>
        <HeaderNav />
        {children}
      </body>
    </html>
  );
}
