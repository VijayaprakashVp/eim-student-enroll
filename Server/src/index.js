const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const StudentController = require("./Controllers/students.controller");

app.use("/students", StudentController);

module.exports = app;
