const express = require("express");
const router = express.Router();

const {
  createPaste,
  getPaste
} = require("../controllers/pasteController");

// Create a new paste
router.post("/paste", createPaste);

// Get paste by ID
router.get("/paste/:id", getPaste);

module.exports = router;
