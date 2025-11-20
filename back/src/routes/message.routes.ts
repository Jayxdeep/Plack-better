import  express from "express"
import {getMessages} from "../controllers/message.controllers"
import {protect} from "../middleware/authMiddleware"

const router = express.Router();

router.get("/:channelId", protect, getMessages);

export default router;