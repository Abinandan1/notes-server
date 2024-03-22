const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    note: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);

module.exports = mongoose.model("User", UserSchema);
