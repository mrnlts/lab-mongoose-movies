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

/* Show celebrity's details */

router.get('/celebrities/:id', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findOne({'_id': id})
        .then((celebFromDB)=> res.render('celebrities/show', celebFromDB))
        .catch(err => {
            console.log('Error displaying details of celebrity: ', err);
            next(err);
        })
})

module.exports = router;