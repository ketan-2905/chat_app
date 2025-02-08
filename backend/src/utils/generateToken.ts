import jwt from "jsonwebtoken"
import {Response} from "express"

const  generateToken = (userName: string, res: Response) =>{

    const token = jwt.sign({userName},process.env.JWT_SECRETE!,{
        expiresIn: "15d"
    })

    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })

    return token
}

export default generateToken