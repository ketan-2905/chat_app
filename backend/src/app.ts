import express from "express"
import authRoute from "./routes/authRoutes"
import messageRoute from "./routes/messageRoute"
import conversationRoute from "./routes/conversationRoute"
import dotenv from "dotenv"
import  cookieParser from "cookie-parser"



const app = express()

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth/", authRoute)
app.use("/api/message", messageRoute)
app.use("/api/conversation", conversationRoute)


export default app;