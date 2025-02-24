"use client";
import React, { PropsWithChildren, useContext } from "react";
import { MessageSquare, Sun, User, Moon, Menu} from "lucide-react";
import MenueItem from "./MenueItem";
import { useTheme } from "@/context/ThemeContext";
import Avatar, { AvatarSize } from "../../Avatar";
import { useAuthContext } from "@/context/AuthContext";
import UserPopupContext from "@/context/UserPopupContext";
import UserOption from "./UserOption";
import useWindowWidth from "@/hooks/useWindowWidth ";
import SidebarContext from '@/context/SlideBarContext'


interface SidebarUserOptionProps {
  className?: string;
}

const SidebarUserOption: React.FC<
  PropsWithChildren<SidebarUserOptionProps>
> = ({ className,}) => {
  const { authUser } = useAuthContext();
  const  userPopupContext = useContext(UserPopupContext)
  const { theme, toggleTheme } = useTheme();
  const sidebarContext = useContext(SidebarContext)


  const width = useWindowWidth()
  return (
    <div
      className={`flex ${
        (width > 768)
          ? "flex-row justify-evenly items-center"
          : "flex-col justify-satrt gap-2 items-center h-[100%]"
      } border-border border-2 p-2 rounded-md ${className}`}
    >
      <div
        className={`flex ${
          (width > 768)
            ? "flex-row justify-evenly items-center gap-2 w-[50%]"
            : "flex-col justify-evenly items-center gap-2"
        }`}
      >
       {!(width > 768)?  <MenueItem className="" onClick={() => sidebarContext?.toggle()}>
          <Menu className="w-7 h-7" />
        </MenueItem>:null}
        <MenueItem className="" onClick={() => {}}>
          <MessageSquare className="w-7 h-7" />
        </MenueItem>
        <MenueItem className="" onClick={() => {}}>
          <User className="w-7 h-7" />
        </MenueItem>
      </div>
      <div
        className={`flex ${
          (width > 768)
            ? "flex-row justify-evenly items-center gap-2 w-[50%]"
            : "flex-col justify-evenly items-center gap-2"
        }`}
      >
        <MenueItem className="" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="w-7 h-7" />
          ) : (
            <Moon className="w-7 h-7" />
          )}
        </MenueItem>
        <div className="relative">
          <Avatar
            size={AvatarSize.large}
            profileSrc={authUser?.profileImageSrc}
            onClick={userPopupContext?.onOpen}
          />
          {userPopupContext?.isOpen ? <UserOption />:null}
        </div>
      </div>
    </div>
  );
};

export default SidebarUserOption;
