"use client";
import { useEffect} from "react";
import MessageElement from "./MessageElement";
import { useConversationStore } from "@/zustand/useConversationStore";
import useListenMessage from "@/hooks/useListenMessage";
import useChatScroll from "@/hooks/useChatScroll";
import Loader from "../Loader";

const ConversationBody = () => {
  const { selectedConversation, fetchMessages, clientMessages } =
    useConversationStore();
  useListenMessage();
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  const ref = useChatScroll(clientMessages);
  return (
    <div
      className="custom-scrollbar overflow-y-auto h-[100%] flex flex-col p-2 w-[100%]"
      ref={ref}
    >
      {clientMessages ? (
        clientMessages.map((message, index) => {
          return <MessageElement key={index} message={message} />;
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ConversationBody;
