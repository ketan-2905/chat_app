import express from "express"
import { getMe, login, logout, signUp } from "../Controllers/authControllers"
import protectedRoute from "../middlewares/protectedRoutes"

const route = express.Router()

route.get("/me",protectedRoute , getMe)

route.post("/signup",signUp)
route.post("/login",login)
route.post("/logout",logout)

route.get("/signup",(req,res) => {
    res.send("signed up susscesfully")
})

export default route