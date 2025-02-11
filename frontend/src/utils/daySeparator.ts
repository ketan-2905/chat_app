import { format, isToday, isYesterday, differenceInDays } from "date-fns";
import { Message } from "../../lib/types";

const getMessagesFormated = (messages: Message[]): Message[] => {
  let sortedAsc: Message[] = [];
  let currentDay = "";
  const today = new Date();
  messages.map((message, index) => {
    let day = "";
    const daysDifference = differenceInDays(today, message.time);
    if (isToday(message.time)) {
      day = "Today";
    }else if(isYesterday(message.time)) {
      day = "Yesterday";
    }else if(daysDifference <= 7) {
        day = format(new Date(message.time), "EEEE")
    }else{
        day = format(new Date(message.time), "MMM dd, yyyy")
    }
    message.time = format(new Date(message.time), "HH:mm")
    if (currentDay !== day) {
      const messageDay = {
        message: "",
        time: "",
        type: "date",
        day: day,
      };
      sortedAsc.push(messageDay)
      sortedAsc.push(message)
      currentDay = day;
    }
  });
  return sortedAsc;
};

export default getMessagesFormated
