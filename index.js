const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const app = express();
env.config();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", MovieRoutes);

app.get("/home", (req, res) => {
  return res.json({ success: true });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(process.env.PORT, async () => {
  console.log(`server started on port ${process.env.PORT}`);

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connected to mongo");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});
