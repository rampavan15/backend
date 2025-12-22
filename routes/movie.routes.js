const express = require("express");
const MovieController = require("../controllers/movie.controller");

const router = express.Router();

router.post("/movies", MovieController.createMovie);
router.get("/movies/:id", MovieController.getMovie);
router.delete("/movies/:id", MovieController.deleteMovie);
router.put("/movies/:id", MovieController.updateMovie);

module.exports = router;
