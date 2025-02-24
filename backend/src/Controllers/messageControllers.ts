import { Request, Response } from "express";
import prisma from "../db/prisma";
import { getReceiverSocketId, getReceiverSocketIds, io } from "../socket/socket";

export const sendMessage = async (req: Request, res: Response) => {
  const start = Date.now();
  try {
    const { body } = req.body;
    const { id: conversationId } = req.params;
    const senderId = req.user.id
    
    let conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversation) {
      res.status(400).send({message: "Conversation doesn't exist"})
      return
    }

    const newMessage = await prisma.message.create({
      data: {
        body: body,
        conversationId: conversationId,
        senderId,
      }
    });

    let duration = Date.now() - start;
    console.log(`${req.method} ${req.url} before socket took ${duration}ms`);

   if(conversation.participatonIds.length === 2){
    const reciverId = conversation.participatonIds.filter(participatonId => participatonId !== senderId)
    
    const reciverSocketId = getReceiverSocketId(reciverId[0])
    if(reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMessage)
    }

    const senderSocketId = getReceiverSocketId(senderId)
    if(senderSocketId) {
      io.to(senderSocketId).emit("newMessage", newMessage)
    }

   }else{
      const reciverIds = conversation.participatonIds.filter( participatonId => participatonId !== senderId)

      const reciverSocketIds = getReceiverSocketIds(reciverIds)
      if(reciverSocketIds.length){
        io.to(reciverSocketIds).emit("newMessage", newMessage)
      }

      const senderSocketId = getReceiverSocketId(senderId)
      if(senderSocketId){
        io.to(senderSocketId).emit("newMessage", newMessage)
      }
   }

    res.status(200).send(newMessage);

    duration = Date.now() - start;
    console.log(`${req.method} ${req.url} after socket took ${duration}ms`);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: conversationId } = req.params;

    const conversation = await prisma.conversation.findFirst({
      where : {
        id : conversationId,
      },
      include : {
        messages : {
          orderBy : {
            createdAT : "asc"
          }
        }
      }
    })

    if(!conversation){
      res.status(401).send([])
      return
    }

    res.status(200).send(conversation.messages);

  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
}

