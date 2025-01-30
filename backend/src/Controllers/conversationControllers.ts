import { Request, Response } from "express";
import prisma from "../db/prisma";

export const getUsers = async (req: Request, res: Response) => {
  try{
    const {match} = req.body

    const users = prisma.user.findMany({
      where : {
        userName : {
          contains : match,
        },
      },
    })

    if(!users){
      res.status(400).send([])
    }

    res.status(201).send(users)
  } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
} 

export const getUser = async (req: Request, res: Response) => {
  try{
    const {userId} = req.body

    const user = prisma.user.findFirst({
      where : {
        id : userId,
      },
    })

    if(!user){
      res.status(400).send({message : "User not found"})
    }

    res.status(201).send(user)
  } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
} 

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

  