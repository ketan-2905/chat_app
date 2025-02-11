"use client"
import MenueItem from '../Navagation/UserOption/MenueItem'
import { MessageSquare, Users, Sun, Phone, Video, Send, Plus, X, User, Moon, Settings, Link   } from "lucide-react";
import MessageInputElement from './MessageInputElement';

const ConversationMessageInput = () => {
  return (
    <div className='w-[100%] h-auto max-h-44 border-2 border-border rounded-md flex justify-start gap-2 items-end p-2'>
        {/* Right on click function here */}
      <MenueItem onClick={()=>{}}>
        <Link  className='h-7 w-7'/>
      </MenueItem>
        <MessageInputElement />
    </div>
  )
}

export default ConversationMessageInput
