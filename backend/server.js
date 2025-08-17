require("dotenv").config();
const express = require("express");
const path = require("path"); 
const connectDB = require("./config/db");
const shRoutes = require("./Routes/shRoutes");
const userRoutes = require("./Routes/userRoutes");
const cookieSession = require("cookie-session");
const passport = require("passport");
const passportSetup = require("./config/passport")
const authRoutes = require("./Routes/authRoutes");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(express.json()); 
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"],
        credentials:true,
    })
)
connectDB();


app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, 
  })
);


app.use('/api/user', userRoutes);
app.use('/api/sh', shRoutes);
app.use('/auth', authRoutes);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));