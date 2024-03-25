require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const notesRouter = require("./routes/notes");
const connectDB = require("./db/connectDB");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const cors = require("cors");
const auth = require("./middleware/authentication");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", auth, notesRouter);

// ERRORS
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, () => {
      console.log("Server listening on port 3000...");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
