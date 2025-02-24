import { getSelf, getUser, getSearchUsers, getUsers } from "../Controllers/userControllers";
import express from "express";
import protectedRoute from "../middlewares/protectedRoutes";

const route = express.Router()

route.get("/getSearchUsers", protectedRoute, getSearchUsers);
route.get("/getUsers", protectedRoute, getUsers);
route.get("/getUser/:id", protectedRoute, getUser);
route.get("/getSelf", protectedRoute, getSelf);

export default route