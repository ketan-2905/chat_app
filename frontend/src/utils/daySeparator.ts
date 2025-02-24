import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { ServerMessage, ClientMessage } from "../../lib/types";

export const getMessagesFormated = (
  messages: ServerMessage[]
): ClientMessage[] => {
  let sortedAsc: ClientMessage[] = [];
  let currentDay = "";
  const today = new Date();
  messages.map((message) => {
    let day = "";
    const daysDifference = differenceInDays(today, message.createdAT);
    if (isToday(message.createdAT)) {
      day = "Today";
    } else if (isYesterday(message.createdAT)) {
      day = "Yesterday";
    } else if (daysDifference <= 7) {
      day = format(new Date(message.createdAT), "EEEE"); // e.g., "Monday"
    } else {
      day = format(new Date(message.createdAT), "MMM dd, yyyy"); // e.g., "Oct 21, 2024"
    }

    // Convert createdAT to "HH:mm" format
    message.createdAT = format(new Date(message.createdAT), "HH:mm");

    // If the message's date is different from the previous message, add a date separator
    if (currentDay !== day) {
      const messageDay = {
        message: "",
        createdAT: "",
        type: "date" as const,
        day: day,
      };
      sortedAsc.push(messageDay);
    }

    // Add the actual message
    const newMessage = {
      message: message.body,
      createdAT: message.createdAT,
      type: "message" as const,
      senderId: message.senderId,
    };

    sortedAsc.push(newMessage);
    currentDay = day;
  });
  return sortedAsc;
};

export const getMessageFormatted = (
  message: ServerMessage,
  previousDay: string
): ClientMessage[] => {
  let formattedMessages: ClientMessage[] = [];
  let day = "";
  const today = new Date();
  const daysDifference = differenceInDays(today, message.createdAT);

  // Determine the day label
  if (isToday(message.createdAT)) {
    day = "Today";
  } else if (isYesterday(message.createdAT)) {
    day = "Yesterday";
  } else if (daysDifference <= 7) {
    day = format(new Date(message.createdAT), "EEEE"); // e.g., "Monday"
  } else {
    day = format(new Date(message.createdAT), "MMM dd, yyyy"); // e.g., "Oct 21, 2024"
  }

  // Convert createdAT to "HH:mm" format
  const formattedTime = format(new Date(message.createdAT), "HH:mm");

  // If the message's date is different from the previous message, add a date separator
  if (previousDay !== day) {
    formattedMessages.push({
      message: "",
      createdAT: "",
      type: "date",
      day: day,
    });
  }

  // Add the actual message
  formattedMessages.push({
    message: message.body,
    createdAT: formattedTime,
    type: "message",
    senderId: message.senderId,
  });
  return formattedMessages;
};
