const express = require('express');

const Celebrity = require('../models/Celebrity.model.js');

const router = express.Router();

/* List all celebrities */

router.get('/celebrities', (req, res, next) => {
    console.log('Celebrities page');
    Celebrity.find()
        .then((celebrities)=> {
            console.log({celebrities});
            res.render('celebrities/index', {celebs: celebrities})
        })
        .catch(err => {
            console.log('Error looking for celebrities: ', err);
            next(err);
        })
})

module.exports = router;