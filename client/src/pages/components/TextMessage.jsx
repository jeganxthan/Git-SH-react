import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import axios from "axios";
import { BASE_URL } from "../../constants/apiPaths";
import { useNavigate } from "react-router-dom";

const TextMessage = ({ receiverId }) => {
  const { user, token } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/messages/convo/${user._id}/${receiverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(res.data || []);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    if (user && token && receiverId) {
      fetchMessages();
    }
  }, [user, token, receiverId]);

  // Setup WebSocket connection
  useEffect(() => {
    if (!user || !token) return;

    const socket = new WebSocket("ws://localhost:5000");
    ws.current = socket;

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.current.send(JSON.stringify({ type: "addUser", userId: user._id }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Invalid message:", err);
      }
    };

    socket.onclose = () => console.log("Disconnected from WebSocket server");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.close();
  }, [user, token]);

  const sendMessage = () => {
    if (!text || !user || !ws.current) return;

    const msg = {
      type: "sendMessage",
      senderId: user._id,
      receiverId,
      text,
    };

    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msg));
      setText("");
    } else {
      ws.current.addEventListener("open", () => {
        ws.current.send(JSON.stringify(msg));
        setText("");
      });
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ padding: 10, fontSize: 16 }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginTop: 5,
            padding: 10,
            backgroundColor: "#1947a8",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
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
          background: "#f9f9f9",
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#999" }}>
            No messages yet
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.senderId === user._id ? "right" : "left",
              margin: "5px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 20,
                background: m.senderId === user._id ? "#1947a8" : "#ccc",
                color: m.senderId === user._id ? "#fff" : "#000",
              }}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default TextMessage;
