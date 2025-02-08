import { getSelf, getUser, getUsers } from "Controllers/userControllers";
import express from "express";
import protectedRoute from "middlewares/protectedRoutes";

const route = express.Router()

route.get("/getUsers", protectedRoute, getUsers);
route.get("/getUser", protectedRoute, getUser);
route.get("/getSelf", protectedRoute, getSelf);
