import React from 'react'
import { Message } from '../../../../lib/types'
import MessageElement from './MessageElement'

interface ConversationBodyProps{
  messages: Message[]
}

const ConversationBody: React.FC<ConversationBodyProps> = ({messages}) => {
  return (
    <div className='scrollbar-hide overflow-y-auto h-[100%] flex flex-col p-2 w-[100%]'>
      {
        messages.map((message,index) => {
          return(
            <MessageElement key={index} message={message}/>
          )
        })
      }
    </div>
  )
}

export default ConversationBody
