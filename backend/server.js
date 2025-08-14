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
const app = express();

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
  cookieSession({
    name:process.env.SESSION_SECRET,
    keys:["gitsh"],
    maxAge:24*60*60*100,
  })
)

app.use('/api/users', userRoutes);
app.use('/api/sh', shRoutes);
app.use('/auth', authRoutes);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));