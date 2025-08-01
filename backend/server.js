require("dotenv").config();
const express = require("express");
const path = require("path"); 
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const shRoutes = require("./Routes/shRoutes");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"]
    })
)
connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sh', shRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    },
  })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));