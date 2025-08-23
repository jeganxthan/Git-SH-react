import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BASE_URL } from "../../constants/apiPaths";

const TextMessage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const currentUserId = "66c8b6fcb1e7a341ab2c1234";  
  const receiverId = "66c8b70db1e7a341ab2c5678";

  useEffect(() => {
    const newSocket = io(BASE_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.emit("join_room", currentUserId);

    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [currentUserId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    socket.emit("send_message", {
      sender: currentUserId,
      receiver: receiverId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="p-4 text-white">
      <div className="h-64 overflow-y-auto border p-2 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`my-1 ${
              msg.sender === currentUserId ? "text-right" : "text-left"
            }`}
          >
            <span className="px-2 py-1 rounded bg-gray-700 inline-block">
              <strong>{msg.sender === currentUserId ? "You" : "Them"}:</strong>{" "}
              {msg.message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 px-2 py-1 text-black rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TextMessage;
