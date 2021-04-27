const express = require('express');

const Celebrity = require('../models/Celebrity.model.js');

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
    res.render('celebrities/new');
})

router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity.create({name, occupation, catchPhrase})
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
        .then((celebFromDB)=> res.render('celebrities/show', {celebFromDB}))
        .catch(err => {
            console.log('Error displaying details of celebrity: ', err);
            next(err);
        })
})

/* Edit celebrity's details */

router.get('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findOne({'_id': id})
        .then((celebFromDB)=> res.render('celebrities/edit', {celebFromDB}))
        .catch(err => {
            console.log('Error displaying opening edit page: ', err);
            next(err);
        })
})

router.post('/celebrities/:id', (req, res, next) => {
    const {id} = req.params;
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate({'_id': id}, {'name':name, 'occupation':occupation, 'catchPhrase': catchPhrase})
        .then(()=> res.redirect('/celebrities'))
        .catch(err => {
            console.log('Error displaying updating celebrity: ', err);
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