import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import registerSocketHandlers from "./socket/socketHandlers.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

registerSocketHandlers(io);

server.listen(process.env.PORT || 4000, () => {
  console.log("Auction backend running");
});
