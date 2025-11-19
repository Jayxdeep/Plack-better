import express from "express"
import cors from "cors"
import {json} from "express"
import authRoutes from "./routes/auth.routes"
import channelRoutes from "./routes/channel.routes" 
import messageRoutes from "./routes/message.routes"

const app = express();

app.use(cors())
app.use(json())

app.use("/auth",authRoutes)
app.use("/channels", channelRoutes)
app.use("/messages", messageRoutes)

export default app;