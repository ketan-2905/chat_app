import express from "express"
import { getMe, login, logout, signIn } from "../Controllers/authControllers"
import protectedRoute from "../middlewares/protectedRoutes"

const route = express.Router()

route.get("/me",protectedRoute , getMe)

route.post("/signin",signIn)
route.post("/login",login)
route.post("/logout",logout)

route.get("/signup",(req,res) => {
    res.send("signed up susscesfully")
})

export default route