import React, { useContext } from "react";
import ConversationNavbar from "../Navagation/Navbar/ConversationNavbar";
import ConversationMessageInput from "./ConversationMessageInput";
import ConversationBody from "./ConversationBody";
import { useConversationStore } from "@/zustand/useConversationStore";
import SidebarContext from "@/context/SlideBarContext";

const Conversation = () => {
  const {selectedConversation} = useConversationStore()
  const sidebarContext = useContext(SidebarContext)
  return (
    <div className="p-2 w-[100%] md:w-[50%] lg:w-full h-screen relative">
      <div className="p-2 w-full h-full border-2 border-border rounded-md max-h-[100vh] flex flex-col justify-between items-center">
        {selectedConversation? <>
          <ConversationNavbar />
        <ConversationBody/>
        <ConversationMessageInput /></>:<div className='h-[100%] flex justify-center items-center w-[100%]'>
      <p className="text-copy-primary">To chat select Conversation from sidbar</p>
    </div>}
      </div>
      {sidebarContext?.isOpen? <div className="w-full h-full bg-sidebar-open-background absolute top-1/2 left-1/2 transfrom -translate-x-1/2 -translate-y-1/2 "></div>:null}
    </div>
  );
};

export default Conversation;
