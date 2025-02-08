import React from 'react'
import Avatar, { AvatarSize } from '../../Avatar'

import MenueItem from '../UserOption/MenueItem';
import NavbarUserOption from '../UserOption/NavbarUserOption';

const ConversationNavbar = () => {
  return (
    <nav className='w-[100%] h-14 border-2 border-border rounded-md flex justify-between items-center px-2'>
        <Avatar size={AvatarSize.large}/>
        <NavbarUserOption />
    </nav>
  )
}

export default ConversationNavbar