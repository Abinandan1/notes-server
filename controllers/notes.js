const getAllNotes = (req, res) => {
  res.send("Get all notes");
};
const getNote = (req, res) => {
  res.send("Get note");
};
const createNote = (req, res) => {
  res.send("Create note");
};
const updateNote = (req, res) => {
  res.send("Update note");
};
const deleteNote = (req, res) => {
  res.send("Delete note");
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
