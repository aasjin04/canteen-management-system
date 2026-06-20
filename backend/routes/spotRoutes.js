const express = require("express");
const Spot = require("../models/Spot");

const router = express.Router();

// GET all spots
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.find();
    res.json(spots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD spot
router.post("/", async (req, res) => {
  try {
    const spot = new Spot(req.body);
    const saved = await spot.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE spot
router.delete("/:id", async (req, res) => {
  try {
    await Spot.findByIdAndDelete(req.params.id);
    res.json({ message: "Spot deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;