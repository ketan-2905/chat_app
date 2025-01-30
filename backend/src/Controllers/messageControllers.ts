import { Request, Response } from "express";
import prisma from "../db/prisma";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const { id: conversationId } = req.params;
    const senderId = req.user.id
    
    let conversation = await prisma.conversation.findFirst({
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
        body: message,
        conversationId: conversationId,
        senderId,
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: newMessage,
          },
        },
      });
    }

    res.status(200).send(newMessage);
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

