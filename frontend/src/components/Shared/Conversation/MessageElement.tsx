import { Message } from "../../../../lib/types";

interface MessageElementProps {
  message: Message;
}

const MessageElement: React.FC<MessageElementProps> = ({ message }) => {
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
          message.type === "sender" ? "self-end" : "self-start"
        } flex flex-col`}
      >
        {message.message}
        <span className="block self-end text-copy-secondary text-sm">
          {message.time}
        </span>
      </p>
    </>
  );
};

export default MessageElement;
