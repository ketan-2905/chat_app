import { Message } from "../../lib/types";

const daySeparator = (messages: Message) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const formattedMessages = [];
  let lastDateLabel = null;

  messages.forEach((msg) => {
    const msgDate = new Date(msg.time);
    const msgDateString = msgDate.toISOString().split("T")[0]; // YYYY-MM-DD

    let label;

    if (msgDate.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (msgDate.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else if ((today - msgDate) / (1000 * 60 * 60 * 24) <= 7) {
      label = "Last 7 Days";
    } else {
      label = msgDateString;
    }

    if (label !== lastDateLabel) {
      formattedMessages.push({ type: "date", date: label });
      lastDateLabel = label;
    }

    formattedMessages.push(msg);
  });

  return formattedMessages;
};

// Example usage
const groupedMessages = groupMessagesByDate(chatData.messages);
console.log(groupedMessages);

export default daySeparator;

