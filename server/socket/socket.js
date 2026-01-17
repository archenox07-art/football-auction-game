import { io } from "socket.io-client";
import { auth } from "../firebase/firebase";

/*
  BACKEND SOCKET URL
  This will be provided AFTER backend deployment.
  For now, it stays as an environment variable placeholder.
*/
const BACKEND_URL = import.meta.env.VITE_SOCKET_URL;

let socket = null;

/**
 * Creates an authenticated socket connection
 * using Firebase ID token (Model B security)
 */
export async function connectSocket() {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const token = await auth.currentUser.getIdToken(true);

  socket = io(BACKEND_URL, {
    auth: {
      token
    },
    transports: ["websocket"],
    autoConnect: true
  });

  return socket;
}

/**
 * Returns the active socket instance
 */
export function getSocket() {
  if (!socket) {
    throw new Error("Socket not initialized. Call connectSocket() first.");
  }
  return socket;
}

/**
 * Disconnects the socket safely
 */
export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
