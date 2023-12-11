import type { Metadata } from "next";
import { Ysabeau_SC } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Ysabeau_SC({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Task Management App with Login/signup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}</StoreProvider>
      </body>
    </html>
  );
}
