import React from "react";
import ConversationNavbar from "../Shared/Navagation/Navbar/ConversationNavbar";
import ConversationMessageInput from "./ConversationMessageInput";
import ConversationBody from "./ConversationBody";

const Conversation = () => {
  const messages = [
    {
      message: "Hello! How are you?\nI hope you're doing well.",
      time: "10:30",
      type: "receiver", // Message from receiver (left)
    },
    {
      message: "I'm good, thanks! What about you?",
      time: "10:32",
      type: "sender", // Message from sender (right)
    },
    {
      message:
        "Sure, let's meet tomorrow at 3 PM.\nI'll send you the details later.",
      time: "11:45",
      type: "receiver",
    },
    {
      message: "Great! Looking forward to it.",
      time: "11:47",
      type: "sender",
    },
    {
      message:
        "This is a long message that is split into multiple lines. \
It should be displayed properly in the chat UI when rendered. \
Using the backslash (\\) allows for a long string to be written in code across multiple lines.",
      time: "16:25",
      type: "receiver",
    },
    {
      message:
        "Another message with a long text that contains new lines:\n\
- First line of the message\n\
- Second line of the message\n\
- Third line continues...",
      time: "16:25",
      type: "receiver",
    },
    {
      message: "Hello! How are you?\nI hope you're doing well.",
      time: "10:30",
      type: "receiver", // Message from receiver (left)
    },
    {
      message: "I'm good, thanks! What about you?",
      time: "10:32",
      type: "sender", // Message from sender (right)
    },
    {
      message:
        "Sure, let's meet tomorrow at 3 PM.\nI'll send you the details later.",
      time: "11:45",
      type: "receiver",
    },
    {
      message: "Great! Looking forward to it.",
      time: "11:47",
      type: "sender",
    },
    {
      message:
        "This is a long message that is split into multiple lines. \
It should be displayed properly in the chat UI when rendered. \
Using the backslash (\\) allows for a long string to be written in code across multiple lines.",
      time: "16:25",
      type: "receiver",
    },
    {
      message:
        "Another message with a long text that contains new lines:\n\
- First line of the message\n\
- Second line of the message\n\
- Third line continues...",
      time: "16:25",
      type: "receiver",
    },
  ];

  return (
    <div className="p-2 w-full h-screen ">
      <div className="p-2 w-full h-full border-2 border-border rounded-md max-h-[100vh] flex flex-col justify-between items-center">
        <ConversationNavbar />
        <ConversationBody messages={messages} />
        <ConversationMessageInput />
      </div>
    </div>
  );
};

export default Conversation;
