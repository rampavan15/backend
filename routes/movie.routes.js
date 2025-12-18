const express = require("express");
const MovieController = require("../controllers/movie.controller");

const router = express.Router();

router.post("/movies", MovieController.createMovie);

module.exports = router;
