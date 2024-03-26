const { StatusCodes } = require("http-status-codes");
const Notes = require("../models/Notes");
const { NotFoundError } = require("../errors");

const getAllNotes = async (req, res) => {
  const archive = JSON.parse(req.query.archive);
  req.body.archive = archive;
  console.log(req.body);
  const {
    user: { userId },
  } = req;
  const notes = await Notes.find({ createdBy: userId, ...req.body });
  res.status(StatusCodes.OK).json({ count: notes.length, notes });
};
const getNote = async (req, res) => {
  const {
    params: { id: noteId },
    user: { userId },
  } = req;
  const note = await Notes.findOne({
    createdBy: userId,
    _id: noteId,
  });
  if (!note) {
    throw new NotFoundError(`No note found with id ${noteId}`);
  }
  res.status(StatusCodes.OK).json({ note });
};
const createNote = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const note = await Notes.create({ ...req.body });
  res.status(StatusCodes.CREATED).json(note);
};
const updateNote = async (req, res) => {
  const {
    user: { userId },
    params: { id: noteId },
  } = req;
  const note = await Notes.findOneAndUpdate(
    {
      createdBy: userId,
      _id: noteId,
    },
    { ...req.body },
    { new: true }
  );
  if (!note) {
    throw new NotFoundError(`No note found with id ${noteId}`);
  }
  res.status(StatusCodes.OK).json({ note });
};
const deleteNote = async (req, res) => {
  const {
    user: { userId },
    params: { id: noteId },
  } = req;
  const note = await Notes.findOneAndDelete({
    createdBy: userId,
    _id: noteId,
  });
  if (!note) {
    throw new NotFoundError(`No note found with id ${noteId}`);
  }
  res.status(StatusCodes.OK).json({ note });
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
