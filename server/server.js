const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/studentModel");

const app = express();
app.use(express.json());

// --- ONLINE DATABASE CONNECTION (ONLINE CLOUD MONGODB) ---
const MONGO_URI = "mongodb+srv://hostel_user:hostel123@cluster0.v8j9b.mongodb.net/hostel_system?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
  .then(() => console.log("Cloud MongoDB Connected Successfully! ☁️✅"))
  .catch((err) => console.error("Cloud MongoDB Connection Error ❌:", err));

// Student Data Save Route
app.post("/api/students", async (req, res) => {
  try {
    const { name, rollNumber, roomNumber, phone } = req.body;
    const newStudent = new Student({ name, rollNumber, roomNumber, phone });
    await newStudent.save();
    res.status(201).json({ message: "Student Added Successfully! 🎉", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test Connection Route
app.get("/api/status", (req, res) => {
  res.json({ message: "Backend AND Cloud Database connected successfully!" });
});

// Base Route
app.get("/", (req, res) => {
  res.send("Hostel Management System API Running");
});

// Render/Deployment ke liye port dynamic hona chahiye
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});