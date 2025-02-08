import { Request, Response } from "express";
import prisma from "../db/prisma";
 

export const getConversations = async (req: Request, res: Response) => {
    try{
      const userId = req.user.id
  
      const conversations = await prisma.conversation.findMany({
        where:{
          participatonIds : {
            hasSome : [userId]
          }
        }
      })
  
      if(!conversations){
        res.status(401).send([])
        return
      }
  
      res.status(200).send(conversations);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }  

  export const createConversation = async (req: Request, res: Response) => {
    try{
      const userId = req.user.id
      const { id: receiverId } = req.params;
  
      const conversation = await prisma.conversation.create({
        data : {
          participatonIds : {
            set: [userId,receiverId]
          }
        }
      })
  
      if(!conversation){
        res.status(401).send([])
        return
      }
  
      res.status(200).send(conversation);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } 

  export const createGroupConversation = async (req: Request, res: Response) => {
    try{
      const userId = req.user.id
      const { receiverIds, name } = req.body;
  
      const conversation = await prisma.conversation.create({
        data : {
          participatonIds : {
            set: [userId,...receiverIds]
          },
          name : name
        }
      })
  
      if(!conversation){
        res.status(401).send([])
        return
      }
  
      res.status(200).send(conversation);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  } 

  