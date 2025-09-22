import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../constants/axiosInstance";

const TextMessage = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/api/user/allusers");
        const otherUsers = res.data.filter((u) => u._id !== userId);
        setUsers(otherUsers);
        if (otherUsers.length) setReceiverId(otherUsers[0]._id); // default
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    if (ws.current && ws.current.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket("ws://localhost:5000");
    ws.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      socket.send(JSON.stringify({ type: "addUser", userId }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prev) => [...prev, data]);
      } catch {
        setMessages((prev) => [...prev, { senderId: "server", text: event.data }]);
      }
    };

    socket.onclose = () => console.log("Disconnected from WebSocket server");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.close();
  }, [userId]);


  // Send message
  const sendMessage = async () => {
    if (!text || !receiverId) return;
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket is not open yet");
      return;
    }

    const msg = { type: "sendMessage", senderId: userId, receiverId, text };
    ws.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
    setText("");

    // Optional: save via REST
    try {
      await axiosInstance.post("/messages", msg);
    } catch (err) {
      console.error("Failed to save message via REST", err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <div>
        <select
          value={receiverId || ""}
          onChange={(e) => setReceiverId(e.target.value)}
          style={{ width: "100%", marginBottom: 5 }}
        >
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name || u.username}
            </option>
          ))}
        </select>
        <input
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: "100%", marginBottom: 5 }}
        />
        <button onClick={sendMessage} style={{ width: "100%" }}>
          Send
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          marginTop: 10,
          height: 300,
          overflowY: "auto",
        }}
      >
        {messages.map((m, i) => (
          <div key={i}>
            <b>
              {m.senderId === userId
                ? "You"
                : m.senderId === "server"
                  ? "Server"
                  : "Friend"}
              :
            </b>{" "}
            {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default TextMessage;
