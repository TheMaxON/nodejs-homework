const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const { DB_HOST } = process.env;

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("E11000 duplicate key error")) {
    res.status(409).json({ message: "Email in use" });
  }

  if (err.message.includes("Cast to ObjectId failed")) {
    res.status(400).json({ message: "ID is not valid" });
  }

  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  }

  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = app;
