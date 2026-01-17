import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import registerSocketHandlers from "./socket/socketHandlers.js";
import { verifyFirebaseToken } from "./auth/firebaseAdmin.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

/* 🔐 SOCKET AUTH MIDDLEWARE */
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) throw new Error("No token");

    const decoded = await verifyFirebaseToken(token);
    socket.user = {
      uid: decoded.uid,
      email: decoded.email
    };

    next();
  } catch {
    next(new Error("Authentication failed"));
  }
});

registerSocketHandlers(io);

server.listen(process.env.PORT || 4000, () => {
  console.log("Secure auction backend running");
});
