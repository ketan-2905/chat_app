"use client"
import React, { PropsWithChildren } from 'react'
import { MessageSquare, Sun, User, Moon } from "lucide-react";
import MenueItem from './MenueItem';
import { useTheme } from '@/context/ThemeContext';
import Avatar, { AvatarSize } from '../../Avatar';

interface SidebarUserOptionProps{
    isHorizontal?: boolean,
    className?: string, 
}

const SidebarUserOption: React.FC<PropsWithChildren<SidebarUserOptionProps>> = ({className, isHorizontal=true}) => {
  const {theme,toggleTheme} = useTheme()
  return (
    <div className={`flex ${isHorizontal ? "flex-row justify-evenly items-center":"flex-col justify-between items-center h-[100%]"} border-border border-2 p-2 rounded-md ${className}`}>
      <div className={`flex ${isHorizontal? "flex-row justify-evenly items-center gap-2 w-[50%]":"flex-col justify-between items-center"}`}>
      <MenueItem className='' onClick={() => {}}>
        <MessageSquare className='w-7 h-7'/>
      </MenueItem>
      <MenueItem className='' onClick={() => {}}>
        <User className='w-7 h-7'/>
      </MenueItem>
      </div>
      <div className={`flex ${isHorizontal? "flex-row justify-evenly items-center gap-2 w-[50%]":"flex-col justify-between items-center "}`}>
      <MenueItem className='' onClick={toggleTheme}>
        {theme==="light"? <Sun className='w-7 h-7'/>:<Moon className='w-7 h-7' />}
      </MenueItem>
      <Avatar size={AvatarSize.large}/>
      </div>
    </div>
  )
}

export default SidebarUserOption
