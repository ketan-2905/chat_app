"use client"
import {Phone, Video, Settings  } from "lucide-react";
import MenueItem from "./MenueItem";

const NavbarUserOption = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
            {/* Add on click functionality here */}
            <MenueItem onClick={()=>{}}>
                <Phone className='h-7 w-7'/>
            </MenueItem>
            <MenueItem onClick={()=>{}}>
                <Video className='h-7 w-7'/>
            </MenueItem>
            <MenueItem onClick={()=>{}}>
                <Settings className='h-7 w-7'/>
            </MenueItem>
        </div>
  )
}

export default NavbarUserOption
