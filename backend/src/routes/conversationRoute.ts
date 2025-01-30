import express from "express";
import protectedRoute from "../middlewares/protectedRoutes";
import {
  createConversation,
  createGroupConversation,
  getConversations,
  getUser,
  getUsers,
} from "../Controllers/conversationControllers";

const route = express.Router();

route.get("/getConversations", protectedRoute, getConversations);
route.post("/createConversation/:id", protectedRoute, createConversation);
route.post("/createGroupConversation", protectedRoute, createGroupConversation);
route.get("/getUsers", protectedRoute, getUsers);
route.get("/getUser", protectedRoute, getUser);

export default route;
