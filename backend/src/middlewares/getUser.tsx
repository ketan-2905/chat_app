import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma";

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