import express from "express";
import dotenv from "dotenv";

import {
  getAllMessages,
  getNewMessages,
  listChatHistory,
  sendMessage,
} from "../controllers/messages.js";

dotenv.config();

const router = express();

router.post("/list-chat-history", listChatHistory);

// send a text message
router.post("/", sendMessage);

//webhooks
router.get("/new-message", getNewMessages);
router.get("/:dateBefore", getAllMessages);

export default router;
