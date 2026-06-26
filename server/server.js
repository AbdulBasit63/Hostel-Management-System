const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. Root Route (Taake Vercel par 404 error na aaye)
app.get('/', (req, res) => {
    res.send("Hostel Management System API Running Successfully!");
});

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log("Database Connection Error: ", err));

// 3. Routes (Agar aapka koi student route hai)
// const studentRoutes = require('./routes/studentRoutes'); 
// app.use('/api/students', studentRoutes);

// Port Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Vercel ke liye zaroori hai