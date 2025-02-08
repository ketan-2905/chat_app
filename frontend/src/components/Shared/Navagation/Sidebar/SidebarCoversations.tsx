import React from 'react'
import Avatar, { AvatarSize } from '../../Avatar'
import ConversationCard from './ConversationCard'
import MenueItem from '../UserOption/MenueItem'
import { Plus } from "lucide-react";


const SidebarCoversations = () => {
  return (
    <div className='flex flex-col w-[100%] p-1 border-2 border-border h-[92%] rounded-md'>
        <div className='flex justify-between items-center'>
            {/* If conversation is 1 then conversation if it is greater than 1 then conversations */}
            <h1 className='text-copy-primary'>Conversations</h1>
            <MenueItem onClick={()=>{}}>
                {/* Also add function here */}
                <Plus className='h-7 w-7'/>
            </MenueItem>
        </div>
        <ConversationCard />
    </div>
  )
}

export default SidebarCoversations
