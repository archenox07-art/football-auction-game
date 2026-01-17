import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/profile");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <button onClick={loginWithGoogle}>
        Continue with Google
      </button>
    </div>
  );
}
