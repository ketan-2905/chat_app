"use client"
import React, { useContext, useEffect } from "react";
import ConversationCard from "./ConversationCard";
import MenueItem from "../UserOption/MenueItem";
import { Plus } from "lucide-react";
import { useConversationStore } from "@/zustand/useConversationStore";
import Loader from "../../Loader";
import AddUserMoadalContex from "@/context/AddUserMoadalContex";
import SidebarContext from '@/context/SlideBarContext'
import useWindowWidth from "@/hooks/useWindowWidth ";


const SidebarCoversations = () => {
  const { conversations, loading, fetchConversations, setClientMessages} = useConversationStore();
  const addUserMoadalContex = useContext(AddUserMoadalContex)
  const sidebarContext = useContext(SidebarContext)
  const width = useWindowWidth()


  useEffect(() => {
    fetchConversations()
  },[])

  return (
    <div className={`flex flex-col w-[100%] p-1 border-2 border-border h-[100%] rounded-md ${!(width > 768)? sidebarContext?. isOpen ? "absolute left-[75px] w-[240px] h-[98%] z-50": "hidden":""}`}>
      <div className="flex justify-between items-center">
        {/* If conversation is 1 then conversation if it is greater than 1 then conversations */}
        <h1 className="text-copy-primary">
          {conversations.length > 1 ? "Conversations" : "Conversation"}
        </h1>
        <MenueItem onClick={() => {
          addUserMoadalContex?.onOpen()
          sidebarContext?.onClose()
          setClientMessages([])
        }}>
          {/* Also add function here */}
          <Plus className="h-7 w-7" />
        </MenueItem>
      </div>
      {loading ? (
        <div className="mt-2 w-full flex justify-center items-center"> <Loader /></div>
      ) : (
        <>
           {conversations.map((conversation) => (
        <ConversationCard
          key={conversation.id}
          conversation={conversation}
        />
      ))}
        </>
      )}
    </div>
  );
};

export default SidebarCoversations;
