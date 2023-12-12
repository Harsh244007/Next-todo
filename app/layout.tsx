import type { Metadata } from "next";
import { Ysabeau_SC } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";


const Ysabeau_Font = Ysabeau_SC({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-ysabeau",
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Task Management App with Login/signup.",
  icons: "./next.svg",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={[Ysabeau_Font.variable, Ysabeau_Font.className].join(" ")}>
        <StoreProvider>
          {props.children}
        </StoreProvider>
      </body>
    </html>
  );
}
