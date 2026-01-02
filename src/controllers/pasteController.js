const { v4: uuidv4 } = require("uuid");
const pasteModel = require("../models/pasteModel");

// CREATE PASTE
const createPaste = (req, res) => {
  const { content, expiresInMinutes, maxViews } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  const pasteId = uuidv4().slice(0, 8);

  const expiresAt = expiresInMinutes
    ? new Date(Date.now() + expiresInMinutes * 60000)
    : null;

  pasteModel.createPaste(
    pasteId,
    content,
    expiresAt,
    maxViews || null,
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error creating paste" });
      }

      res.status(201).json({
        pasteId,
        url: `http://localhost:3000/p/${pasteId}`
      });
    }
  );
};

// GET PASTE
const getPaste = (req, res) => {
  const { id } = req.params;

  pasteModel.getPasteById(id, (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "Paste not found" });
    }

    const paste = results[0];

    // Check expiry by time
    if (paste.expires_at && new Date() > paste.expires_at) {
      return res.status(410).json({ message: "Paste expired" });
    }

    // Check expiry by views
    if (paste.max_views && paste.views >= paste.max_views) {
      return res.status(410).json({ message: "View limit reached" });
    }

    // Increase view count
    pasteModel.incrementViews(id);

    res.json({
      content: paste.content,
      views: paste.views + 1
    });
  });
};

module.exports = {
  createPaste,
  getPaste
};
