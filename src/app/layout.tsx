import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Chocolados1UP",
    default: "Chocolados1UP",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[var(--bg-100)] text-[var(--text-100)]`}
      >
        <NavBar />
        <div className="mx-2">{children}</div>
      </body>
    </html>
  );
}
