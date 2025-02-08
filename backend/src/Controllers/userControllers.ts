import prisma from "db/prisma";
import {Request, Response } from "express";



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

 export const getUser = async (req: Request, res: Response) =>{
    try {
        const {id: userId} = req.params
        if(!userId){
            res.status(401).send({message: "Invalid credentials"})
            return
        }
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            }
        })
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
        return
    }
}

export const getSelf = async (req: Request, res: Response) =>{
    try {
        const {id: userId} = req.params
        if(!userId){
            res.status(401).send({message: "InvaluserId credentials"})
            return
        }
        const user = await prisma.user.findUnique({
            where:{
                id: userId,
            }
        })
    } catch (error) {
        res.status(500).send({message: "Internal server error"})
        return
    }
}