import express from "express"
import {getChannels,createChannels} from "../controllers/channel.controllers";
import {protect} from "../middleware/authMiddleware";
const router = express.Router();
router.get("/", protect, getChannels);
router.post("/",protect,createChannels);
export default router
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzU0MjUwZDJhMDkzNTJiNTVlOWRmMyIsImlhdCI6MTc2NTA5ODA2NCwiZXhwIjoxNzY1NzAyODY0fQ.06GrUw7ttJY09Vnwarv7ktM5YffxjT2NZnnJMg7MaWo