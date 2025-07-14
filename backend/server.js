require("dotenv").config();
const express = require('express')
const connectDB = require('./config/db')
const app = express();
const userRoutes = require('./Routes/userRoutes');
const shRoutes = require('./Routes/shRoutes');
const cors = require('cors');
connectDB();
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173/",
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization"]
    })
)

app.use('/api/users', userRoutes);
app.use('/api/sh', shRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`))