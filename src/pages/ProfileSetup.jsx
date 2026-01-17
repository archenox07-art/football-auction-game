import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const save = () => {
    if (!username) return alert("Username required");
    localStorage.setItem("profile", JSON.stringify({ username }));
    navigate("/game");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Choose Username</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />
      <button onClick={save}>Continue</button>
    </div>
  );
}
