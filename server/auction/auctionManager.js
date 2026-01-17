import players from "../data/players.js";

const timers = {};

export function startAuction(io, socket, { roomId, duration }) {
  const room = global.rooms?.[roomId];
  if (!room || socket.id !== room.host) return;

  const available = players.filter(
    (p) => !room.usedPlayers.includes(p.id)
  );

  if (available.length === 0) return;

  const selected =
    available[Math.floor(Math.random() * available.length)];

  room.usedPlayers.push(selected.id);

  room.auction = {
    active: true,
    player: selected,
    highestBid: 0,
    highestBidder: null,
    timeLeft: duration
  };

  io.to(roomId).emit("auction_started", room.auction);

  timers[roomId] = setInterval(() => {
    room.auction.timeLeft--;

    io.to(roomId).emit("timer_update", room.auction.timeLeft);

    if (room.auction.timeLeft <= 0) {
      clearInterval(timers[roomId]);
      room.auction.active = false;

      io.to(roomId).emit("auction_ended", room.auction);
    }
  }, 1000);
}

export function placeBid(io, socket, { roomId, amount }) {
  const room = global.rooms?.[roomId];
  if (!room || !room.auction?.active) return;

  const bidder = room.players.find(
    (p) => p.socketId === socket.id
  );

  if (!bidder || bidder.budget < amount) return;
  if (amount <= room.auction.highestBid) return;

  room.auction.highestBid = amount;
  room.auction.highestBidder = bidder.username;
  room.auction.timeLeft = Math.max(room.auction.timeLeft, 5);

  io.to(roomId).emit("bid_update", room.auction);
}
