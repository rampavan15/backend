const Movie = require('../models/movie.model');  

const getMovieById = async (id) => {
  try {
    if (!id) {
      return {
        err: "Movie ID is required",
        code: 400  
      };
    }

    const movie = await Movie.findById(id);  
    
    if (!movie) {
      return {
        err: "No movie found for the corresponding ID",
        code: 404
      };
    }
    
    return {  // Wrap in consistent format
      data: movie
    };
  } catch (error) {
    return {
      err: error.message,
      code: 500
    };
  }
};

module.exports = {
  getMovieById
};
