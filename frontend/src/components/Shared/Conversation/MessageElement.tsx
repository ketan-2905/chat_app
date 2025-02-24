"use client"
import { useContext } from "react";
import { ClientMessage } from "../../../../lib/types";
import { AuthContext } from "@/context/AuthContext";

interface MessageElementProps {
  message: ClientMessage;
}

const MessageElement: React.FC<MessageElementProps> = ({ message }) => {
  const {authUser} = useContext(AuthContext)
  return message.day ? (
    <>
        <p className="self-center text-copy-primary text-[0.6rem] p-1 bg-message-day-background rounded-md">
          {message.day}
        </p>
    </>
  ) : (
    <>
      <p
        className={`rounded-md w-auto h-auto max-w-[70%] my-2 p-1 px-2 bg-message-background whitespace-pre-line text-copy-primary relative ${
          message.senderId === authUser?.id ? "self-end" : "self-start"
        }`}
      >
        {message.message}
        <span className="block w-4 self-end text-copy-secondary text-xs mt-2">
          {message.createdAT}
        </span>
      </p>
    </>
  );
};

export default MessageElement;
