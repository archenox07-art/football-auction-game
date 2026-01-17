import { useEffect, useState } from "react";
import { connectSocket, getSocket, disconnectSocket } from "../socket/socket";

export default function Game() {
  const profile = JSON.parse(localStorage.getItem("profile"));

  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [players, setPlayers] = useState([]);
  const [auction, setAuction] = useState(null);
  const [joined, setJoined] = useState(false);
  const [timeLimit, setTimeLimit] = useState(20);

  /* 🔌 CONNECT SOCKET ONCE */
  useEffect(() => {
    let active = true;

    async function initSocket() {
      const s = await connectSocket();
      if (!active) return;

      setSocket(s);

      s.on("room_created", (id) => {
        setRoomId(id);
        setJoined(true);
      });

      s.on("room_update", (players) => {
        setPlayers(players);
      });

      s.on("auction_started", (data) => {
        setAuction(data);
      });

      s.on("bid_update", (data) => {
        setAuction((prev) => ({ ...prev, ...data }));
      });

      s.on("timer_update", (t) => {
        setAuction((prev) => prev ? { ...prev, timeLeft: t } : prev);
      });

      s.on("auction_ended", (result) => {
        alert(
          result.winner
            ? `${result.winner} won ${result.player.name} for ${result.price}M`
            : "Auction ended with no bids"
        );
        setPlayers(result.players);
        setAuction(null);
      });
    }

    initSocket();

    return () => {
      active = false;
      disconnectSocket();
    };
  }, []);

  /* 🎯 ACTIONS */
  const createRoom = () => {
    socket.emit("create_room", {
      username: profile.username
    });
  };

  const joinRoom = () => {
    socket.emit("join_room", {
      roomId,
      username: profile.username
    });
    setJoined(true);
  };

  const startAuction = () => {
    socket.emit("start_auction", {
      roomId,
      duration: timeLimit
    });
  };

  const bid = () => {
    socket.emit("place_bid", {
      roomId,
      amount: auction.highestBid + 50
    });
  };

  /* 🧱 UI */
  if (!socket) {
    return <div style={{ padding: 20 }}>Connecting…</div>;
  }

  if (!joined) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Welcome, {profile.username}</h2>

        <button onClick={createRoom}>Create Room</button>

        <br /><br />

        <input
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <button onClick={joinRoom}>Join Room</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Room: {roomId}</h2>

      <h3>Players</h3>
      <ul>
        {players.map((p) => (
          <li key={p.uid}>
            {p.username} — 💰 {p.budget}M
          </li>
        ))}
      </ul>

      {!auction ? (
        <div>
          <label>
            Auction Time:
            <select
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            >
              <option value={10}>10s</option>
              <option value={20}>20s</option>
              <option value={30}>30s</option>
            </select>
          </label>

          <br /><br />

          <button onClick={startAuction}>Start Auction</button>
        </div>
      ) : (
        <div style={{ marginTop: 20 }}>
          <h3>AUCTION LIVE</h3>
          <p>Player: {auction.player.name}</p>
          <p>Position: {auction.player.position}</p>
          <p>Highest Bid: {auction.highestBid}M</p>
          <p>Leader: {auction.highestBidder || "None"}</p>
          <p>⏱ Time Left: {auction.timeLeft}s</p>

          <button onClick={bid}>Bid +50M</button>
        </div>
      )}
    </div>
  );
}
