const express = require("express");
const {
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  createNote,
} = require("../controllers/notes");
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);
router.patch("/:id", updateNote);
router.delete("/:id", deleteNote);
router.post("/", createNote);

module.exports = router;
