import dotenv from "dotenv"
dotenv.config();

import http from "http"
import app from "./app"
import { connectDb } from "./config/db";

const server = http.createServer(app);

connectDb();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log("server running on port ${PORT}")
});