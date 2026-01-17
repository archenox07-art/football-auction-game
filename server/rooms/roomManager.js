import { generateRoomId } from "../utils/idGenerator.js";

export const rooms = {};

export function createRoom(io, socket, { username }) {
  const roomId = generateRoomId();

  rooms[roomId] = {
    host: socket.id,
    players: [],
    auction: null,
    usedPlayers: []
  };

  rooms[roomId].players.push({
    socketId: socket.id,
    username,
    budget: 1000
  });

  socket.join(roomId);

  socket.emit("room_created", roomId);
  io.to(roomId).emit("room_update", rooms[roomId].players);
}

export function joinRoom(io, socket, { roomId, username }) {
  const room = rooms[roomId];
  if (!room || room.players.length >= 8) return;

  room.players.push({
    socketId: socket.id,
    username,
    budget: 1000
  });

  socket.join(roomId);
  io.to(roomId).emit("room_update", room.players);
}

export function removePlayer(io, socket) {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    room.players = room.players.filter(
      (p) => p.socketId !== socket.id
    );
    io.to(roomId).emit("room_update", room.players);
  }
}
