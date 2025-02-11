import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthContextprovider } from "@/context/AuthContext";

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
      <body className={` ${poppins.className} antialiased`}>
        <ThemeProvider>
          <AuthContextprovider>{children}</AuthContextprovider>
        </ThemeProvider>
      </body>
    </html>
  );
}
