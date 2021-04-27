const express = require('express');

const Movie = require('../models/Movie.model.js');

const router = express.Router();

/* List all movies */

router.get('/movies', (req, res, next) => {
    console.log('Movies page');
    Movie.find()
        .then((movies)=> res.render('movies/index', {currentMovies: movies}))
        .catch(err => {
            console.log('Error looking for movies: ', err);
            next(err);
        })
})


/* Create new movie */

router.get('/movies/new', (req, res, next) => {
    console.log('Enter new movie');
    res.render('movies/new');
})

router.post('/movies', (req, res, next) => {
    const { title, genre, plot } = req.body;
    Movie.create({ title, genre, plot})
        .then((newMovie) => {
            newMovie.save();
            res.redirect('/movies');
        })
        .catch((err) => {
            console.log('Error adding new Movie to DB: ', err);
            res.render('movies/new');
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

/* Edit movie's details */

router.get('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Movie.findOne({'_id': id})
        .then((movieFromDB)=> res.render('movies/edit', {movieFromDB}))
        .catch(err => {
            console.log('Error displaying opening edit page: ', err);
            next(err);
        })
})

router.post('/movies/:id', (req, res, next) => {
    const {id} = req.params;
    const {title, genre, plot} = req.body;
    Movie.findByIdAndUpdate({'_id': id}, {'title': title, 'genre': genre, 'plot': plot})
        .then(()=> res.redirect('/movies'))
        .catch(err => {
            console.log('Error updating movie: ', err);
            next(err);
        })
})


/* Delete movie */

router.post('/movies/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Movie.findByIdAndRemove({'_id': id})
        .then(()=> {
            res.redirect('/movies');
        })
        .catch(err => {
            console.log('Error deleting movie: ', err);
            next(err);
        })
})

module.exports = router;