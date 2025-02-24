import prisma from "../db/prisma";
import { Request, Response } from "express";

export const getSearchUsers = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const exclude = Array.isArray(req.query.exclude) ? req.query.exclude : req.query.exclude ? [req.query.exclude] : [];


    const whereCondition: any = {
      userName: {
        contains: search,
      },
    };

    if (exclude.length > 0) {
      whereCondition.userName.notIn = exclude;
    }

    const users = await prisma.user.findMany({
      where: whereCondition,
      select: {
        id: true,
        userName: true,
        fullName: true,
        profileImageSrc: true,
      },
    });

    if (!users) {
      res.status(400).send([]);
      return
    }

    res.status(201).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error from getusers" });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const ids = Array.isArray(req.query.ids)
  ? req.query.ids.map(String)  // Ensure all are strings
  : req.query.ids
  ? [String(req.query.ids)] // Convert single ID to string array
  : [];
  
    const users = await prisma.user.findMany({
      where:{
        id:{
          in:[...ids],
        }
      },select:{
        id: true,
  userName: true,
  fullName: true,
  profileImageSrc: true,
      }
    });

    if (!users) {
      res.status(400).send([]);
      return
    }

    res.status(201).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal server error from getusers" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    
    if (!userId) {
      res.status(401).send({ message: "Invalid credentials" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    res.status(200).send({
      id: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileImageSrc: user.profileImageSrc,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};

export const getSelf = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    if (!userId) {
      res.status(401).send({ message: "InvaluserId credentials" });
      return;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
    return;
  }
};
