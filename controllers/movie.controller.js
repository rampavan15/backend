const Movie = require("../models/movie.model");
const { getMovieById } = require("../services/movie.services");

const errorResponseBody = {
  err: {},
  data: {},
  message: "something went wrong, cannot  process the request",
  success: false,
};

const successResponsesBody = {
  err: {},
  data: {},
  message: "successfully processed  process the request",
  success: true,
};

const createMovie = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const movie = await Movie.create(
      //{
      // name: req.body.name,
      // description: req.body.description,
      // casts: req.body.casts,
      // trailerUrl: req.body.trailerUrl,
      // language: req.body.language,
      // releaseDate: req.body.releaseDate,
      // diretor: req.body.diretor,
      // releaseStatus: req.body.releaseStatus,
      // });
      req.body
    );

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

const getMovie = async (req, res) => {
  console.log("GET /movies/:id hit with ID:", req.params.id);

  try {
    const response = await getMovieById(req.params.id);
    console.log("this is response", response);

    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponsesBody.data = response.data || response;
    successResponsesBody.message = "Movie fetched successfully";

    console.log("this is success", successResponsesBody.data);

    return res.status(200).json(successResponsesBody);
  } catch (err) {
    console.error("Get movie error:", err);
    return res.status(500).json({
      ...errorResponseBody,
      message: "Internal server error",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const updateMovie = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("MOVIE ID:", req.params.id);

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,        // return updated document
        runValidators: true, // apply schema validation
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });

  } catch (error) {
    console.error("Update movie error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update movie",
      error: error.message,
    });
  }
};


module.exports = {
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie
}; 
