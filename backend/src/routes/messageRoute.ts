import express from "express"
import protectedRoute from "../middlewares/protectedRoutes"
import { getMessages, sendMessage } from "../Controllers/messageControllers"

const route = express.Router()

route.post("/send/:id",protectedRoute,sendMessage)
route.get("/:id",protectedRoute,getMessages)




export default route