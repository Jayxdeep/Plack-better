import express from "express"
import {getChannels} from "../controllers/channel.controllers";
import {protect} from "../middleware/authMiddleware";
const router = express.Router();

router.get("/", protect, getChannels);

export default router