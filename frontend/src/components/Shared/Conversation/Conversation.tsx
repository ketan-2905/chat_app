import React from "react";
import ConversationNavbar from "../Navagation/Navbar/ConversationNavbar";
import ConversationMessageInput from "./ConversationMessageInput";
import ConversationBody from "./ConversationBody";
import getMessagesFormated from "@/utils/daySeparator";

const Conversation = () => {
  const rawMessages = [
    {
      message: "Got them, thanks! Looking good",
      time: "2025-01-08 09:50:45.456",
      type: "sender",
    },
    {
      message: "The team is going to love this new approach",
      time: "2025-01-09 09:52:20.789",
      type: "receiver",
    },
    {
      message: "Absolutely! See you in the meeting",
      time: "2025-01-10 09:54:35.234",
      type: "sender",
    },
    {
      message: "Don't forget to bring the requirements doc",
      time: "2025-01-10 09:56:50.567",
      type: "receiver",
    },
    {
      message: "Already got it ready",
      time: "2025-01-11 09:58:15.890",
      type: "sender",
    },
    {
      message: "Perfect! Meeting room is booked",
      time: "2025-01-12 10:00:30.123",
      type: "receiver",
    },
    {
      message: "On my way!",
      time: "2025-01-30 10:02:45.456",
      type: "sender",
    },
  
    {
      message: "Hey, we should start planning the new project",
      time: "2025-02-01 14:15:23.456",
      type: "sender",
    },
    {
      message: "Agreed! Let's break down the requirements",
      time: "2025-02-01 14:18:45.789",
      type: "receiver",
    },
    {
      message: "I'll prepare an initial draft",
      time: "2025-02-01 14:20:12.234",
      type: "sender",
    },
    {
      message: "How's the draft coming along?",
      time: "2025-02-03 09:20:33.567",
      type: "receiver",
    },
    {
      message: "Just finished it. Will share in our next meeting",
      time: "2025-02-03 09:22:55.890",
      type: "sender",
    },
    {
      message: "Great! I've also gathered some reference materials",
      time: "2025-02-05 11:24:15.123",
      type: "receiver",
    },
    {
      message: "Those will be helpful. Did you review the timeline?",
      time: "2025-02-05 11:26:30.456",
      type: "sender",
    },
    {
      message: "Yes, I think we need to adjust some deadlines",
      time: "2025-02-05 11:28:45.789",
      type: "receiver",
    },
    {
      message: "Let's discuss this in detail",
      time: "2025-02-07 13:30:20.234",
      type: "sender",
    },
    {
      message: "I've updated the project timeline document",
      time: "2025-02-07 13:32:40.567",
      type: "receiver",
    },
    {
      message: "Perfect timing! Just reviewing it now",
      time: "2025-02-07 13:34:15.890",
      type: "sender",
    },
    {
      message: "What do you think about the new milestones?",
      time: "2025-02-07 15:36:30.123",
      type: "receiver",
    },
    {
      message: "They look realistic. Good job!",
      time: "2025-02-07 15:38:45.456",
      type: "sender",
    },
    {
      message: "Should we present this to the team tomorrow?",
      time: "2025-02-07 16:40:20.789",
      type: "receiver",
    },
    {
      message: "Yes, let's do it in the morning meeting",
      time: "2025-02-07 16:42:35.234",
      type: "sender",
    },
    {
      message: "I've prepared the presentation slides",
      time: "2025-02-08 09:44:50.567",
      type: "receiver",
    },
    {
      message: "Great! Can you share them before the meeting?",
      time: "2025-02-08 09:46:15.890",
      type: "sender",
    },
    {
      message: "Just sent them to your email",
      time: "2025-02-08 09:48:30.123",
      type: "receiver",
    },
  ];

  const messages = getMessagesFormated(rawMessages)


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
