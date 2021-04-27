const express = require('express');

const Movie = require('../models/Movie.model.js');

const router = express.Router();

/* List all celebrities */

router.get('/movies', (req, res, next) => {
    console.log('Movies page');
    Movie.find()
        .then((movies)=> res.render('movies/index', {currentMovies: movies}))
        .catch(err => {
            console.log('Error looking for movies: ', err);
            next(err);
        })
})


module.exports = router;