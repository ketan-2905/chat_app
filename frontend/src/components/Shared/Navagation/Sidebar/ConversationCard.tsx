"use client";
import Avatar, { AvatarSize } from "../../Avatar";
import {Conversation } from "../../../../../lib/types";
import { useContext, useEffect} from "react";
import Loader from "../../Loader";
import { useConversationStore } from "@/zustand/useConversationStore";
import SidebarContext from "@/context/SlideBarContext";
import useConversationUser from "@/hooks/useConversationUser ";

type ConversationCardProps = {
  conversation: Conversation;
};

const ConversationCard = ({ conversation }: ConversationCardProps) => {

  const sidebarContext = useContext(SidebarContext)
  const {setSelectedConversation}= useConversationStore();
  const {receiverUser, isOnline, isLoading} = useConversationUser({conversation})

  return (
    <div className="flex justify-center items-center gap-2 border-2 border-border bg-background m-2 rounded-md p-1 hover:bg-cta-background cursor-pointer" onClick={()=> {
      setSelectedConversation(conversation)
      sidebarContext?.onClose()
    }}>
      
      {isLoading ? <Loader />:(<>
        <div className="w-[15%] relative">
        <Avatar size={AvatarSize.extralarge} profileSrc={conversation.name? "/images/group.png":receiverUser?.profileImageSrc}/>
        {isOnline ? <span className="w-3 h-3 rounded-full bg-green-700 absolute left-[65%] top-[71%]"></span>:null}
      </div>
      <div className="flex justify-between items-center w-[85%] px-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-copy-primary text-base">
            {conversation.name || receiverUser?.fullName || "Unknown User"}
          </h1>
          <span className="text-copy-secondary text-sm">Recent msg</span>
        </div>
        {/* unread message count is greater than zero then show this element */}
        {/* <span className="bg-sky-600 px-2 text-white rounded-md text-base">
          5
        </span> */}
      </div>
    </>)}
    </div>
 
  );
};

export default ConversationCard;
