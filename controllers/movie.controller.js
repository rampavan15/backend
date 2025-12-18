const Movie = require("../models/movie.model");

exports.createMovie = async (req, res) => {
  try {
        console.log("BODY RECEIVED:", req.body);

    const movie = await Movie.create({
      name: req.body.name,
      description: req.body.description,
      casts: req.body.casts,
      trailerUrl: req.body.trailerUrl,
      language: req.body.language,
      releaseDate: req.body.releaseDate,
      diretor: req.body.diretor,
      releaseStatus: req.body.releaseStatus,
    });

    return res.status(201).json({
      success: true,
      message: "movie create successfully",
      data: movie,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation9 failed",
      error: error,
    });
  }
};
