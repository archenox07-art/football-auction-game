import { createRoom, joinRoom, removePlayer } from "../rooms/roomManager.js";
import { startAuction, placeBid } from "../auction/auctionManager.js";

export default function registerSocketHandlers(io) {
  io.on("connection", (socket) => {

    socket.on("create_room", (data) => {
      createRoom(io, socket, data);
    });

    socket.on("join_room", (data) => {
      joinRoom(io, socket, data);
    });

    socket.on("start_auction", (data) => {
      startAuction(io, socket, data);
    });

    socket.on("place_bid", (data) => {
      placeBid(io, socket, data);
    });

    socket.on("disconnect", () => {
      removePlayer(io, socket);
    });

  });
}
