import { Message } from "../../../lib/types"

interface MessageElementProps{
    message: Message
}

const MessageElement: React.FC<MessageElementProps> = ({message}) => {
  return (
    <p className={`rounded-md w-auto h-auto max-w-[70%] my-2 p-1 bg-message-background whitespace-pre-line text-copy-primary relative ${message.type === "sender"? "self-end":"self-start"} flex flex-col`}>
      {message.message}
      <div className="self-end text-copy-secondary text-sm">{message.time}</div>
    </p>
  )
}

export default MessageElement
