require("dotenv").config();
require("./config/db");

const express = require("express");
const cors = require("cors");

const pasteRoutes = require("./routes/pasteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api", pasteRoutes);

app.get("/", (req, res) => {
  res.send("Mini Pastebin API is running");
});

module.exports = app;
