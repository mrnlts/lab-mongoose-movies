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

/* Show movie's details */

router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;
    Movie.findOne({'_id': id})
        .then((movieFromDB)=> res.render('movies/show', {movieFromDB}))
        .catch(err => {
            console.log('Error displaying details of movie: ', err);
            next(err);
        })
})


module.exports = router;