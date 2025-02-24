import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import prisma from "../db/prisma";
import generateToken from "../utils/generateToken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { userName, fullName, email, password, confirmPassword, gender } =
      req.body;

    if (
      !userName ||
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      res.status(400).send({ message: "Please fill all fields" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).send({ message: "Confirm password dose't match" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (user) {
      res.status(400).send({ message: "UserName alreday exist" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const maleProfileImageSrc = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfileImageSrc = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = await prisma.user.create({
      data: {
        userName,
        fullName,
        email,
        password: hashPassword,
        profileImageSrc:
          gender === "male" ? maleProfileImageSrc : femaleProfileImageSrc,
        gender,
      },
    });

    if (newUser) {
      generateToken(userName, res);

      res.status(200).send({
        id: newUser.id,
        userName: newUser.userName,
        fullName: newUser.fullName,
        profileImageSrc: newUser.profileImageSrc,
      });
    } else {
      res.status(400).send("Invalid user data");
    }
  } catch (error: any) {
    res.status(500).send({message:{
      error: error,
      text:"Invalid server Erroe",
    }});
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }

    generateToken(user.userName, res);

    res.status(200).send({
      id: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileImageSrc: user.profileImageSrc,
    });
  } catch (error: any) {
    res.status(500).send({ message: "Internal server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({ message: "Logout successful" });
  } catch (error: any) {
    res.status(500).send({ message: "Internal server Error" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({where: {id: req.user.id}})

    if (!user) {
      res.status(400).send({ message: "User not found" });
      return;
    }
  
    res.status(200).send({
      id: user.id,
      userName: user.userName,
      fullName: user.fullName,
      profileImageSrc: user.profileImageSrc,
    });
  } catch (error: any) {
    res.status(500).send({ message: "Internal server Error from getMe" });
  }
};
