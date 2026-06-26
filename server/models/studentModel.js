const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  phone: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema);