const express = require('express');

const Celebrity = require('../models/Celebrity.model.js');

const Movie = require('../models/Movie.model.js');

const router = express.Router();

/* List all celebrities */

router.get('/celebrities', (req, res, next) => {
    console.log('Celebrities page');
    Celebrity.find()
        .then((celebrities)=> res.render('celebrities/index', {celebs: celebrities}))
        .catch(err => {
            console.log('Error looking for celebrities: ', err);
            next(err);
        })
})

/* Create new celebrity */

router.get('/celebrities/new', (req, res, next) => {
    console.log('Enter new celebrity');
    Movie.find()
    .then(movies => {
        res.render('celebrities/new', {movies});
    })
})

router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase, movies } = req.body;

    Celebrity.create({name, occupation, catchPhrase, movies})
        .then((newCeleb) => {
            newCeleb.save();
            res.redirect('/celebrities');
        })
        .catch((err) => {
            console.log('Error adding new celebrity to DB: ', err);
            res.render('celebrities/new');
        })
})

/* Show celebrity's details */

router.get('/celebrities/:id', (req, res, next) => {
    const {id} = req.params;
    
    Celebrity.findOne({'_id': id})
        .populate('movies')
        .then((celebFromDB) => {
            res.render('celebrities/show', celebFromDB)
        })
        .catch(err => {
            console.log('Error displaying details of celebrity: ', err);
            next(err);
        })
})

/* Edit celebrity's details */

router.get('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findOne({'_id': id})
        .then(celebFromDB => {const celeb = celebFromDB; return celeb})
        .then(celeb => Movie.find()
            .then((moviesFromDB) => res.render('celebrities/edit', {celeb, moviesFromDB})))
        .catch(err => {
            console.log('Error opening edit page: ', err);
            next(err);
        })
})

router.post('/celebrities/:id', (req, res, next) => {
    const {id} = req.params;
    const {name, occupation, catchPhrase, movies} = req.body;
    Movie.findByIdAndUpdate(movies, { $push: {cast: id}})
        .then(()=> {
            Celebrity.findByIdAndUpdate({'_id': id}, {name, occupation, catchPhrase, movies})
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log('Error updating celebrity: ', err);
            next(err);
        })
})

/* Delete celebrity */

router.post('/celebrities/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findByIdAndRemove({'_id': id})
        .then(()=> {
            res.redirect('/celebrities');
        })
        .catch(err => {
            console.log('Error deleting celebrity: ', err);
            next(err);
        })
})


module.exports = router;