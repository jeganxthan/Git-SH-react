require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const shRoutes = require("./Routes/shRoutes");
const userRoutes = require("./Routes/userRoutes");
const uploadRoutes = require('./Routes/uploadRoutes');
const passport = require("passport");
const passportSetup = require("./config/passport");
const authRoutes = require("./Routes/authRoutes");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/sh', shRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
