import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import ProfileSetup from "./pages/ProfileSetup";
import Game from "./pages/Game";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route
            path="/game"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
