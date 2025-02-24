"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import MenueItem from "../Navagation/UserOption/MenueItem";
import { useConversationStore } from "@/zustand/useConversationStore";
import toast from "react-hot-toast";
import API from "../../../../lib/axios";
import useWindowWidth from "@/hooks/useWindowWidth ";

const MessageInputElement = () => {
  const [message, setMessage] = useState<string>("");
  const { selectedConversation } = useConversationStore();
  const width = useWindowWidth();

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "enter": {
          if (e.shiftKey) {
            return
          } 
            handleSubmit();
        }
      }
    };

    if (width > 698) document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (!message) return;
      if (!selectedConversation?.id) {
        toast.error("No conversation selected");
        return;
      }
      const data = { body: message };
      const response = await API.post(
        `/message/send/${selectedConversation.id}`,
        data
      );
      setMessage("");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="w-[100%]">
      <form onSubmit={handleSubmit} className="flex justify-start items-end ">
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
        <MenueItem
          onClick={handleSubmit}
          className="bg-cat hover:bg-cta-active"
        >
          <Send className="h-7 w-7" />
        </MenueItem>
      </form>
    </div>
  );
};

export default MessageInputElement;
