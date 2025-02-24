"use client";
import { useSocketContext } from "@/context/SocketContext";
import { useConversationStore } from "@/zustand/useConversationStore";
import { useEffect } from "react";
import { ClientMessage, ServerMessage } from "../../lib/types";
import { getMessageFormatted } from "@/utils/daySeparator";
const notificationSound = "/sound/notification.mp3";


const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { addMessage, clientMessages, setClientMessages, selectedConversation } =
    useConversationStore();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage: ServerMessage) => {
      if(selectedConversation?.id !== newMessage.conversationId) return;
      addMessage(newMessage);

      // Find the last message with a `day` field from bottom to top
      let lastDayMessage: ClientMessage | undefined;
      for (let i = clientMessages.length - 1; i >= 0; i--) {
        if ("day" in clientMessages[i]) {
          lastDayMessage = clientMessages[i] as ClientMessage;
          break;
        }
      }

      // Format the message based on the last day's message
      const formattedMessage = getMessageFormatted(
        newMessage,
        lastDayMessage?.day || "Today"
      );
      const sound = new Audio(notificationSound)
      sound.play()
      setClientMessages(formattedMessage);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, addMessage, setClientMessages]);
};

export default useListenMessage;
