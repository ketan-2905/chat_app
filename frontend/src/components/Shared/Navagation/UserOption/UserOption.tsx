"use client"

import {LogOut, UserCircle} from "lucide-react"
import PopMenueItem from "./PopMenueItem"
import useLogout from "@/hooks/useLogout"
import { useContext, useEffect, useRef } from "react"
import UserPopupContext from "@/context/UserPopupContext"



const UserOption = () => {

  const modalRef = useRef<HTMLDivElement | null>(null);

  const {isLoading , logout} = useLogout()
  const  userPopupContext= useContext(UserPopupContext)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        userPopupContext?.onClose();
      }
    };

    if (userPopupContext?.isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userPopupContext?.isOpen, userPopupContext?.onClose]);

  return (
    <div className="absolute bottom-full left-full w-32 rounded-md bg-pop-background z-[100]" ref={modalRef}>
      <PopMenueItem title="User" onClick={()=>{}}>
        <UserCircle className="h-7 w-7"/>
      </PopMenueItem>
      <PopMenueItem title="Logout" onClick={logout}>
        <LogOut className="h-7 w-7"/>
      </PopMenueItem>
    </div>
  )
}

export default UserOption
