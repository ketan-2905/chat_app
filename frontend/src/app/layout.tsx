import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navgation from "@/components/Shared/Navagation/Navgation";
import { ThemeProvider } from "../context/ThemeContext";
import Conversation from "@/components/Conversation/Conversation";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${poppins.className} antialiased`}
      >
        <ThemeProvider>
           <div className="flex">
           <Navgation />
           <Conversation />
           </div>

           {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
