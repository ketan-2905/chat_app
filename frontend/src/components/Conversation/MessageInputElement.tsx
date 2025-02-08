"use client"

import { useState } from "react"
import { Send } from "lucide-react";
import MenueItem from "../Shared/Navagation/UserOption/MenueItem"


const MessageInputElement = () => {

    const [message, setMessage] = useState<string>("")

    const handelSubmit = () => {

    }
  return (
    <div className="w-[100%]">
        <form onSubmit={handelSubmit}
        className="flex justify-start items-end "
        >
            <textarea
            className="bg-background border-none text-copy-primary outline-none w-[100%] scrollbar-hide overflow-y-auto resize-none max-h-40 m-1 h-auto" 
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height
                target.style.height = `${target.scrollHeight}px`; // Set new height based on content
              }}
            />
            <MenueItem onClick={handelSubmit} className="bg-cat hover:bg-cta-active">
                <Send className='h-7 w-7'/>
            </MenueItem>
        </form>
    </div>
  ) 
}

export default MessageInputElement
