const mongoose = require('mongoose');
const Celebrity = require ('../models/Celebrity.model')
const celebritiesArr = [
    {
        name: 'Uma Thurman',
        occupation: 'actress, ninja',
        catchPhrase: 'Gimme some Bill' 
    },
    {
        name: 'Charlotte Gainsbourg',
        occupation: 'actress, singer',
        catchPhrase: 'Too cool for school' 
    },
    {
        name: 'Henry Cavill',
        occupation: 'actor, bodybuilder',
        catchPhrase: 'To infinity and beyond' 
    }
]

mongoose
    .connect("mongodb://localhost:27017/mongoose-movies-dev", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => Celebrity.create(celebritiesArr))
    .then((celebs) => console.log(`${celebs.length} created`))
    .catch(err => console.log('Error seeding: ', err))
    .finally(()=> mongoose.connection.close())