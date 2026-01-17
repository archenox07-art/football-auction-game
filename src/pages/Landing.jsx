import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40 }}>
      <h1>FOOTBALL AUCTION</h1>
      <p>Real-time multiplayer football auctions.</p>
      <button onClick={() => navigate("/login")}>
        ENTER AUCTION
      </button>
    </div>
  );
}
