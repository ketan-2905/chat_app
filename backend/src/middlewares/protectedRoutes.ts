import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db/prisma";

interface DecodeToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["jwt"];

    if (!token) {
      res.status(401).send({ message: "Unauthorised - No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodeToken;

    if (!decoded) {
      res
        .status(401)
        .send({ message: "Unauthorised - No valid token provided" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { userName: decoded.userName },
      select: {
        id: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" , user: user, userName: decoded.userName });
      return;
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.status(500).send({
      message: "Internal Server error from protectedRoute",
    });
  }
};

export default protectedRoute;
