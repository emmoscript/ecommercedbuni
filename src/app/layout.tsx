import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import React from 'react'; 
import SessionProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nutrifuel",
  description: "Created by Nutrifuel Developers",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
          <App>{children}</App>
        </SessionProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
