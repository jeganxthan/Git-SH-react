import WebSocket, { WebSocketServer } from "ws";

interface User {
  socket: WebSocket;
  userId: string;
}

const users: User[] = [];
export const initWebRTCSignaling = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("🔗 New WebSocket client connected");

    let currentUser: User | null = null;

    ws.on("message", (data: WebSocket.RawData) => {
      const message = data.toString().trim();
      if (!message) return;

      let parsed: any;
      try {
        parsed = JSON.parse(message);
      } catch {
        console.log("⚠️ Invalid JSON:", message);
        return;
      }

      switch (parsed.type) {
        case "addUser": {
          currentUser = { socket: ws, userId: parsed.userId };
          users.push(currentUser);
          console.log("👥 Online users:", users.map((u) => u.userId));
          break;
        }

        case "offer":
        case "answer":
        case "candidate": {
          const receiver = users.find((u) => u.userId === parsed.receiverId);
          if (receiver && receiver.socket.readyState === WebSocket.OPEN) {
            receiver.socket.send(JSON.stringify(parsed));
          }
          break;
        }

        default:
          console.log("📩 Unknown message type:", parsed.type);
      }
    });

    ws.on("close", () => {
      console.log("❌ Client disconnected");
      if (currentUser) {
        const index = users.findIndex((u) => u.socket === ws);
        if (index !== -1) users.splice(index, 1);
      }
    });
  });
};
