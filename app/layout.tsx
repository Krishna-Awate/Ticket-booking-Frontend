import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { StoreProvider } from "@/src/StoreProvider";
import InactivityHandler from "../components/InactivityHandler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Krishna",
  description: "Application for testing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div>
            <Navbar />
            <main style={{ paddingTop: "64px" }}> {children}</main>
            <InactivityHandler />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
