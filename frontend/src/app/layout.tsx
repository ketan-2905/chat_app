import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthContextprovider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { UserPopupContextProvider } from "@/context/UserPopupContext";
import AddUserMoadal from "@/components/Shared/Modal/AddUserModal/AddUserMoadal";
import { AddUserMoadalContexProvider } from "@/context/AddUserMoadalContex";
import SocketContextProvider from "@/context/SocketContext";
import { SidebarContextProvider } from "@/context/SlideBarContext";

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
      <head><title>Chat app</title></head>
      <body className={` ${poppins.className} antialiased`}>
        <AuthContextprovider>
          <AddUserMoadalContexProvider>
            <AddUserMoadal />
            <ThemeProvider>
              <UserPopupContextProvider>
                <SidebarContextProvider>
                  <SocketContextProvider>{children}</SocketContextProvider>
                </SidebarContextProvider>
              </UserPopupContextProvider>
            </ThemeProvider>
            <Toaster toastOptions={{ position: "bottom-right" }} />
          </AddUserMoadalContexProvider>
        </AuthContextprovider>
      </body>
    </html>
  );
}
