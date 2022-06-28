// Student's Model
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    rollno: { type: Number, required: true, unique: true },
    class: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const students = new mongoose.model("students", studentSchema);

module.exports = students;
