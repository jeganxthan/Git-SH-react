require("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./Routes/userRoutes');
const shRoutes = require('./Routes/shRoutes');
const cors = require('cors');
const authRoutes = require("./Routes/authRoutes")
const passport = require("passport");
require("./config/passport");  // just require, no assignment
const session = require("express-session");

const app = express();

connectDB();

app.use(express.json());

app.use(
  session({
    secret: "gitsh",          
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }  // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true  // allow cookies to be sent
  })
);

app.use("/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sh', shRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
