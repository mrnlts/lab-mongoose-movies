const mongoose = require('mongoose');
// const Celebrity = require ('../models/Celebrity.model')
// const celebritiesArr = [
//     {
//         name: 'Uma Thurman',
//         occupation: 'actress, ninja',
//         catchPhrase: 'Gimme some Bill' 
//     },
//     {
//         name: 'Charlotte Gainsbourg',
//         occupation: 'actress, singer',
//         catchPhrase: 'Too cool for school' 
//     },
//     {
//         name: 'Henry Cavill',
//         occupation: 'actor, bodybuilder',
//         catchPhrase: 'To infinity and beyond' 
//     }
// ]

const Movie = require('../models/Movie.model');
const moviesArr = [
    {
        title: 'Titanic',
        genre: 'Drama',
        plot: 'People go on a big ship, ship hits an iceberg, ship sinks in the ocean, nearly all die.'
    },
    {
        title: 'Matrix',
        genre: 'Science-fiction',
        plot: 'People discover that their lives are fake, and they are controlled by machines.'
    },
    {
        title: 'West Side Story',
        genre: 'Musical',
        plot: 'Romeo and Juliet version with cool songs and dances.'
    }
]

mongoose
    .connect("mongodb://localhost:27017/mongoose-movies-dev", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => Movie.create(moviesArr))
    .then((movies) => console.log(`${movies.length} created`))
    .catch(err => console.log('Error seeding: ', err))
    .finally(()=> mongoose.connection.close())