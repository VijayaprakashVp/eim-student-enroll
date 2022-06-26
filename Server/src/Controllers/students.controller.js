const Students = require("../Models/students.model");
const express = require("express");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const student = await Students.create(req.body);
    return res.status(200).send(student);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const student = await Students.find().lean().exec();
    return res.status(200).send(student);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Students.findById(req.params.id);
    return res.status(200).send(student);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.patch("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const student = await Students.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    return res.status(200).send(student);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await Students.findByIdAndDelete(req.params.id)
      .lean()
      .exec();
    return res.status(200).send(student);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
