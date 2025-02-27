import { Server } from "socket.io"
import http from "http"
import express  from 'express';

const app = express()

const server= http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
    }
})

export const getReceiverSocketId = (reciverId: string) => {
    return userSocketMap[reciverId]
}

export const getReceiverSocketIds = (reciverIds: string[]) => {
    return reciverIds.map(reciverId => {
        return userSocketMap[reciverId]
    })
}

const userSocketMap : {[key: string]: string} = {} // {userId: socketId}

io.on("connection", (socket) => {

    const userId = socket.handshake.query.userId as string

    if(userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

export {app, io, server}