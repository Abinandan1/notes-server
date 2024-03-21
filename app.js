const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");

// MIDDLEWARE
app.use(express.json());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000...");
});
