const db = require("../config/db");

const createPaste = (pasteId, content, expiresAt, maxViews, callback) => {
  const sql = `
    INSERT INTO pastes (paste_id, content, expires_at, max_views)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [pasteId, content, expiresAt, maxViews], callback);
};

const getPasteById = (pasteId, callback) => {
  const sql = `
    SELECT * FROM pastes
    WHERE paste_id = ?
  `;

  db.query(sql, [pasteId], callback);
};

const incrementViews = (pasteId) => {
  const sql = `
    UPDATE pastes
    SET views = views + 1
    WHERE paste_id = ?
  `;

  db.query(sql, [pasteId]);
};

module.exports = {
  createPaste,
  getPasteById,
  incrementViews
};

