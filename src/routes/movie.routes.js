const { getAll, create, getOne, remove, update, setGenres, setDirector, setActors } = require('../controllers/movie.cotrollers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/genres')
    .post(setGenres)

routerMovie.route('/:id/actors')
    .post(setActors)

routerMovie.route('/:id/directors')
    .post(setDirector)


routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;