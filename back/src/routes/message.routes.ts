import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Fetch messages for a channel
router.get("/:channelId", protect, getMessages);

// Send message to a channel
router.post("/:channelId", protect, sendMessage);

export default router;
